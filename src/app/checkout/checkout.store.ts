import { inject, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import type { Package, PackageId } from '@dearourcommunity/client';
import { PaymentService } from '../core/services/payment.service';

export interface CheckoutState {
  selectedPackage: Package | null;
  step: number;
  couponApplied: boolean;
  appliedCode: string;
  couponError: boolean;
  isLoading: boolean;
  paymentError: boolean;
  originalPrice: number;
  resultCode: string | null;
  orderId: string | null;
  transId: string | null;
  amount: number;
}

const initialState: CheckoutState = {
  selectedPackage: null,
  step: 1,
  couponApplied: false,
  appliedCode: '',
  couponError: false,
  isLoading: false,
  paymentError: false,
  originalPrice: 500000,
  resultCode: null,
  orderId: null,
  transId: null,
  amount: 500000,
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' }, // Registered globally so that plans component can set package, and checkout flows can read it
  withState(initialState),
  withComputed(({ originalPrice, couponApplied, resultCode, amount }) => ({
    finalPrice: computed(() => (couponApplied() ? originalPrice() * 0.8 : originalPrice())), // 20% discount
    paymentSuccess: computed(() => resultCode() === '0'),
    amountFormatted: computed(() => amount().toLocaleString('vi-VN')),
  })),
  withMethods((store, paymentService = inject(PaymentService)) => ({
    selectPackage(pkg: Package) {
      patchState(store, {
        selectedPackage: pkg,
        originalPrice: Number(pkg.price),
        couponApplied: false,
        appliedCode: '',
        couponError: false,
        step: 1,
      });
    },

    setStep(step: number) {
      patchState(store, { step, paymentError: false });
    },

    applyCoupon(code: string) {
      const cleanCode = code.trim().toUpperCase();
      if (!cleanCode) return;

      if (cleanCode === 'WELCOME20' || cleanCode === 'SALE20') {
        patchState(store, {
          couponApplied: true,
          appliedCode: cleanCode,
          couponError: false,
        });
      } else {
        patchState(store, { couponError: true });
      }
    },

    removeCoupon() {
      patchState(store, {
        couponApplied: false,
        appliedCode: '',
        couponError: false,
      });
    },

    setPaymentParams(
      resultCode: string | null,
      orderId: string | null,
      transId: string | null,
      amount: number,
    ) {
      patchState(store, {
        resultCode,
        orderId,
        transId,
        amount,
      });
    },

    async confirmPayment() {
      const pkg = store.selectedPackage();
      if (!pkg) {
        patchState(store, { paymentError: true });
        return;
      }

      patchState(store, { isLoading: true, paymentError: false });

      try {
        const response = await paymentService.createPayment({
          packageId: pkg.id as PackageId,
          amount: Number(store.finalPrice()),
        });

        if (response && response.payUrl) {
          // Chuyển hướng người dùng sang trang thanh toán MoMo
          window.location.href = response.payUrl;
        } else {
          throw new Error('No payUrl returned from server');
        }
      } catch (err) {
        console.error('Failed to create MoMo payment', err);
        patchState(store, {
          isLoading: false,
          paymentError: true,
        });
      }
    },
  })),
);
