import { Component, computed, effect, inject } from '@angular/core';
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

// Định nghĩa hằng số bản đồ tên các gói học tập
const PACKAGE_NAME_MAP: Record<string, string> = {
  'youth-basic': 'Gói Youth Basic',
  'youth-standard': 'Gói Youth Standard',
  'youth-premium': 'Gói Youth Premium',
  'organization-basic': 'Gói Organization Basic',
  'organization-standard': 'Gói Organization Standard',
  'organization-premium': 'Gói Organization Premium',
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
  activating = this.store.activating;

  resultMessage = computed<string>(() => getMomoResultMessage(this.resultCode()));

  constructor() {
    // Đồng bộ cực kỳ đơn giản vì receiptGuard đã đảm bảo dữ liệu hợp lệ!
    effect(() => {
      const code = this.routeResultCode() as string;
      const oId = this.routeOrderId() as string;
      const tId = this.routeTransId() as string;
      const amt = Number(this.routeAmount());

      this.store.setPaymentParams(code, oId, tId, amt);
      this.store.verifyEnrollment(oId);
    });
  }
}
