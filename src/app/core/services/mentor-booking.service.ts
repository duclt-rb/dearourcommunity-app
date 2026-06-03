import { Injectable, inject } from '@angular/core';
import type { CreateMentorBookingDto, MentorBookingStatus } from '@dearourcommunity/client';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class MentorBookingService {
  private clientService = inject(ClientService);

  /** Gửi yêu cầu đặt mentor (cần đăng nhập). */
  create(dto: CreateMentorBookingDto) {
    return this.clientService.mentorBookings.create(dto);
  }

  /** Booking của chính user đang đăng nhập. */
  listMine() {
    return this.clientService.mentorBookings.listMine();
  }

  /** Danh sách tất cả booking, lọc theo status (admin). */
  list(status?: MentorBookingStatus) {
    return this.clientService.mentorBookings.list(status);
  }

  /** Duyệt booking → hệ thống gửi mail thanh toán cho user (admin). */
  approve(id: string) {
    return this.clientService.mentorBookings.approve(id);
  }

  /** Từ chối booking, kèm lý do (tuỳ chọn) gửi mail báo user (admin). */
  reject(id: string, reason?: string) {
    return this.clientService.mentorBookings.reject(id, reason);
  }
}
