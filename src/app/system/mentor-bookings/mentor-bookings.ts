import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  LucideCalendarClock,
  LucideSearch,
  LucideRefreshCw,
  LucideFilter,
  LucideEye,
  LucideClock,
  LucideUserCheck,
  LucideUserX,
  LucideCheck,
  LucideX,
  LucideInfo,
  LucideMail,
  LucidePhone,
  LucideLoaderCircle,
} from '@lucide/angular';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import type {
  BookingPackageType,
  CareerStage,
  DiscussionTopic,
  MentorBooking,
  MentorBookingStatus,
} from '@dearourcommunity/client';
import { MentorBookingsStore } from './mentor-bookings.store';

@Component({
  selector: 'app-mentor-bookings',
  standalone: true,
  imports: [
    DatePipe,
    LucideCalendarClock,
    LucideSearch,
    LucideRefreshCw,
    LucideFilter,
    LucideEye,
    LucideClock,
    LucideUserCheck,
    LucideUserX,
    LucideCheck,
    LucideX,
    LucideInfo,
    LucideMail,
    LucidePhone,
    LucideLoaderCircle,
    Toast,
    TranslocoPipe,
  ],
  // MessageService scope theo màn — <p-toast> trong template dùng đúng instance này
  providers: [MentorBookingsStore, MessageService],
  templateUrl: './mentor-bookings.html',
  styleUrl: './mentor-bookings.css',
})
export default class MentorBookingsComponent {
  private store = inject(MentorBookingsStore);
  private transloco = inject(TranslocoService);

  // State
  readonly isLoading = this.store.isLoading;
  readonly searchQuery = this.store.searchQuery;
  readonly statusFilter = this.store.statusFilter;
  readonly selectedBooking = this.store.selectedBooking;
  readonly actionLoadingId = this.store.actionLoadingId;
  readonly actionError = this.store.actionError;
  readonly confirmRejectId = this.store.confirmRejectId;
  readonly rejectReason = this.store.rejectReason;
  readonly approveSlotIds = this.store.approveSlotIds;

  // Computed
  readonly bookings = this.store.bookings;
  readonly filteredBookings = this.store.filteredBookings;
  readonly stats = this.store.stats;
  readonly hasActiveFilters = this.store.hasActiveFilters;

  // Methods
  readonly refresh = this.store.refresh;
  readonly setSearch = this.store.setSearch;
  readonly setStatusFilter = this.store.setStatusFilter;
  readonly clearFilters = this.store.clearFilters;
  readonly viewDetails = this.store.viewDetails;
  readonly closeDetails = this.store.closeDetails;
  readonly startReject = this.store.startReject;
  readonly cancelReject = this.store.cancelReject;
  readonly setRejectReason = this.store.setRejectReason;
  readonly toggleApproveSlot = this.store.toggleApproveSlot;
  readonly approve = this.store.approve;
  readonly confirmReject = this.store.confirmReject;

  /** Chỉ booking đang chờ (pending) mới duyệt/từ chối được (BE: reject chỉ hợp lệ khi pending). */
  canReview(b: MentorBooking): boolean {
    return b.status === 'pending';
  }

  /**
   * Booking có ≥2 khung giờ đề xuất → hiện khối tick chọn khung giờ chốt trong modal
   * (mặc định chọn hết — admin bỏ tick khung không muốn chốt, CR-001 Amendment 3).
   */
  needsSlotChoice(b: MentorBooking): boolean {
    return (b.selectedTimeSlots?.length ?? 0) >= 2;
  }

  /** Slot đã được admin chốt khi duyệt (đánh dấu badge "Đã chốt" trong danh sách khung giờ). */
  isConfirmedSlot(b: MentorBooking, slotId: string): boolean {
    return b.confirmedSlotIds?.includes(slotId) ?? false;
  }

  /** Slot đang được tick để chốt khi duyệt (trong modal). */
  isSlotTicked(slotId: string): boolean {
    return this.approveSlotIds().includes(slotId);
  }

  /**
   * Nút duyệt nhanh ở bảng: không truyền slotIds → BE tự chốt TẤT CẢ khung giờ đề xuất
   * (default-all). Muốn chốt bớt khung giờ thì mở modal chi tiết và bỏ tick.
   */
  quickApprove(b: MentorBooking): void {
    this.approve(b);
  }

