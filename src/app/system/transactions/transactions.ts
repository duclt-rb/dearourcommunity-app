import { Component, inject } from '@angular/core';
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
import { type PaymentMethod, type PaymentStatus, type Transaction } from '@dearourcommunity/client';
import { TransactionsStore } from './transactions.store';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
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
  readonly refresh = this.store.refresh;
  readonly setSearch = this.store.setSearch;
  readonly setStatusFilter = this.store.setStatusFilter;
  readonly setMethodFilter = this.store.setMethodFilter;
  readonly clearFilters = this.store.clearFilters;
  readonly goToPage = this.store.goToPage;
  readonly prevPage = this.store.prevPage;
  readonly nextPage = this.store.nextPage;
  readonly viewDetails = this.store.viewDetails;
  readonly closeDetails = this.store.closeDetails;
  readonly startReject = this.store.startReject;
  readonly cancelReject = this.store.cancelReject;
  readonly setRejectReason = this.store.setRejectReason;
  readonly approve = this.store.approve;
  readonly confirmReject = this.store.confirmReject;

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
        return 'Thành công';
      case 'failed':
        return 'Thất bại';
      case 'pending':
        return 'Chờ xử lý';
      case 'awaiting_confirmation':
        return 'Chờ duyệt';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return status;
    }
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method === 'bank_transfer' ? 'Chuyển khoản' : 'MoMo';
  }
}
