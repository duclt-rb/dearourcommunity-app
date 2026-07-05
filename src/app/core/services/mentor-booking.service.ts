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

  /**
   * Một booking cụ thể của chính user (GET /mentor-bookings/me/:id).
   * Server enforce ownership — booking của user khác trả 404, không lộ dữ liệu.
   */
  getMine(id: string) {
    return this.clientService.mentorBookings.getMine(id);
  }

  /** Danh sách tất cả booking, lọc theo status (admin). */
  list(status?: MentorBookingStatus) {
    return this.clientService.mentorBookings.list(status);
  }

  /**
   * Duyệt booking → hệ thống gửi mail thanh toán cho user (admin).
   * `slotIds` = tập con khác rỗng của selectedTimeSlots muốn chốt (1–2 phần tử);
   * bỏ trống → BE tự chốt TẤT CẢ khung giờ đề xuất (default-all, CR-001 Amendment 3).
   */
  approve(id: string, slotIds?: string[]) {
    return this.clientService.mentorBookings.approve(id, slotIds);
  }

  /** Từ chối booking, kèm lý do (tuỳ chọn) gửi mail báo user (admin). */
  reject(id: string, reason?: string) {
    return this.clientService.mentorBookings.reject(id, reason);
  }
}
