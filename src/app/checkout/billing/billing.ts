import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { MentorBooking } from '@dearourcommunity/client';
import { CheckoutStore, type PaymentMethod } from '../checkout.store';
import { ProfileStore } from '../../profile/profile.store';
import {
  LucideCheck,
  LucideTag,
  LucideX,
  LucideSend,
  LucideArrowLeft,
  LucideArrowRight,
  LucideLandmark,
  LucideCopy,
  LucideCircleCheck,
  LucideCircleX,
  LucideExternalLink,
  LucideInfo,
} from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';
import BookingSummaryComponent from '../booking-summary/booking-summary';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    LucideCheck,
    LucideTag,
    LucideX,
    LucideSend,
    LucideArrowLeft,
    LucideArrowRight,
    LucideLandmark,
    LucideCopy,
    LucideCircleCheck,
    LucideCircleX,
    LucideExternalLink,
    LucideInfo,
    LogoComponent,
    BookingSummaryComponent,
  ],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export default class BillingComponent implements OnInit {
  readonly store = inject(CheckoutStore);
  readonly profileStore = inject(ProfileStore);

  // MoMo tạm khoá trên production (đang phát triển — "Sắp ra mắt")
  readonly momoDisabled = environment.production;

  ngOnInit() {
    this.profileStore.loadProfile();

    // Production: MoMo chưa mở → mặc định chuyển sang chuyển khoản ngân hàng.
    // Chỉ đặt phương thức, KHÔNG tạo giao dịch CK ở đây — vì lúc init còn đang ở
    // bước Order, người dùng chưa nhập coupon. Nếu tạo ngay, bankTransfer sẽ được
    // chốt với giá gốc (không coupon) và mức giảm không hiển thị ở màn chuyển khoản.
    // Việc tạo giao dịch CK được hoãn tới khi sang bước 2 (goToPayment).
    if (this.momoDisabled && this.paymentMethod() === 'momo') {
      this.store.selectPaymentMethod('bank');
    }
  }

  // Aliases for 100% template compatibility
  step = this.store.step;
  couponApplied = this.store.couponApplied;
  appliedCode = this.store.appliedCode;
  couponError = this.store.couponError;
  couponErrorMsg = this.store.couponErrorMsg;
  couponValidating = this.store.couponValidating;
  couponDiscount = this.store.couponDiscount;
  couponFinalPrice = this.store.couponFinalPrice;
  loading = this.store.isLoading;
  paymentError = this.store.paymentError;
  paymentMethod = this.store.paymentMethod;
  bankTransferSubmitted = this.store.bankTransferSubmitted;
  bankTransfer = this.store.bankTransfer;
  bankCreating = this.store.bankCreating;
  bankCreateError = this.store.bankCreateError;
  paymentBlockedMsg = this.store.paymentBlockedMsg;

  readonly copiedField = signal<string | null>(null);

  // ── CR-001: chặn thanh toán trùng booking (chủ động, trước khi user thao tác) ──
  /** Booking do <app-booking-summary> fetch được, đẩy lên qua output bookingLoaded. */
  readonly bookingInfo = signal<MentorBooking | null>(null);

  onBookingLoaded(booking: MentorBooking) {
    this.bookingInfo.set(booking);
  }

  /** Booking đã thanh toán hoặc đã duyệt → không cho thanh toán lại. */
  readonly bookingAlreadyPaid = computed<boolean>(() => {
    const b = this.bookingInfo();
    return !!b && (b.paymentTransactionId !== null || b.status === 'approved');
  });

  /** Booking đã bị từ chối → không thể thanh toán. */
  readonly bookingRejected = computed<boolean>(() => this.bookingInfo()?.status === 'rejected');

  /** Chặn mọi thao tác thanh toán khi booking đã được xử lý xong. */
  readonly bookingBlocked = computed<boolean>(
    () => this.bookingAlreadyPaid() || this.bookingRejected(),
  );

  // Link tới trang chi tiết gói trên website chính (mở tab mới)
  readonly packageDetailUrl = computed<string | null>(() => {
    const id = this.store.selectedPackage()?.id;
    return id ? `${environment.appUrl}/vi/what-we-offer/${id}` : null;
  });

  // Số tiền phải trả để hiển thị: với chuyển khoản đã tạo giao dịch thì lấy số thực thu
  // (đã trừ coupon) do server trả; còn lại hiển thị giá gốc của gói (MoMo tự xử lý giảm giá).
  readonly displayTotal = computed<number>(() => {
    const bank = this.bankTransfer();
    if (this.paymentMethod() === 'bank' && bank) return bank.amount;
    return this.store.originalPrice();
  });

  get originalPrice(): number {
    return this.store.originalPrice();
  }

  goToPayment() {
    // Booking đã xử lý xong (thanh toán/duyệt/từ chối) → không cho sang bước thanh toán
    if (this.bookingBlocked()) return;
    this.store.setStep(2);
    // Tạo giao dịch CK khi sang bước thanh toán — lúc này coupon (nếu có) đã được
    // áp dụng ở bước Order, nên bankTransfer sẽ phản ánh đúng mức giảm.
    if (this.paymentMethod() === 'bank') {
      this.store.prepareBankTransfer();
    }
  }

  backToOrder() {
    this.store.setStep(1);
  }

  applyCoupon(code: string) {
    this.store.applyCoupon(code);
  }

  removeCoupon() {
    this.store.removeCoupon();
  }

  selectPaymentMethod(method: PaymentMethod) {
    // Chặn chọn MoMo khi đang khoá (production)
    if (method === 'momo' && this.momoDisabled) return;
    this.store.selectPaymentMethod(method);
    // Khi chọn chuyển khoản, tạo giao dịch để lấy thông tin TK + nội dung CK từ server
    if (method === 'bank') {
      this.store.prepareBankTransfer();
    }
  }

  // Thử tạo lại giao dịch chuyển khoản sau khi gặp lỗi
  retryBankTransfer() {
    this.store.prepareBankTransfer();
  }

  confirmPayment() {
    if (this.paymentMethod() === 'bank') {
      this.store.confirmBankTransfer();
    } else {
      this.store.confirmPayment();
    }
  }

  async copyToClipboard(value: string, field: string) {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedField.set(field);
      setTimeout(() => {
        if (this.copiedField() === field) this.copiedField.set(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  }
}
