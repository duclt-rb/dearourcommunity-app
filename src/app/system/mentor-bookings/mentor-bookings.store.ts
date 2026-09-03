import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';
import { ApiError, type MentorBooking, type MentorBookingStatus } from '@dearourcommunity/client';
import { MentorBookingService } from '../../core/services/mentor-booking.service';

function toErrorMessage(err: unknown, transloco: TranslocoService): string {
  if (err instanceof ApiError) {
    // 409: booking đã được xử lý trước đó; 404: không tìm thấy; 400: dữ liệu không hợp lệ
    if (err.code === 409) {
      return transloco.translate('system.mentorBookings.errors.alreadyProcessed');
    }
    if (err.code === 404) {
      return transloco.translate('system.mentorBookings.errors.notFound');
    }
    return err.message || transloco.translate('system.mentorBookings.errors.actionFailed');
  }
  console.error('Mentor booking action failed', err);
  return transloco.translate('system.mentorBookings.errors.actionFailed');
}

const initialState = {
  // Dữ liệu — tải toàn bộ rồi lọc/tìm kiếm client-side (list() trả mảng, không phân trang)
  bookings: [] as MentorBooking[],
  isLoading: false,
  loadError: null as string | null,

  // Tìm kiếm & lọc (client-side)
  searchQuery: '',
  statusFilter: 'all' as MentorBookingStatus | 'all',

  // Modal chi tiết
  selectedBooking: null as MentorBooking | null,

  // Trạng thái thao tác admin (duyệt / từ chối)
  actionLoadingId: null as string | null,
  actionError: null as string | null,
  confirmRejectId: null as string | null,
  rejectReason: '',
  // Các khung giờ admin chọn để chốt khi duyệt — mặc định chọn TẤT CẢ slot đề xuất (CR-001 Amendment 3)
  approveSlotIds: [] as string[],
};

