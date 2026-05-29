import { Component, inject, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CheckoutStore } from '../checkout.store';
import {
  selectQueryResultCode,
  selectQueryOrderId,
  selectQueryTransId,
  selectQueryAmount,
} from '../../core/router.selectors';
import { LucideCheck, LucideHome, LucideArrowRight, LucideCircleX } from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [RouterLink, LucideCheck, LucideHome, LucideArrowRight, LucideCircleX, LogoComponent],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export default class ReceiptComponent implements OnInit {
  private ngrxStore = inject(Store);
  readonly store = inject(CheckoutStore);

  // Chọn trực tiếp từ Router Store bằng Signal!
  readonly routeResultCode = this.ngrxStore.selectSignal(selectQueryResultCode);
  readonly routeOrderId = this.ngrxStore.selectSignal(selectQueryOrderId);
  readonly routeTransId = this.ngrxStore.selectSignal(selectQueryTransId);
  readonly routeAmount = this.ngrxStore.selectSignal(selectQueryAmount);

  get packageName(): string {
    return this.store.selectedPackage()?.name ?? 'Gói Premium';
  }

  // Aliases for 100% template compatibility
  resultCode = this.store.resultCode;
  orderId = this.store.orderId;
  transId = this.store.transId;
  amount = this.store.amount;
  paymentSuccess = this.store.paymentSuccess;
  amountFormatted = this.store.amountFormatted;
  activating = this.store.activating;

  constructor() {
    // Đồng bộ cực kỳ đơn giản vì receiptGuard đã đảm bảo dữ liệu hợp lệ!
    effect(() => {
      const code = (this.routeResultCode() as string) || '0';
      const oId = (this.routeOrderId() as string) || 'MOMO20260529ABC123';
      const tId = (this.routeTransId() as string) || '1283746529';
      const amt = Number(this.routeAmount()) || 500000;

      this.store.setPaymentParams(code, oId, tId, amt);
    });
  }

  ngOnInit() {
    this.store.startActivationTimer();
  }
}
