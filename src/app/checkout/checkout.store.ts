import { inject, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { ApiError } from '@dearourcommunity/client';
import type {
  CreateBankTransferResponse,
  Package,
  PackageId,
  ValidateCouponResponse,
} from '@dearourcommunity/client';
import { PaymentService } from '../core/services/payment.service';

export type PaymentMethod = 'momo' | 'bank';

export interface CheckoutState {
  selectedPackage: Package | null;
  step: number;
  couponApplied: boolean;
  appliedCode: string;
  couponError: boolean;
  couponErrorMsg: string;
  couponValidating: boolean;
  // Kết quả validate coupon từ server (POST /coupons/validate) — dùng để hiển thị mức giảm sớm.
  couponInfo: ValidateCouponResponse | null;
  isLoading: boolean;
  paymentError: boolean;
  originalPrice: number;
  resultCode: string | null;
  orderId: string | null;
  transId: string | null;
  amount: number;
  paymentMethod: PaymentMethod;
  bankTransferSubmitted: boolean;
  // Thông tin tài khoản nhận + qrUrl + nội dung CK do backend trả về (POST /bank/create, không ghi DB)
  bankTransfer: CreateBankTransferResponse | null;
  bankCreating: boolean;
  bankCreateError: boolean;
}

const initialState: CheckoutState = {
  selectedPackage: null,
  step: 1,
  couponApplied: false,
  appliedCode: '',
  couponError: false,
  couponErrorMsg: '',
  couponValidating: false,
  couponInfo: null,
  isLoading: false,
  paymentError: false,
  originalPrice: 500000,
  resultCode: null,
  orderId: null,
  transId: null,
  amount: 500000,
  paymentMethod: 'momo',
  bankTransferSubmitted: false,
  bankTransfer: null,
  bankCreating: false,
  bankCreateError: false,
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' }, // Registered globally so the checkout flow can read the package selected via ?packageId= (from the main app's /packages page)
  withState(initialState),
  withComputed(({ resultCode, amount, originalPrice, couponInfo }) => ({
    // Coupon do server tính (changelog SDK 0.6.8): FE gửi giá gốc + couponCode, số tiền
    // sau giảm lấy từ response createBankTransfer (bankTransfer.amount) — không tự trừ ở client.
    paymentSuccess: computed(() => resultCode() === '0'),
    amountFormatted: computed(() => amount().toLocaleString('vi-VN')),
    // Mức giảm hiển thị sớm từ kết quả validate coupon (chỉ để xem trước; số thực thu vẫn
    // do server chốt lại khi tạo thanh toán/chuyển khoản).
    couponFinalPrice: computed(() => couponInfo()?.final_price ?? originalPrice()),
    couponDiscount: computed(() => {
      const info = couponInfo();
      if (!info) return 0;
      return Math.max(0, originalPrice() - info.final_price);
    }),
  })),
  withMethods((store, paymentService = inject(PaymentService)) => ({
    selectPackage(pkg: Package) {
      patchState(store, {
        selectedPackage: pkg,
        originalPrice: Number(pkg.price),
        couponApplied: false,
        appliedCode: '',
        couponError: false,
        couponErrorMsg: '',
        couponValidating: false,
        couponInfo: null,
        step: 1,
      });
    },

    setStep(step: number) {
      // Quay lại bước Order → bỏ giao dịch CK đã tạo, vì coupon/số tiền có thể đổi
      // và lần chọn "Bank Transfer" sau sẽ tạo lại giao dịch mới với số tiền đúng.
      patchState(store, {
        step,
        paymentError: false,
        bankTransferSubmitted: false,
        ...(step === 1 ? { bankTransfer: null, bankCreating: false, bankCreateError: false } : {}),
      });
    },

    selectPaymentMethod(method: PaymentMethod) {
      patchState(store, { paymentMethod: method, paymentError: false });
    },

    async applyCoupon(code: string) {
      const cleanCode = code.trim().toUpperCase();
      if (!cleanCode || store.couponValidating()) return;

      const pkg = store.selectedPackage();
      if (!pkg) {
        patchState(store, {
          couponApplied: false,
          couponInfo: null,
          couponError: true,
          couponErrorMsg: '',
        });
        return;
      }

      patchState(store, { couponValidating: true, couponError: false, couponErrorMsg: '' });

      try {
        // SDK 0.10.0: validate coupon theo packageId (trước đây là course-based). Mọi gói đều
        // validate trước được, kể cả org/mentor không gắn course. Gọi ngay khi bấm "Áp dụng"
        // để báo lỗi / hiển thị mức giảm sớm. Số tiền thực thu vẫn do server chốt lại khi tạo
        // thanh toán/chuyển khoản (FE luôn gửi giá gốc + couponCode); đây chỉ là bản xem trước.
        const info = await paymentService.validateCoupon({
          packageId: pkg.id as PackageId,
          couponCode: cleanCode,
        });
        patchState(store, {
          couponApplied: true,
          appliedCode: cleanCode,
          couponInfo: info,
          couponValidating: false,
          couponError: false,
          couponErrorMsg: '',
        });
      } catch (err) {
        console.error('Failed to validate coupon', err);
        patchState(store, {
          couponApplied: false,
          appliedCode: '',
          couponInfo: null,
          couponValidating: false,
          couponError: true,
          // Hiển thị đúng thông báo từ server (vd "Mã giảm giá không tồn tại.")
          couponErrorMsg: err instanceof ApiError ? err.message : '',
        });
      }
    },

    removeCoupon() {
      patchState(store, {
        couponApplied: false,
        appliedCode: '',
        couponError: false,
        couponErrorMsg: '',
        couponValidating: false,
        couponInfo: null,
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
          // Luôn gửi giá gốc; server tự tính giảm theo couponCode (SDK 0.6.8).
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
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

    /**
     * Lấy thông tin chuyển khoản (POST /bank/create) — tài khoản nhận, qrUrl và
     * nội dung chuyển khoản (= orderId). SDK 0.7.0: bước này KHÔNG còn ghi DB
     * (không tạo record `pending`); giao dịch chỉ được tạo ở bank/confirm.
     * Idempotent: chỉ gọi 1 lần cho mỗi lượt checkout.
     * Gọi khi người dùng chọn phương thức "Bank Transfer".
     */
    async prepareBankTransfer() {
      const pkg = store.selectedPackage();
      if (!pkg) {
        patchState(store, { bankCreateError: true });
        return;
      }
      // Đã có giao dịch hoặc đang tạo → không tạo trùng
      if (store.bankTransfer() || store.bankCreating()) return;

      patchState(store, { bankCreating: true, bankCreateError: false });

      try {
        const response = await paymentService.createBankTransfer({
          packageId: pkg.id as PackageId,
          // Luôn gửi giá gốc; server tự tính giảm theo couponCode (SDK 0.6.8).
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
        });

        patchState(store, { bankTransfer: response, bankCreating: false });
      } catch (err) {
        // BE có thể trả 400 nếu số tiền không khớp giá gói / coupon không hợp lệ.
        console.error('Failed to create bank transfer', err);
        patchState(store, { bankCreating: false, bankCreateError: true });
      }
    },

    /**
     * Xác nhận đã chuyển khoản ngân hàng (POST /bank/confirm).
     * SDK 0.7.0: đây là bước TẠO giao dịch (status `awaiting_confirmation`) — không
     * còn record `pending` rác từ bank/create. Người dùng tự chuyển khoản theo
     * thông tin/QR hiển thị, sau đó bấm nút này → giao dịch vào hàng đợi chờ admin
     * đối soát/duyệt thủ công.
     */
    async confirmBankTransfer() {
      const bankTransfer = store.bankTransfer();
      const pkg = store.selectedPackage();
      if (!bankTransfer || !pkg) {
        // Chưa tạo được giao dịch → thử tạo lại
        patchState(store, { paymentError: true });
        return;
      }

      patchState(store, { isLoading: true, paymentError: false });

      try {
        // SDK 0.7.0: bank/confirm mới là bước TẠO giao dịch (status awaiting_confirmation),
        // nên ConfirmBankTransferDto kế thừa CreateBankTransferDto — phải gửi đầy đủ
        // packageId + giá gốc + couponCode (cùng dữ liệu đã dùng ở createBankTransfer).
        const response = await paymentService.confirmBankTransfer({
          orderId: bankTransfer.orderId,
          packageId: pkg.id as PackageId,
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
        });

        if (response.status === 'awaiting_confirmation' || response.status === 'success') {
          patchState(store, { isLoading: false, bankTransferSubmitted: true });
        } else {
          throw new Error(`Unexpected bank transfer status: ${response.status}`);
        }
      } catch (err) {
        console.error('Failed to confirm bank transfer', err);
        patchState(store, { isLoading: false, paymentError: true });
      }
    },
  })),
);
