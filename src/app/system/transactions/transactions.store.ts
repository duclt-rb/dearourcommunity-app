import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ApiError,
  type PaymentMethod,
  type PaymentStatus,
  type Transaction,
  type TransactionsQuery,
} from '@dearourcommunity/client';
import { PaymentService } from '../../core/services/payment.service';

// Số item/trang — phân trang server-side (server giới hạn limit ≤ 100).
const PAGE_SIZE = 50;

function toErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    // 409: giao dịch đã được xử lý trước đó; 404: không tìm thấy; 400: dữ liệu không hợp lệ
    if (err.code === 409) {
      return 'Giao dịch đã được xử lý trước đó. Vui lòng làm mới danh sách.';
    }
    if (err.code === 404) {
      return 'Không tìm thấy giao dịch.';
    }
    return err.message || 'Thao tác thất bại. Vui lòng thử lại.';
  }
  console.error('Transaction action failed', err);
  return 'Thao tác thất bại. Vui lòng thử lại.';
}

const initialState = {
  // Dữ liệu của TRANG hiện tại (≤ PAGE_SIZE item). Server phân trang qua `page`/`limit`.
  transactions: [] as Transaction[],
  isLoading: false,
  loadError: null as string | null,

  // Tìm kiếm (client-side, chỉ trong trang đang tải) & lọc (đẩy lên server)
  searchQuery: '',
  statusFilter: 'all' as PaymentStatus | 'all',
  methodFilter: 'all' as PaymentMethod | 'all',

  // Phân trang (server-side) — tổng số từ `meta`
  currentPage: 1,
  totalItems: 0,
  totalPages: 1,

  // Modal chi tiết
  selectedTransaction: null as Transaction | null,

  // Trạng thái thao tác admin (duyệt / từ chối chuyển khoản)
  actionLoadingId: null as string | null,
  actionError: null as string | null,
  showRejectInput: false,
  rejectReason: '',
};

