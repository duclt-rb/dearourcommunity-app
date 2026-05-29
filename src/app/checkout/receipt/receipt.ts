import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CheckoutStore } from '../checkout.store';
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
  private route = inject(ActivatedRoute);
  readonly store = inject(CheckoutStore);

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

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['resultCode'] !== undefined ? params['resultCode'] : '0';
      const oId = params['orderId'] || 'MOMO20260529ABC123';
      const tId = params['transId'] || '1283746529';

      const amt = Number(params['amount']);
      const amountVal = !isNaN(amt) && amt > 0 ? amt : 500000;

      this.store.setPaymentParams(code, oId, tId, amountVal);
      this.store.startActivationTimer();
    });
  }
}