  /**
   * Duyệt từ modal chi tiết — chốt đúng các khung giờ admin đang tick.
   * Booking đang "chờ thanh toán" (đã chốt giờ rồi) → không gửi slotIds, chỉ resend mail.
   */
  approveSelected(b: MentorBooking): void {
    const sendSlotIds = this.needsSlotChoice(b) && !this.isAwaitingPayment(b);
    this.approve(b, sendSlotIds ? this.approveSlotIds() : undefined);
  }

  /** Đã thanh toán (nhánh single) — suy từ paymentTransactionId (R6, không có status paid riêng). */
  isPaid(b: MentorBooking): boolean {
    return b.paymentTransactionId !== null;
  }

  /**
   * Sub-state "Đã duyệt — chờ thanh toán" (R6): admin đã duyệt nhánh trả phí
   * (confirmedSlotIds đã set, mail link thanh toán đã gửi) nhưng booking GIỮ pending
   * tới khi tiền về. Phân biệt với pending chưa duyệt để user khỏi tưởng lỗi.
   */
  isAwaitingPayment(b: MentorBooking): boolean {
    return b.status === 'pending' && b.confirmedSlotIds !== null;
  }

  /** Class badge trạng thái — pending đã duyệt (chờ thanh toán) dùng badge riêng. */
  getStatusBadgeClass(b: MentorBooking): string {
    return this.isAwaitingPayment(b) ? 'awaiting-payment' : b.status;
  }

  /** Label badge trạng thái — tách sub-state "chờ thanh toán" khỏi "Chờ xử lý". */
  getStatusBadgeLabel(b: MentorBooking): string {
    return this.isAwaitingPayment(b)
      ? this.transloco.translate('system.mentorBookings.awaitingPayment')
      : this.getStatusLabel(b.status);
  }

  /**
   * Nhánh duyệt của BE: `existing` → trừ 1 lượt mentoring ngay + approved;
   * `single` → chỉ gửi mail link thanh toán, booking GIỮ pending
   * (tự approved khi tiền về qua IPN/duyệt giao dịch).
   */
  isExistingBranch(b: MentorBooking): boolean {
    return b.packageType === 'existing';
  }

  getApproveLabel(b: MentorBooking): string {
    if (this.isAwaitingPayment(b)) {
      return this.transloco.translate('system.mentorBookings.approveLabels.resend');
    }
    if (b.packageType === 'existing') {
      return this.transloco.translate('system.mentorBookings.approveLabels.existing');
    }
    if (b.packageType === 'single') {
      return this.transloco.translate('system.mentorBookings.approveLabels.single');
    }
    return this.transloco.translate('system.mentorBookings.approveLabels.default');
  }

  /** Tooltip nút duyệt nhanh trên bảng. */
  getApproveTooltip(b: MentorBooking): string {
    if (this.isAwaitingPayment(b)) {
      return this.transloco.translate('system.mentorBookings.tooltips.resend');
    }
    const suffix = this.transloco.translate('system.mentorBookings.tooltips.approveAllSuffix');
    return `${this.getApproveLabel(b)} ${suffix}`;
  }

  getStatusLabel(status: MentorBookingStatus): string {
    switch (status) {
      case 'pending':
      case 'approved':
      case 'rejected':
        return this.transloco.translate(`system.mentorBookings.status.${status}`);
      default:
        return status;
    }
  }

  getCareerStageLabel(value: CareerStage | null): string {
    switch (value) {
      case 'student':
      case 'fresh-graduate':
      case 'working-under-2':
      case 'working-2-to-5':
      case 'working-over-5':
        return this.transloco.translate(`system.mentorBookings.careerStage.${value}`);
      default:
        return this.transloco.translate('system.mentorBookings.careerStage.notProvided');
    }
  }

  getPackageTypeLabel(value: BookingPackageType | null): string {
    switch (value) {
      case 'single':
      case 'existing':
        return this.transloco.translate(`system.mentorBookings.packageType.${value}`);
      default:
        return this.transloco.translate('system.mentorBookings.packageType.unknown');
    }
  }

  getTopicLabel(value: DiscussionTopic): string {
    switch (value) {
      case 'career-orientation':
      case 'esg-application':
      case 'career-transition':
      case 'skill-development':
      case 'job-application':
      case 'startup':
      case 'other':
        return this.transloco.translate(`system.mentorBookings.topics.${value}`);
      default:
        return value;
    }
  }
}
