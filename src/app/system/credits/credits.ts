import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  LucideCoins,
  LucideSearch,
  LucideAlertCircle,
  LucideCheck,
  LucideChevronLeft,
  LucideChevronRight,
  LucideSlidersHorizontal,
} from '@lucide/angular';
import type { CreditKind, CreditRefType, CreditType } from '@dearourcommunity/client';
import { CreditsAdminStore } from './credits.store';

/** Màn CSKH — tra cứu số dư/lịch sử credit của user (hoặc org) + điều chỉnh tay (CR-001 Q15). */
@Component({
  selector: 'app-system-credits',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoPipe,
    LucideCoins,
    LucideSearch,
    LucideAlertCircle,
    LucideCheck,
    LucideChevronLeft,
    LucideChevronRight,
    LucideSlidersHorizontal,
  ],
  providers: [CreditsAdminStore],
  templateUrl: './credits.html',
  styleUrl: './credits.css',
})
export default class SystemCreditsComponent {
  private store = inject(CreditsAdminStore);
  private transloco = inject(TranslocoService);

  // State
  readonly lookupUserId = this.store.lookupUserId;
  readonly lookupOrgId = this.store.lookupOrgId;
  readonly overview = this.store.overview;
  readonly activeUserId = this.store.activeUserId;
  readonly activeOrgId = this.store.activeOrgId;
  readonly historyPage = this.store.historyPage;
  readonly isLoading = this.store.isLoading;
  readonly lookupError = this.store.lookupError;
  readonly adjustCreditType = this.store.adjustCreditType;
  /** CR-011 — bucket cần điều chỉnh (bắt buộc với loại credit có pool). */
  readonly adjustPackageId = this.store.adjustPackageId;
  readonly adjustAmount = this.store.adjustAmount;
  readonly adjustNote = this.store.adjustNote;
  readonly isAdjusting = this.store.isAdjusting;
  readonly adjustError = this.store.adjustError;
  readonly adjustSuccess = this.store.adjustSuccess;

  // Computed
  readonly hasResult = this.store.hasResult;
  readonly historyTotalPages = this.store.historyTotalPages;
  readonly adjustAmountValid = this.store.adjustAmountValid;
  readonly adjustNoteValid = this.store.adjustNoteValid;
  readonly canAdjust = this.store.canAdjust;

  // Methods
  readonly setLookupUserId = this.store.setLookupUserId;
  readonly setLookupOrgId = this.store.setLookupOrgId;
  readonly lookup = this.store.lookup;
  readonly goToHistoryPage = this.store.goToHistoryPage;
  readonly setAdjustCreditType = this.store.setAdjustCreditType;
  readonly setAdjustPackageId = this.store.setAdjustPackageId;
  readonly setAdjustAmount = this.store.setAdjustAmount;
  readonly setAdjustNote = this.store.setAdjustNote;
  readonly submitAdjust = this.store.submitAdjust;

  /**
   * CR-005 — số dư theo loại, chịu được BE cũ chưa deploy migration trả `balances`
   * thiếu key `quick_scan`/`toolkit` (type SDK khai đủ key nên `??` đặt trong template
   * bị NG8102; ép Partial ở đây để fallback 0 hợp lệ về type).
   */
  balanceOf(balances: Partial<Record<CreditType, number>>, type: CreditType): number {
    return balances[type] ?? 0;
  }

  onLookupSubmit(e: Event) {
    e.preventDefault();
    this.lookup();
  }

  onAdjustSubmit(e: Event) {
    e.preventDefault();
    this.submitAdjust();
  }

  getCreditTypeLabel(value: CreditType): string {
    // Nhãn dịch tại render site; CR-008: mentoring_session_org · CR-005: quick_scan / toolkit
    const known: CreditType[] = [
      'mentoring_session',
      'mentoring_session_org',
      'course_selection',
      'quick_scan',
      'toolkit',
    ];
    return known.includes(value)
      ? this.transloco.translate(`system.credits.creditTypes.${value}`)
      : value;
  }

  getKindLabel(value: CreditKind): string {
    switch (value) {
      case 'grant':
      case 'consume':
      case 'adjust':
        return this.transloco.translate(`system.credits.kinds.${value}`);
      default:
        return value;
    }
  }

  getRefTypeLabel(value: CreditRefType | null): string {
    switch (value) {
      case 'purchase':
      case 'booking':
      case 'enrollment':
      case 'admin':
        return this.transloco.translate(`system.credits.refTypes.${value}`);
      default:
        return '—';
    }
  }
}