export const TransactionsStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    // Tìm kiếm + sắp xếp trên danh sách của TRANG hiện tại
    // (lọc trạng thái/phương thức đã do server xử lý).
    const filteredTransactions = computed(() => {
      const list = store.transactions();
      const query = store.searchQuery().toLowerCase().trim();

      return list
        .filter((t) => {
          if (!query) return true;
          const orderIdMatch = t.orderId?.toLowerCase().includes(query) ?? false;
          const emailMatch = t.user?.wpUser?.userEmail?.toLowerCase().includes(query) ?? false;
          const nameMatch = t.user?.wpUser?.displayName?.toLowerCase().includes(query) ?? false;
          const packageNameMatch = t.package?.name?.toLowerCase().includes(query) ?? false;
          return orderIdMatch || emailMatch || nameMatch || packageNameMatch;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });

    // Trang hiện tại đã kẹp trong [1, totalPages]
    const clampedPage = computed(() =>
      Math.min(Math.max(1, store.currentPage()), Math.max(1, store.totalPages())),
    );

    // Danh sách hiển thị = kết quả tìm kiếm trên trang (server đã phân trang sẵn)
    const pagedTransactions = computed(() => filteredTransactions());

    // Khoảng đang hiển thị theo phân trang server ("X–Y trên tổng Z")
    const pageRange = computed(() => {
      const total = store.totalItems();
      const loaded = store.transactions().length;
      if (total === 0 || loaded === 0) return { from: 0, to: 0, total };
      const from = (clampedPage() - 1) * PAGE_SIZE + 1;
      const to = from + loaded - 1;
      return { from, to, total };
    });

    // Thống kê tính trên TRANG hiện tại (server không trả số liệu tổng hợp).
    const stats = computed(() => {
      const list = store.transactions();
      let totalRevenue = 0;
      let successCount = 0;
      let failedCount = 0;
      let pendingCount = 0;
      let awaitingCount = 0;
      let refundedCount = 0;

      for (const t of list) {
        if (t.status === 'success') {
          totalRevenue += t.amount;
          successCount++;
        } else if (t.status === 'failed') {
          failedCount++;
        } else if (t.status === 'pending') {
          pendingCount++;
        } else if (t.status === 'awaiting_confirmation') {
          awaitingCount++;
        } else if (t.status === 'refunded') {
          refundedCount++;
        }
      }

      return {
        totalRevenue,
        successCount,
        failedCount,
        pendingCount,
        awaitingCount,
        refundedCount,
        totalCount: list.length,
      };
    });

    // Có đang áp dụng bộ lọc/tìm kiếm nào không (để empty-state hiển thị đúng ngữ cảnh).
    const hasActiveFilters = computed(
      () =>
        store.searchQuery().trim() !== '' ||
        store.statusFilter() !== 'all' ||
        store.methodFilter() !== 'all',
    );

    return {
      filteredTransactions,
      clampedPage,
      pagedTransactions,
      pageRange,
      stats,
      hasActiveFilters,
    };
  }),
  withMethods((store, paymentService = inject(PaymentService)) => {
    // Tải TRANG hiện tại từ server (kèm bộ lọc trạng thái/phương thức).
    async function load() {
      patchState(store, { isLoading: true, loadError: null });
      try {
        const status = store.statusFilter();
        const method = store.methodFilter();
        const query: TransactionsQuery = {
          page: store.currentPage(),
          limit: PAGE_SIZE,
          sortOrder: 'desc',
        };
        if (status !== 'all') query.status = status;
        if (method !== 'all') query.paymentMethod = method;

        const res = await paymentService.getTransactions(query);
        patchState(store, {
          transactions: res.items,
          totalItems: res.meta.total,
          totalPages: Math.max(1, res.meta.totalPages),
        });
      } catch (err) {
        patchState(store, { loadError: toErrorMessage(err) });
      } finally {
        patchState(store, { isLoading: false });
      }
    }

    // Đổi trang rồi fetch lại (kẹp trong [1, totalPages]).
    function goTo(page: number) {
      const target = Math.max(1, Math.min(page, Math.max(1, store.totalPages())));
      if (target === store.currentPage()) return;
      patchState(store, { currentPage: target });
      load();
    }

    return {
      load,
      refresh: () => load(),

      // Tìm kiếm — client-side trong trang hiện tại (không gọi lại server)
      setSearch(value: string) {
        patchState(store, { searchQuery: value });
      },

      // Xoá toàn bộ tìm kiếm + bộ lọc, quay về trang 1 và fetch lại
      clearFilters() {
        const noFilter =
          store.searchQuery().trim() === '' &&
          store.statusFilter() === 'all' &&
          store.methodFilter() === 'all';
        if (noFilter) return;
        patchState(store, {
          searchQuery: '',
          statusFilter: 'all',
          methodFilter: 'all',
          currentPage: 1,
        });
        load();
      },

      // Lọc — đẩy lên server, quay về trang 1 và fetch lại
      setStatusFilter(value: PaymentStatus | 'all') {
        patchState(store, { statusFilter: value, currentPage: 1 });
        load();
      },
      setMethodFilter(value: PaymentMethod | 'all') {
        patchState(store, { methodFilter: value, currentPage: 1 });
        load();
      },

      // Phân trang (qua trang → fetch tiếp)
      goToPage(page: number) {
        goTo(page);
      },
      prevPage() {
        goTo(store.clampedPage() - 1);
      },
      nextPage() {
        goTo(store.clampedPage() + 1);
      },

      // Modal chi tiết
      viewDetails(t: Transaction) {
        patchState(store, {
          selectedTransaction: t,
          showRejectInput: false,
          rejectReason: '',
          actionError: null,
        });
      },
      closeDetails() {
        patchState(store, {
          selectedTransaction: null,
          showRejectInput: false,
          rejectReason: '',
          actionError: null,
        });
      },

      // Luồng từ chối
      startReject() {
        patchState(store, { showRejectInput: true, actionError: null });
      },
      cancelReject() {
        patchState(store, { showRejectInput: false, rejectReason: '' });
      },
      setRejectReason(value: string) {
        patchState(store, { rejectReason: value });
      },

      /** Duyệt giao dịch → kích hoạt gói. */
      async approve(t: Transaction) {
        patchState(store, { actionLoadingId: t.id, actionError: null });
        try {
          await paymentService.approveTransaction(t.id);
          patchState(store, {
            selectedTransaction: null,
            showRejectInput: false,
            rejectReason: '',
            actionError: null,
          });
          await load();
        } catch (err) {
          patchState(store, { actionError: toErrorMessage(err) });
        } finally {
          patchState(store, { actionLoadingId: null });
        }
      },

      /** Từ chối giao dịch (bắt buộc nhập lý do). */
      async confirmReject(t: Transaction) {
        const reason = store.rejectReason().trim();
        if (!reason) {
          patchState(store, { actionError: 'Vui lòng nhập lý do từ chối.' });
          return;
        }

        patchState(store, { actionLoadingId: t.id, actionError: null });
        try {
          await paymentService.rejectTransaction(t.id, { reason });
          patchState(store, {
            selectedTransaction: null,
            showRejectInput: false,
            rejectReason: '',
            actionError: null,
          });
          await load();
        } catch (err) {
          patchState(store, { actionError: toErrorMessage(err) });
        } finally {
          patchState(store, { actionLoadingId: null });
        }
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
