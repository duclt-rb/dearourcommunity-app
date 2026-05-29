import { inject, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import type { Package, PackageId } from '@dearourcommunity/client';
import { PaymentService } from '../core/services/payment.service';
import { ProfileStore } from '../profile/profile.store';

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
  withMethods(
    (store, paymentService = inject(PaymentService), profileStore = inject(ProfileStore)) => ({
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

      async verifyEnrollment(orderId: string) {
        patchState(store, { activating: true });

        let attempts = 0;
        const maxAttempts = 15; // Tối đa 30 giây (mỗi lần cách nhau 2 giây)

        const poll = async () => {
          try {
            const res = await paymentService.checkEnrollmentStatus(orderId);
            if (res && res.enrolled) {
              patchState(store, { activating: false });
              // Kích hoạt thành công -> load lại profile mới nhất để cập nhật Sidebar và Dashboard ngay lập tức!
              try {
                await profileStore.loadProfile();
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
            setTimeout(poll, 2000); // Thử lại sau 2 giây
          } else {
            // Hết thời gian chờ, ngừng quay spinner
            patchState(store, { activating: false });
            console.error('Polling enrollment status timed out');
          }
        };

        poll();
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
    }),
  ),
);
