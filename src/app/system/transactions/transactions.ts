import { Component, inject, signal, computed, resource } from '@angular/core';
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
} from '@lucide/angular';
import { PaymentService } from '../../core/services/payment.service';
import type { Transaction, PaymentStatus } from '@dearourcommunity/client';

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
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export default class TransactionsComponent {
  private paymentService = inject(PaymentService);

  // Search and Filter States
  searchQuery = signal('');
  statusFilter = signal<PaymentStatus | 'all'>('all');

  // Selected Transaction for Modal Detail View
  selectedTransaction = signal<Transaction | null>(null);

  // Async Resource loading
  transactionsResource = resource({
    loader: () => this.paymentService.getTransactions(),
  });

  // Master transaction list
  transactions = computed<Transaction[]>(() => this.transactionsResource.value() ?? []);

  // Filtered and Searched transaction list
  filteredTransactions = computed(() => {
    const list = this.transactions();
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();

    return list
      .filter((t) => {
        // 1. Filter by status
        if (status !== 'all' && t.status !== status) {
          return false;
        }

        // 2. Filter by search query
        if (query) {
          const orderIdMatch = t.orderId?.toLowerCase().includes(query) ?? false;
          const emailMatch = t.user?.wpUser?.userEmail?.toLowerCase().includes(query) ?? false;
          const nameMatch = t.user?.wpUser?.displayName?.toLowerCase().includes(query) ?? false;
          const packageNameMatch = t.package?.name?.toLowerCase().includes(query) ?? false;

          return orderIdMatch || emailMatch || nameMatch || packageNameMatch;
        }

        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  // Stats computed from the master transactions list
  stats = computed(() => {
    const list = this.transactions();
    let totalRevenue = 0;
    let successCount = 0;
    let failedCount = 0;
    let pendingCount = 0;
    let refundedCount = 0;

    for (const t of list) {
      if (t.status === 'success') {
        totalRevenue += t.amount;
        successCount++;
      } else if (t.status === 'failed') {
        failedCount++;
      } else if (t.status === 'pending') {
        pendingCount++;
      } else if (t.status === 'refunded') {
        refundedCount++;
      }
    }

    return {
      totalRevenue,
      successCount,
      failedCount,
      pendingCount,
      refundedCount,
      totalCount: list.length,
    };
  });

  // Action methods
  refresh() {
    this.transactionsResource.reload();
  }

  viewDetails(t: Transaction) {
    this.selectedTransaction.set(t);
  }

  closeDetails() {
    this.selectedTransaction.set(null);
  }

  // Format Helper
  getStatusLabel(status: PaymentStatus): string {
    switch (status) {
      case 'success':
        return 'Thành công';
      case 'failed':
        return 'Thất bại';
      case 'pending':
        return 'Chờ xử lý';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return status;
    }
  }
}
