import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import type { MentorBooking } from '@dearourcommunity/client';
import { MentorBookingService } from '../../core/services/mentor-booking.service';

/**
 * Khối "Lịch hẹn mentor của bạn" (CR-001) — dùng chung cho billing & receipt.
 *
 * Nhận `bookingId`, tự fetch booking CỦA CHÍNH USER qua GET /mentor-bookings/me/:id
 * (server enforce ownership — booking của user khác trả 404). Không có bookingId
 * hoặc fetch lỗi/401/404 → không render gì (ẩn im lặng, chỉ log console).
 *
 * Hiển thị TỐI GIẢN: title + tên mentor + khung giờ (confirmedSlotIds khác null →
 * chỉ các slot đã chốt; null → mọi khung đề xuất).
 */
@Component({
  selector: 'app-booking-summary',
  standalone: true,
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})
export default class BookingSummaryComponent {
  private mentorBookingService = inject(MentorBookingService);

  /** Id booking mentor gắn với lượt checkout (null → component không render gì). */
  readonly bookingId = input<string | null>(null);

  /** Booking của chính user — null = không có / không xem được. */
  readonly booking = signal<MentorBooking | null>(null);
  private fetchedBookingId: string | null = null;

  /**
   * Phát booking đã fetch được lên màn hình cha (billing dùng để chặn thanh toán trùng
   * khi booking đã thanh toán/duyệt/từ chối). Fetch lỗi/404 → không emit.
   */
  readonly bookingLoaded = output<MentorBooking>();

  /**
   * Khung giờ hiển thị: đã chốt → chỉ slot trong confirmedSlotIds; chưa → mọi slot
   * đề xuất. Sort theo ngày + giờ thật (snapshot cũ lưu theo thứ tự user bấm chọn).
   */
  readonly slots = computed(() => {
    const mb = this.booking();
    if (!mb) return [];
    const all = mb.selectedTimeSlots ?? [];
    const confirmed = mb.confirmedSlotIds;
    const shown = confirmed ? all.filter((s) => confirmed.includes(s.slotId)) : all;
    return [...shown].sort((a, b) => slotSortKey(a.label).localeCompare(slotSortKey(b.label)));
  });

  constructor() {
    // Fetch khi có bookingId. KHÔNG gate theo AuthStore.isAuthenticated — store đó
    // chỉ được set khi login trong-SPA; mở bằng link mail (full page load) token nằm
    // ở localStorage (ClientService tự gắn vào request) nhưng store vẫn null → card
    // không bao giờ hiện. Route đã có authGuard; request lỗi thì load() ẩn im lặng.
    effect(() => {
      const id = this.bookingId();
      if (!id) return;
      if (this.fetchedBookingId === id) return;
      this.fetchedBookingId = id;
      this.load(id);
    });
  }

  private async load(id: string) {
    try {
      const booking = await this.mentorBookingService.getMine(id);
      this.booking.set(booking);
      this.bookingLoaded.emit(booking);
    } catch (err) {
      // 404 = booking không thuộc user này (server enforce ownership) — chỉ log, không hiện lỗi
      console.warn('Failed to load mentor booking summary', err);
      this.booking.set(null);
    }
  }
}

/**
 * Khoá sort 'yyyy-MM-dd HH:mm' rút từ label BE "Thứ 4, 15/07/2026 · 14:00" —
 * snapshot không lưu startAt nên parse từ label; không khớp định dạng thì đẩy xuống cuối.
 */
function slotSortKey(label: string): string {
  const m = /(\d{2})\/(\d{2})\/(\d{4}).*?(\d{2}):(\d{2})/.exec(label);
  if (!m) return '9999';
  return `${m[3]}-${m[2]}-${m[1]} ${m[4]}:${m[5]}`;
}
