import { Component, computed, effect, inject, DestroyRef, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideCheck, LucideCircleX, LucideHome } from '@lucide/angular';
import { Store } from '@ngrx/store';
import { getMomoResultMessage } from '../../core/router/momo-result-codes';
import {
  selectDecodedExtraData,
  selectQueryAmount,
  selectQueryOrderId,
  selectQueryResultCode,
  selectQueryTransId,
} from '../../core/router/router.selectors';
import LogoComponent from '../../shared/logo/logo';
import { CheckoutStore } from '../checkout.store';
import { PaymentService } from '../../core/services/payment.service';
import { ProfileStore } from '../../profile/profile.store';

// Bản đồ tên gói (chỉ dùng làm tên dự phòng hiển thị trên biên nhận khi
// không có tên thật từ API). Đồng bộ ID theo master data mới (client ≥0.6.10).
const PACKAGE_NAME_MAP: Record<string, string> = {
  'youth-a': 'Gói Youth A',
  'youth-b': 'Gói Youth B',
  'youth-c': 'Gói Youth C',
  'youth-c-plus': 'Gói Youth C+',
  'org-a': 'Gói Doanh nghiệp A',
  'org-b': 'Gói Doanh nghiệp B',
  'org-c': 'Gói Doanh nghiệp C',
  'org-p': 'Gói Doanh nghiệp P',
};

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [RouterLink, LucideCheck, LucideHome, LucideArrowRight, LucideCircleX, LogoComponent],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export default class ReceiptComponent {
  private ngrxStore = inject(Store);
  private destroyRef = inject(DestroyRef);
  private paymentService = inject(PaymentService);
  private profileStore = inject(ProfileStore);
  readonly store = inject(CheckoutStore);

  // Chọn trực tiếp từ Router Store bằng Signal!
  readonly routeResultCode = this.ngrxStore.selectSignal(selectQueryResultCode);
  readonly routeOrderId = this.ngrxStore.selectSignal(selectQueryOrderId);
  readonly routeTransId = this.ngrxStore.selectSignal(selectQueryTransId);
  readonly routeAmount = this.ngrxStore.selectSignal(selectQueryAmount);
  readonly extraDataObj = this.ngrxStore.selectSignal(selectDecodedExtraData);

  packageName = computed<string>(() => {
    const extra = this.extraDataObj();
    if (extra && extra.packageId) {
      return PACKAGE_NAME_MAP[extra.packageId] ?? 'Gói Premium';
    }
    return 'Gói Premium';
  });

  // Aliases for 100% template compatibility
  resultCode = this.store.resultCode;
  orderId = this.store.orderId;
  transId = this.store.transId;
  amount = this.store.amount;
  paymentSuccess = this.store.paymentSuccess;
  amountFormatted = this.store.amountFormatted;

  // Local signals instead of store state
  readonly activating = signal(false);
  readonly enrolled = signal(false);

  private activeTimeout: ReturnType<typeof setTimeout> | null = null;

  resultMessage = computed<string>(() => getMomoResultMessage(this.resultCode()));

  constructor() {
    // Đồng bộ cực kỳ đơn giản vì receiptGuard đã đảm bảo dữ liệu hợp lệ!
    effect(() => {
      const code = this.routeResultCode() as string;
      const oId = this.routeOrderId() as string;
      const tId = this.routeTransId() as string;
      const amt = Number(this.routeAmount());

      this.store.setPaymentParams(code, oId, tId, amt);

      // Chỉ kích hoạt polling kiểm tra trạng thái kích hoạt nếu giao dịch MoMo thành công!
      if (code === '0' && oId) {
        this.verifyEnrollment(oId);
      }
    });

    this.destroyRef.onDestroy(() => {
      this.clearActiveTimeout();
    });
  }

  private verifyEnrollment(orderId: string) {
    this.clearActiveTimeout();

    this.activating.set(true);
    this.enrolled.set(false);

    let attempts = 0;
    const maxAttempts = 15; // Tối đa 30 giây (mỗi lần cách nhau 2 giây)

    const poll = async () => {
      try {
        const res = await this.paymentService.checkEnrollmentStatus(orderId);
        if (res && res.enrolled) {
          this.activating.set(false);
          this.enrolled.set(true);
          // Kích hoạt thành công -> load lại profile mới nhất để cập nhật Sidebar và Dashboard ngay lập tức!
          try {
            await this.profileStore.loadProfile();
          } catch (err) {
            console.error('Failed to reload profile after successful enrollment', err);
          }
          return;
        }
      } catch (err) {
        console.warn('Failed to check enrollment status', err);
      }

      attempts++;
      if (attempts < maxAttempts) {
        this.activeTimeout = setTimeout(poll, 2000); // Thử lại sau 2 giây
      } else {
        // Hết thời gian chờ, ngừng quay spinner
        this.activating.set(false);
        this.enrolled.set(false);
        console.error('Polling enrollment status timed out');
      }
    };

    poll();
  }

  private clearActiveTimeout() {
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }
  }
}
