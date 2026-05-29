import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { Router } from '@angular/router';
import type { Package } from '@dearourcommunity/client';

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
  activating: boolean;
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
  activating: false,
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' }, // Registered globally so that plans component can set package, and checkout flows can read it
  withState(initialState),
  withComputed(({ originalPrice, couponApplied, resultCode, amount }) => ({
    finalPrice: computed(() => (couponApplied() ? originalPrice() * 0.8 : originalPrice())), // 20% discount
    paymentSuccess: computed(() => resultCode() === '0'),
    amountFormatted: computed(() => amount().toLocaleString('vi-VN')),
  })),
  withMethods((store) => ({
    selectPackage(pkg: Package) {
      patchState(store, {
        selectedPackage: pkg,
        originalPrice: pkg.price,
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

    startActivationTimer() {
      patchState(store, { activating: true });
      setTimeout(() => {
        patchState(store, { activating: false });
      }, 3000);
    },

    confirmPayment(router: Router) {
      patchState(store, { isLoading: true, paymentError: false });

      // Simulate API call to MoMo / payment gateway
      setTimeout(() => {
        const orderId = 'MOMO' + Date.now();
        const transId = Math.floor(Math.random() * 1000000000).toString();
        const finalPriceVal = store.finalPrice();

        patchState(store, {
          isLoading: false,
          resultCode: '0',
          orderId,
          transId,
          amount: finalPriceVal,
        });

        router.navigate(['/checkout/receipt'], {
          queryParams: {
            resultCode: '0',
            orderId,
            transId,
            amount: finalPriceVal.toString(),
          },
        });
      }, 2000);
    },
  })),
);
