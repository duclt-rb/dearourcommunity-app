import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import {
  LucideCreditCard,
  LucideSearch,
  LucideRefreshCw,
  LucideCheckCircle,
  LucideXCircle,
  LucideInfo,
  LucideFilter,
  LucideEye,
  LucideTrendingUp,
  LucideClock,
  LucideCheck,
  LucideX,
  LucideChevronLeft,
  LucideChevronRight,
} from '@lucide/angular';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  ApiError,
  type InvoiceRequest,
  type PaymentMethod,
  type PaymentStatus,
  type Transaction,
} from '@dearourcommunity/client';
import { TransactionsStore } from './transactions.store';
import { ClientService } from '../../core/services/client.service';
import { PackagesService } from '../../core/services/packages.service';
import { findToolkit } from '../../toolkit/toolkit.data';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    TranslocoPipe,
    LucideCreditCard,
    LucideSearch,
    LucideRefreshCw,
    LucideCheckCircle,
    LucideXCircle,
    LucideInfo,
    LucideFilter,
    LucideEye,
    LucideTrendingUp,
    LucideClock,
    LucideCheck,
    LucideX,
    LucideChevronLeft,
    LucideChevronRight,
  ],
  providers: [TransactionsStore],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export default class TransactionsComponent {
  private store = inject(TransactionsStore);
  private packagesService = inject(PackagesService);
  private clientService = inject(ClientService);
  private transloco = inject(TranslocoService);

  constructor() {
    // CR-007 — nạp danh sách yêu cầu xuất hoá đơn để gắn chip "HĐ" + section trong modal.
    // Best-effort: BE cũ chưa có endpoint → bỏ qua, màn giao dịch vẫn hoạt động như cũ.
    void this.loadInvoiceRequests();
  }

  // State (alias các signal của store để template dùng trực tiếp)
  readonly isLoading = this.store.isLoading;
  readonly searchQuery = this.store.searchQuery;
  readonly statusFilter = this.store.statusFilter;
  readonly methodFilter = this.store.methodFilter;
  readonly selectedTransaction = this.store.selectedTransaction;
  readonly actionLoadingId = this.store.actionLoadingId;
  readonly actionError = this.store.actionError;
  readonly showRejectInput = this.store.showRejectInput;
  readonly rejectReason = this.store.rejectReason;

  // Computed
  readonly transactions = this.store.transactions;
  readonly filteredTransactions = this.store.filteredTransactions;
  readonly pagedTransactions = this.store.pagedTransactions;
  readonly totalPages = this.store.totalPages;
  readonly clampedPage = this.store.clampedPage;
  readonly pageRange = this.store.pageRange;
  readonly stats = this.store.stats;
  readonly hasActiveFilters = this.store.hasActiveFilters;

  // Methods (signal-store methods giữ nguyên binding)
  // CR-007 — refresh cũng nạp lại danh sách yêu cầu HĐ (giao dịch mới tạo sau khi vào màn)
  readonly refresh = () => {
    this.store.refresh();
    void this.loadInvoiceRequests();
  };
  readonly setSearch = this.store.setSearch;
  readonly setStatusFilter = this.store.setStatusFilter;
  readonly setMethodFilter = this.store.setMethodFilter;
  readonly clearFilters = this.store.clearFilters;
  readonly goToPage = this.store.goToPage;
  readonly prevPage = this.store.prevPage;
  readonly nextPage = this.store.nextPage;
  // CR-004: mở chi tiết → tải kèm tên các khoá user đã chọn ở checkout (nếu có)
  readonly viewDetails = (t: Transaction) => {
    this.store.viewDetails(t);
    void this.loadSelectedCourseTitles(t);
    // CR-007 — làm mới form đánh dấu xuất hoá đơn cho giao dịch đang mở
    this.issueInvoiceNo.set('');
    this.issueInvoiceSeries.set('');
    this.issueLookupUrl.set('');
    this.issueError.set(null);
  };
  readonly closeDetails = this.store.closeDetails;
  readonly startReject = this.store.startReject;
  readonly cancelReject = this.store.cancelReject;
  readonly setRejectReason = this.store.setRejectReason;
  // CR-007 — duyệt xong nạp lại yêu cầu HĐ (chip "HĐ" + form đánh dấu chỉ hiện khi tx success)
  readonly approve = async (t: Transaction) => {
    await this.store.approve(t);
    void this.loadInvoiceRequests();
  };
  readonly confirmReject = this.store.confirmReject;

  /**
   * CR-004 — tên các khoá user chọn ở checkout (extraData.courseIds), map qua
   * GET /packages/:id (đã kèm tên khoá). null = đang tải / giao dịch không có khoá chọn;
   * lỗi mạng → fallback hiển thị theo ID.
   */
  readonly selectedCourseTitles = signal<string[] | null>(null);

  private async loadSelectedCourseTitles(t: Transaction) {
    this.selectedCourseTitles.set(null);
    const courseIds = t.extraData?.courseIds;
    if (!courseIds?.length || !t.package) return;
    try {
      const pkg = await this.packagesService.findById(t.package.id);
      // wp_course_id là bigint — BE serialize thành string, ép số cả 2 phía trước khi map
      const titleById = new Map(
        pkg.courses.map((pc) => [
          Number(pc.wpCourseId),
          pc.course?.postTitle ?? this.courseFallback(pc.wpCourseId),
        ]),
      );
      this.selectedCourseTitles.set(
        courseIds.map((id) => titleById.get(Number(id)) ?? this.courseFallback(id)),
      );
    } catch {
      this.selectedCourseTitles.set(courseIds.map((id) => this.courseFallback(id)));
    }
  }

  private courseFallback(id: number | string): string {
    return this.transloco.translate('system.transactions.courseFallback', { id });
  }

  /** CR-006 — tên Quick Scan/Toolkit user đã chọn ở checkout (map từ catalog client). */
  selectedToolkitNames(t: Transaction): string[] {
    return (t.extraData?.toolkitIds ?? []).map((id) => findToolkit(id)?.name ?? id);
  }

  // ── CR-007: yêu cầu xuất hoá đơn VAT ────────────────────────────────────────
  readonly invoiceRequests = signal<InvoiceRequest[]>([]);
  private readonly invoiceByTxId = computed(
    () => new Map(this.invoiceRequests().map((r) => [r.paymentTransactionId, r])),
  );
  // Form "đánh dấu đã xuất" trong modal
  readonly issueInvoiceNo = signal('');
  readonly issueInvoiceSeries = signal('');
  readonly issueLookupUrl = signal('');
  readonly issueLoading = signal(false);
  readonly issueError = signal<string | null>(null);

  /** Link tra cứu: rỗng hoặc URL http/https ≤500 ký tự — mirror z.url({protocol}) của BE. */
  readonly issueLookupUrlValid = computed(() => {
    const url = this.issueLookupUrl().trim();
    if (!url) return true;
    if (url.length > 500) return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  });

  private async loadInvoiceRequests() {
    try {
      this.invoiceRequests.set(await this.clientService.invoices.adminList());
    } catch {
      // BE cũ (chưa deploy CR-007) → 404: coi như không có yêu cầu hoá đơn nào
      this.invoiceRequests.set([]);
    }
  }

  /** Yêu cầu xuất HĐ gắn với giao dịch (null = user không yêu cầu). */
  invoiceRequestFor(t: Transaction): InvoiceRequest | null {
    return this.invoiceByTxId().get(t.id) ?? null;
  }

  /** Giao dịch thành công + có yêu cầu HĐ chưa xuất → admin cần xử lý (chip "HĐ" ở bảng). */
  hasPendingInvoice(t: Transaction): boolean {
    return t.status === 'success' && this.invoiceRequestFor(t)?.status === 'pending';
  }

  /** Kế toán đã xuất hoá đơn ngoài hệ thống → admin nhập số HĐ, hệ thống mail cho khách. */
  async markInvoiceIssued(t: Transaction) {
    const request = this.invoiceRequestFor(t);
    const invoiceNo = this.issueInvoiceNo().trim();
    if (!request || !invoiceNo || !this.issueLookupUrlValid() || this.issueLoading()) return;
    this.issueLoading.set(true);
    this.issueError.set(null);
    try {
      const updated = await this.clientService.invoices.adminIssue(request.id, {
        invoiceNo,
        invoiceSeries: this.issueInvoiceSeries().trim() || undefined,
        lookupUrl: this.issueLookupUrl().trim() || undefined,
      });
      this.invoiceRequests.set(
        this.invoiceRequests().map((r) => (r.id === updated.id ? updated : r)),
      );
      // Response về khi admin đã mở modal của giao dịch KHÁC → chỉ cập nhật list ở trên,
      // không reset/xả lỗi vào form của modal đang mở (viewDetails đã reset form riêng).
      if (this.selectedTransaction()?.id !== t.id) return;
      this.issueInvoiceNo.set('');
      this.issueInvoiceSeries.set('');
      this.issueLookupUrl.set('');
    } catch (err) {
      if (this.selectedTransaction()?.id !== t.id) return;
      // 400 (giao dịch chưa success) / 409 (đã xuất) — hiện nguyên văn message BE
      this.issueError.set(
        err instanceof ApiError && err.message
          ? err.message
          : this.transloco.translate('system.transactions.invoice.issueFailed'),
      );
    } finally {
      this.issueLoading.set(false);
    }
  }

  /** Giao dịch chuyển khoản đang chờ admin đối soát/duyệt. */
  canReview(t: Transaction): boolean {
    return (
      t.paymentMethod === 'bank_transfer' &&
      (t.status === 'awaiting_confirmation' || t.status === 'pending')
    );
  }

  // Format helpers
  getStatusLabel(status: PaymentStatus): string {
    switch (status) {
      case 'success':
      case 'failed':
      case 'pending':
      case 'awaiting_confirmation':
      case 'refunded':
        return this.transloco.translate(`system.transactions.status.${status}`);
      default:
        return status;
    }
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return this.transloco.translate(
      method === 'bank_transfer'
        ? 'system.transactions.method.bank_transfer'
        : 'system.transactions.method.momo',
    );
  }
}