export const MentorBookingsStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    // Lọc theo trạng thái + tìm kiếm, mới nhất lên đầu
    const filteredBookings = computed(() => {
      const list = store.bookings();
      const query = store.searchQuery().toLowerCase().trim();
      const status = store.statusFilter();

      return list
        .filter((b) => {
          const matchesStatus = status === 'all' || b.status === status;
          if (!matchesStatus) return false;
          if (!query) return true;
          return (
            b.name.toLowerCase().includes(query) ||
            b.email.toLowerCase().includes(query) ||
            b.phone.toLowerCase().includes(query) ||
            (b.mentor?.name?.toLowerCase().includes(query) ?? false)
          );
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });

    // Thống kê theo trạng thái (trên toàn bộ danh sách đã tải)
    const stats = computed(() => {
      const list = store.bookings();
      let pendingCount = 0;
      let approvedCount = 0;
      let rejectedCount = 0;
      for (const b of list) {
        if (b.status === 'pending') pendingCount++;
        else if (b.status === 'approved') approvedCount++;
        else if (b.status === 'rejected') rejectedCount++;
      }
      return { pendingCount, approvedCount, rejectedCount, totalCount: list.length };
    });

    const hasActiveFilters = computed(
      () => store.searchQuery().trim() !== '' || store.statusFilter() !== 'all',
    );

    return { filteredBookings, stats, hasActiveFilters };
  }),
  withMethods(
    (
      store,
      bookingService = inject(MentorBookingService),
      messageService = inject(MessageService),
      transloco = inject(TranslocoService),
    ) => {
      async function load() {
        patchState(store, { isLoading: true, loadError: null });
        try {
          const items = await bookingService.list();
          patchState(store, { bookings: items });
        } catch (err) {
          patchState(store, { loadError: toErrorMessage(err, transloco) });
        } finally {
          patchState(store, { isLoading: false });
        }
      }

      return {
        load,
        refresh: () => load(),

        // Tìm kiếm & lọc (client-side)
        setSearch(value: string) {
          patchState(store, { searchQuery: value });
        },
        setStatusFilter(value: MentorBookingStatus | 'all') {
          patchState(store, { statusFilter: value });
        },
        clearFilters() {
          patchState(store, { searchQuery: '', statusFilter: 'all' });
        },

        // Modal chi tiết
        viewDetails(b: MentorBooking) {
          patchState(store, {
            selectedBooking: b,
            confirmRejectId: null,
            rejectReason: '',
            actionError: null,
            // Mặc định chọn TẤT CẢ khung giờ đề xuất (default-all) — admin bỏ tick khung không muốn chốt
            approveSlotIds: (b.selectedTimeSlots ?? []).map((s) => s.slotId),
          });
        },
        closeDetails() {
          patchState(store, {
            selectedBooking: null,
            confirmRejectId: null,
            rejectReason: '',
            actionError: null,
            approveSlotIds: [],
          });
        },

        /** Tick/bỏ tick một khung giờ trong danh sách sẽ chốt khi duyệt. */
        toggleApproveSlot(slotId: string) {
          const current = store.approveSlotIds();
          patchState(store, {
            approveSlotIds: current.includes(slotId)
              ? current.filter((id) => id !== slotId)
              : [...current, slotId],
            actionError: null,
          });
        },

        // Luồng từ chối (yêu cầu xác nhận 2 bước, kèm lý do tuỳ chọn)
        startReject(id: string) {
          patchState(store, { confirmRejectId: id, rejectReason: '', actionError: null });
        },
        cancelReject() {
          patchState(store, { confirmRejectId: null, rejectReason: '' });
        },
        setRejectReason(value: string) {
          patchState(store, { rejectReason: value });
        },

        /**
         * Duyệt yêu cầu — BE rẽ nhánh theo packageType:
         * `existing` → trừ 1 lượt mentoring ngay, booking sang `approved`;
         * `single` → chỉ gửi mail link thanh toán, booking GIỮ `pending`
         * (tự `approved` khi tiền về qua IPN/duyệt giao dịch — CR-001 5.3b).
         *
         * CR-001 Amendment 3: `slotIds` = tập con khác rỗng của `selectedTimeSlots` muốn chốt
         * (1–2 phần tử); KHÔNG truyền → BE tự chốt TẤT CẢ khung giờ đề xuất (default-all).
         *
         * Booking pending đã có `confirmedSlotIds` (đã duyệt nhánh trả phí, chờ thanh toán):
         * gọi lại approve = GỬI LẠI mail link thanh toán (BE cho phép).
         */
        async approve(b: MentorBooking, slotIds?: string[]) {
          if (slotIds && slotIds.length === 0) {
            patchState(store, {
              actionError: transloco.translate('system.mentorBookings.errors.selectSlot'),
            });
            return;
          }
          patchState(store, { actionLoadingId: b.id, actionError: null });
          try {
            await bookingService.approve(b.id, slotIds);
            // Toast thành công theo nhánh — tránh user tưởng lỗi khi nhánh single vẫn giữ pending (R6)
            const isResend = b.confirmedSlotIds !== null;
            const slotCount = slotIds?.length ?? b.selectedTimeSlots?.length ?? 0;
            let detail: string;
            if (isResend) {
              detail = transloco.translate('system.mentorBookings.toasts.resendDetail');
            } else if (b.packageType === 'existing') {
              detail = transloco.translate('system.mentorBookings.toasts.approvedExisting', {
                n: slotCount,
              });
            } else if (b.packageType === 'single') {
              detail = transloco.translate('system.mentorBookings.toasts.approvedSingle');
            } else {
              detail = transloco.translate('system.mentorBookings.toasts.approvedGeneric', {
                n: slotCount,
              });
            }
            messageService.add({
              severity: 'success',
              summary: transloco.translate(
                isResend
                  ? 'system.mentorBookings.toasts.resendSummary'
                  : 'system.mentorBookings.toasts.approveSuccess',
              ),
              detail,
              life: 6000,
            });
            patchState(store, {
              selectedBooking: null,
              confirmRejectId: null,
              actionError: null,
              approveSlotIds: [],
            });
            await load();
          } catch (err) {
            const message = toErrorMessage(err, transloco);
            messageService.add({
              severity: 'error',
              summary: transloco.translate('system.mentorBookings.toasts.approveFailed'),
              detail: message,
              life: 7000,
            });
            patchState(store, { actionError: message });
          } finally {
            patchState(store, { actionLoadingId: null });
          }
        },

        /** Từ chối yêu cầu, kèm lý do (tuỳ chọn) gửi mail báo user. */
        async confirmReject(b: MentorBooking) {
          const reason = store.rejectReason().trim();
          patchState(store, { actionLoadingId: b.id, actionError: null });
          try {
            await bookingService.reject(b.id, reason || undefined);
            messageService.add({
              severity: 'success',
              summary: transloco.translate('system.mentorBookings.toasts.rejectedSummary'),
              detail: transloco.translate('system.mentorBookings.toasts.rejectedDetail'),
              life: 6000,
            });
            patchState(store, {
              selectedBooking: null,
              confirmRejectId: null,
              rejectReason: '',
              actionError: null,
              approveSlotIds: [],
            });
            await load();
          } catch (err) {
            const message = toErrorMessage(err, transloco);
            messageService.add({
              severity: 'error',
              summary: transloco.translate('system.mentorBookings.toasts.rejectFailed'),
              detail: message,
              life: 7000,
            });
            patchState(store, { actionError: message });
          } finally {
            patchState(store, { actionLoadingId: null });
          }
        },
      };
    },
  ),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
