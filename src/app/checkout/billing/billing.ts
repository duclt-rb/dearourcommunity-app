import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import {
  LucideCheck,
  LucideTag,
  LucideX,
  LucideSend,
  LucideSmartphone,
  LucideCreditCard,
  LucideArrowLeft,
} from '@lucide/angular';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe,
    LucideCheck,
    LucideTag,
    LucideX,
    LucideSend,
    LucideSmartphone,
    LucideCreditCard,
    LucideArrowLeft,
  ],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export default class BillingComponent {
  private router = inject(Router);

  step = signal(1);
  couponApplied = signal(false);
  appliedCode = signal('');
  couponError = signal(false);
  loading = signal(false);
  paymentError = signal(false);

  originalPrice = 500000;
  finalPrice = computed(() => (this.couponApplied() ? 400000 : 500000));

  goToPayment() {
    this.step.set(2);
    this.paymentError.set(false);
  }

  backToOrder() {
    this.step.set(1);
    this.paymentError.set(false);
  }

  applyCoupon(code: string) {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'WELCOME20' || cleanCode === 'SALE20') {
      this.couponApplied.set(true);
      this.appliedCode.set(cleanCode);
      this.couponError.set(false);
    } else {
      this.couponError.set(true);
    }
  }

  removeCoupon() {
    this.couponApplied.set(false);
    this.appliedCode.set('');
    this.couponError.set(false);
  }

  confirmPayment() {
    this.loading.set(true);
    this.paymentError.set(false);

    // Giả lập redirect tới trang kết quả thanh toán (receipt) sau 2 giây
    setTimeout(() => {
      this.loading.set(false);
      this.router.navigate(['/checkout/receipt'], {
        queryParams: {
          resultCode: '0',
          orderId: 'MOMO' + Date.now(),
          transId: Math.floor(Math.random() * 1000000000).toString(),
          amount: this.finalPrice().toString(),
        },
      });
    }, 2000);
  }
}
