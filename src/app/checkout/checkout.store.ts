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

// CR-006 — id `esg-quick-scan-*` thuộc nhóm Quick Scan (credit quick_scan); còn lại là
// toolkit chuyên đề (credit toolkit). Mirror quy ước BE (toolkits.service).
export const QUICK_SCAN_ID_PREFIX = 'esg-quick-scan-';
export const isQuickScanId = (id: string) => id.startsWith(QUICK_SCAN_ID_PREFIX);

/**
 * CR-001 — guard chống thanh toán trùng booking: BE trả 400 kèm message tiếng Việt
 * (đã thanh toán / đang chờ admin duyệt / đã bị từ chối) ở payment/create, bank/create
 * và bank/confirm khi checkout gắn bookingId. Bắt đúng case đó để UI hiện nguyên văn
 * message dạng notice thay vì lỗi đỏ chung chung "Thanh toán thất bại".
 */
/** Message 400 chung từ BE (vd validate bộ chọn khoá/toolkit) — hiện nguyên văn cho user sửa. */
function toApiErrorMessage(err: unknown): string | null {
  if (err instanceof ApiError && err.code === 400 && err.message) {
    return err.message;
  }
  return null;
}

function toBookingBlockedMessage(err: unknown, hasBookingRef: boolean): string | null {
  if (hasBookingRef && err instanceof ApiError && err.code === 400 && err.message) {
    return err.message;
  }
  return null;
}

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
  // CR-001 5.3b — booking mentor chờ thanh toán (nhánh single). Đọc từ ?bookingId=
  // trong link mail; gửi kèm khi tạo thanh toán để BE tự approve booking khi tiền về.
  bookingRef: string | null;
  // Message 400 từ guard chống thanh toán trùng booking (nguyên văn từ BE) —
  // khác null → ẩn QR/nút xác nhận, hiện notice thân thiện thay vì lỗi đỏ.
  paymentBlockedMsg: string | null;
  // CR-004 — khoá chọn tại checkout: gói có credit course_selection N>0 bắt buộc đúng N id
  // KHÁC NHAU (mỗi khoá click chọn/bỏ chọn, không chọn trùng — kể cả gói org).
  selectedCourseIds: number[];
  // CR-006 — Quick Scan/Toolkit chọn tại checkout (id theo toolkit.data.ts, gộp cả 2 nhóm;
  // phân nhóm bằng prefix `esg-quick-scan-`). Mỗi mục tối đa 1 lần.
  selectedToolkitIds: string[];
  // CR-006 amendment — mục user ĐÃ sở hữu (GET /toolkits/selections/me): loại khỏi pool chọn,
  // và số mục bắt buộc = min(credit, pool còn lại) — khớp validate BE, tránh khoá cứng khi mua lại.
  ownedToolkitIds: string[];
  // Tương tự cho khoá học: id khoá user đã enroll (course.findMyEnrolled) — selection luôn đi
  // kèm enroll nên "đã enroll" là đủ để khớp tập pickable của BE.
  enrolledCourseIds: number[];
  // Message 400 từ validate BE (vd bộ chọn không khớp) — hiện nguyên văn thay vì lỗi đỏ chung.
  paymentErrorMsg: string | null;
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
  bookingRef: null,
  paymentBlockedMsg: null,
  selectedCourseIds: [],
  selectedToolkitIds: [],
  ownedToolkitIds: [],
  enrolledCourseIds: [],
  paymentErrorMsg: null,
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' }, // Registered globally so the checkout flow can read the package selected via ?packageId= (from the main app's /packages page)
  withState(initialState),
  withComputed(
    ({
      resultCode,
      amount,
      originalPrice,
      couponInfo,
      selectedPackage,
      selectedCourseIds,
      selectedToolkitIds,
      ownedToolkitIds,
      enrolledCourseIds,
    }) => ({
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
      // Gói org: khoá chọn thành suất giữ chỗ, owner gán member sau (chỉ khác wording ở UI)
      isOrgPackage: computed(() => selectedPackage()?.packageType === 'organization'),
      selectedCourseCount: computed(() => selectedCourseIds().length),
      // CR-004 amendment — pool khoá user CÒN chọn được (gói cá nhân: loại khoá đã enroll;
      // gói org giữ nguyên — member chưa tồn tại lúc mua). Khớp tập pickable của BE.
      pickableCourseIds: computed(() => {
        const pkg = selectedPackage();
        const poolIds = (pkg?.courses ?? []).map((pc) => Number(pc.wpCourseId));
        if (pkg?.packageType === 'organization') return poolIds;
        const enrolled = new Set(enrolledCourseIds());
        return poolIds.filter((id) => !enrolled.has(id));
      }),
      // CR-006 amendment — pool Quick Scan/Toolkit còn chọn được (loại mục đã sở hữu)
      pickableQuickScanIds: computed(() => {
        const owned = new Set(ownedToolkitIds());
        return Object.entries(selectedPackage()?.features ?? {})
          .filter(([key, value]) => value === true && key.startsWith('toolkit:'))
          .map(([key]) => key.slice('toolkit:'.length))
          .filter((id) => isQuickScanId(id) && !owned.has(id));
      }),
      pickableToolkitIds: computed(() => {
        const owned = new Set(ownedToolkitIds());
        return Object.entries(selectedPackage()?.features ?? {})
          .filter(([key, value]) => value === true && key.startsWith('toolkit:'))
          .map(([key]) => key.slice('toolkit:'.length))
          .filter((id) => !isQuickScanId(id) && !owned.has(id));
      }),
      selectedQuickScanCount: computed(() => selectedToolkitIds().filter(isQuickScanId).length),
      selectedToolkitCount: computed(
        () => selectedToolkitIds().filter((id) => !isQuickScanId(id)).length,
      ),
    }),
  ),
  withComputed(
    ({ selectedPackage, pickableCourseIds, pickableQuickScanIds, pickableToolkitIds }) => ({
      // Số mục BẮT BUỘC chọn = min(credit cấu hình, pool còn chọn được) — khớp validate BE
      // (amendment 06/07: tránh khoá cứng khi user đã sở hữu hết pool / credit vượt pool)
      requiredCourseSelections: computed(() =>
        Math.min(
          selectedPackage()?.credits?.find((c) => c.creditType === 'course_selection')?.amount ?? 0,
          pickableCourseIds().length,
        ),
      ),
      requiredQuickScanSelections: computed(() =>
        Math.min(
          selectedPackage()?.credits?.find((c) => c.creditType === 'quick_scan')?.amount ?? 0,
          pickableQuickScanIds().length,
        ),
      ),
      requiredToolkitSelections: computed(() =>
        Math.min(
          selectedPackage()?.credits?.find((c) => c.creditType === 'toolkit')?.amount ?? 0,
          pickableToolkitIds().length,
        ),
      ),
    }),
  ),
  withComputed(
    ({
      requiredCourseSelections,
      selectedCourseIds,
      requiredQuickScanSelections,
      requiredToolkitSelections,
      selectedQuickScanCount,
      selectedToolkitCount,
    }) => ({
      // Đã chọn đủ N khoá (hoặc gói không yêu cầu)
      courseSelectionComplete: computed(
        () =>
          requiredCourseSelections() === 0 ||
          selectedCourseIds().length === requiredCourseSelections(),
      ),
      // CR-006 — đã chọn đủ theo TỪNG nhóm
      quickScanSelectionComplete: computed(
        () => selectedQuickScanCount() === requiredQuickScanSelections(),
      ),
      toolkitSelectionComplete: computed(
        () => selectedToolkitCount() === requiredToolkitSelections(),
      ),
    }),
  ),
  withComputed(
    ({ courseSelectionComplete, quickScanSelectionComplete, toolkitSelectionComplete }) => ({
      // Tổng gate cho nút "Tiến hành thanh toán": đủ khoá + đủ Quick Scan + đủ Toolkit
      checkoutSelectionComplete: computed(
        () =>
          courseSelectionComplete() && quickScanSelectionComplete() && toolkitSelectionComplete(),
      ),
    }),
  ),
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
        // CR-004/CR-006 — đổi gói → làm lại lựa chọn khoá + toolkit (pool/số lượt theo gói)
        selectedCourseIds: [],
        selectedToolkitIds: [],
      });
    },

    // ── CR-004: chọn khoá tại checkout ─────────────────────────────────────────
    /** Click chọn/bỏ chọn 1 khoá (mọi loại gói — mỗi khoá tối đa 1 lần, tối đa N khoá). */
    toggleCourse(courseId: number) {
      const ids = store.selectedCourseIds();
      if (ids.includes(courseId)) {
        patchState(store, { selectedCourseIds: ids.filter((id) => id !== courseId) });
      } else if (ids.length < store.requiredCourseSelections()) {
        patchState(store, { selectedCourseIds: [...ids, courseId] });
      }
    },

    // ── CR-004/CR-006 amendment: nạp ngữ cảnh "đã sở hữu" để pool/số lượt khớp BE ──
    /** Set khoá user đã enroll; đồng thời gỡ khỏi lựa chọn hiện tại nếu lỡ chọn trước đó. */
    setEnrolledCourseIds(ids: number[]) {
      const enrolled = new Set(ids);
      patchState(store, {
        enrolledCourseIds: ids,
        selectedCourseIds: store.selectedCourseIds().filter((id) => !enrolled.has(id)),
      });
    },

    /** Set toolkit user đã sở hữu; đồng thời gỡ khỏi lựa chọn hiện tại nếu lỡ chọn trước đó. */
    setOwnedToolkitIds(ids: string[]) {
      const owned = new Set(ids);
      patchState(store, {
        ownedToolkitIds: ids,
        selectedToolkitIds: store.selectedToolkitIds().filter((id) => !owned.has(id)),
      });
    },

    // ── CR-006: chọn Quick Scan / Toolkit tại checkout ──────────────────────────
    /** Click chọn/bỏ chọn 1 mục — giới hạn theo credit của TỪNG nhóm (Quick Scan / Toolkit). */
    toggleToolkit(toolkitId: string) {
      const ids = store.selectedToolkitIds();
      if (ids.includes(toolkitId)) {
        patchState(store, { selectedToolkitIds: ids.filter((id) => id !== toolkitId) });
        return;
      }
      const capacity = isQuickScanId(toolkitId)
        ? store.requiredQuickScanSelections() - store.selectedQuickScanCount()
        : store.requiredToolkitSelections() - store.selectedToolkitCount();
      if (capacity > 0) {
        patchState(store, { selectedToolkitIds: [...ids, toolkitId] });
      }
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

    /**
     * CR-001 5.3b: giữ ref booking mentor từ query param `?bookingId=` (link trong mail).
     * Luôn set theo query hiện tại — vào checkout không có bookingId thì xoá ref cũ
     * để không gắn nhầm booking vào giao dịch khác.
     */
    setBookingRef(bookingId: string | null) {
      // Đổi lượt checkout → xoá notice chặn thanh toán của booking trước (nếu có)
      patchState(store, { bookingRef: bookingId, paymentBlockedMsg: null });
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

      patchState(store, { isLoading: true, paymentError: false, paymentErrorMsg: null });

      try {
        const response = await paymentService.createPayment({
          packageId: pkg.id as PackageId,
          // Luôn gửi giá gốc; server tự tính giảm theo couponCode (SDK 0.6.8).
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
          // CR-001 5.3b — booking mentor chờ thanh toán (nếu đến từ link mail)
          bookingId: store.bookingRef() ?? undefined,
          // CR-004 — khoá chọn tại checkout (gói có credit course_selection)
          courseIds: store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
          // CR-006 — Quick Scan/Toolkit chọn tại checkout
          toolkitIds:
            store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
              ? store.selectedToolkitIds()
              : undefined,
        });

        if (response && response.payUrl) {
          // Chuyển hướng người dùng sang trang thanh toán MoMo
          window.location.href = response.payUrl;
        } else {
          throw new Error('No payUrl returned from server');
        }
      } catch (err) {
        console.error('Failed to create MoMo payment', err);
        // 400 từ guard booking (đã thanh toán / chờ duyệt / bị từ chối) → notice, không phải lỗi đỏ
        const blockedMsg = toBookingBlockedMessage(err, !!store.bookingRef());
        patchState(store, {
          isLoading: false,
          paymentError: !blockedMsg,
          paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
          // CR-004/CR-006 — 400 validate (vd bộ chọn không khớp) hiện nguyên văn để user sửa
          paymentErrorMsg: blockedMsg ? null : toApiErrorMessage(err),
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

      patchState(store, { bankCreating: true, bankCreateError: false, paymentErrorMsg: null });

      try {
        const response = await paymentService.createBankTransfer({
          packageId: pkg.id as PackageId,
          // Luôn gửi giá gốc; server tự tính giảm theo couponCode (SDK 0.6.8).
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
          // CR-004/CR-006 — validate sớm bộ khoá + toolkit đã chọn ngay từ bước lấy QR
          courseIds: store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
          toolkitIds:
            store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
              ? store.selectedToolkitIds()
              : undefined,
        });

        patchState(store, { bankTransfer: response, bankCreating: false });
      } catch (err) {
        // BE có thể trả 400 nếu số tiền không khớp giá gói / coupon không hợp lệ.
        console.error('Failed to create bank transfer', err);
        // 400 từ guard booking → notice chặn thanh toán, KHÔNG hiện khối "Thử lại"
        const blockedMsg = toBookingBlockedMessage(err, !!store.bookingRef());
        patchState(store, {
          bankCreating: false,
          bankCreateError: !blockedMsg,
          paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
          // CR-004/CR-006 — 400 validate hiện nguyên văn để user sửa lựa chọn
          paymentErrorMsg: blockedMsg ? null : toApiErrorMessage(err),
        });
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

      patchState(store, { isLoading: true, paymentError: false, paymentErrorMsg: null });

      try {
        // SDK 0.7.0: bank/confirm mới là bước TẠO giao dịch (status awaiting_confirmation),
        // nên ConfirmBankTransferDto kế thừa CreateBankTransferDto — phải gửi đầy đủ
        // packageId + giá gốc + couponCode (cùng dữ liệu đã dùng ở createBankTransfer).
        const response = await paymentService.confirmBankTransfer({
          orderId: bankTransfer.orderId,
          packageId: pkg.id as PackageId,
          amount: Number(store.originalPrice()),
          couponCode: store.couponApplied() ? store.appliedCode() : undefined,
          // CR-001 5.3b — booking mentor chờ thanh toán (nếu đến từ link mail)
          bookingId: store.bookingRef() ?? undefined,
          // CR-004/CR-006 — bước này persist bộ khoá + toolkit vào giao dịch (nguồn chân lý fulfillment)
          courseIds: store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
          toolkitIds:
            store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
              ? store.selectedToolkitIds()
              : undefined,
        });

        if (response.status === 'awaiting_confirmation' || response.status === 'success') {
          patchState(store, { isLoading: false, bankTransferSubmitted: true });
        } else {
          throw new Error(`Unexpected bank transfer status: ${response.status}`);
        }
      } catch (err) {
        console.error('Failed to confirm bank transfer', err);
        // 400 từ guard booking (orderId MỚI cho booking đã có giao dịch) → notice;
        // confirm lại CÙNG orderId vẫn idempotent thành công phía BE nên không vào đây.
        const blockedMsg = toBookingBlockedMessage(err, !!store.bookingRef());
        patchState(store, {
          isLoading: false,
          paymentError: !blockedMsg,
          paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
          // CR-004/CR-006 — 400 validate (vd bộ chọn không khớp) hiện nguyên văn để user sửa
          paymentErrorMsg: blockedMsg ? null : toApiErrorMessage(err),
        });
      }
    },
  })),
);
