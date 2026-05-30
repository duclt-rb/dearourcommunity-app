import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CheckoutStore } from '../checkout.store';
import { ProfileStore } from '../../profile/profile.store';
import {
  LucideCheck,
  LucideTag,
  LucideX,
  LucideSend,
  LucideSmartphone,
  LucideCreditCard,
  LucideArrowLeft,
} from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    DecimalPipe,
    LucideCheck,
    LucideTag,
    LucideX,
    LucideSend,
    LucideSmartphone,
    LucideCreditCard,
    LucideArrowLeft,
    LogoComponent,
  ],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export default class BillingComponent implements OnInit {
  readonly store = inject(CheckoutStore);
  readonly profileStore = inject(ProfileStore);

  ngOnInit() {
    this.profileStore.loadProfile();
  }

  // Aliases for 100% template compatibility
  step = this.store.step;
  couponApplied = this.store.couponApplied;
  appliedCode = this.store.appliedCode;
  couponError = this.store.couponError;
  loading = this.store.isLoading;
  paymentError = this.store.paymentError;
  finalPrice = this.store.finalPrice;

  get originalPrice(): number {
    return this.store.originalPrice();
  }

  goToPayment() {
    this.store.setStep(2);
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

  confirmPayment() {
    this.store.confirmPayment();
  }
}
