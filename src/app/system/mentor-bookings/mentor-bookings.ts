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
  LucideExternalLink,
} from '@lucide/angular';
import type {
  AvailabilityOption,
  CommunicationOption,
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
    LucideExternalLink,
  ],
  providers: [MentorBookingsStore],
  templateUrl: './mentor-bookings.html',
  styleUrl: './mentor-bookings.css',
})
export default class MentorBookingsComponent {
  private store = inject(MentorBookingsStore);

  // State
  readonly isLoading = this.store.isLoading;
  readonly searchQuery = this.store.searchQuery;
  readonly statusFilter = this.store.statusFilter;
  readonly selectedBooking = this.store.selectedBooking;
  readonly actionLoadingId = this.store.actionLoadingId;
  readonly actionError = this.store.actionError;
  readonly confirmRejectId = this.store.confirmRejectId;
  readonly rejectReason = this.store.rejectReason;

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
  readonly approve = this.store.approve;
  readonly confirmReject = this.store.confirmReject;

  /** Chỉ booking đang chờ (pending) mới duyệt/từ chối được. */
  canReview(b: MentorBooking): boolean {
    return b.status === 'pending';
  }

  getStatusLabel(status: MentorBookingStatus): string {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  }

  getAvailabilityLabel(value: AvailabilityOption): string {
    return value === 'weekly' ? 'Hàng tuần' : 'Hàng tháng';
  }

  getCommunicationLabel(value: CommunicationOption): string {
    switch (value) {
      case 'mail':
        return 'Email';
      case 'googleMeet':
        return 'Google Meet';
      case 'inPerson':
        return 'Gặp trực tiếp';
      default:
        return value;
    }
  }
}
