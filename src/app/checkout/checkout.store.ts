import { inject, computed } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { ApiError } from '@dearourcommunity/client';
import type {
  AddonCandidate,
  CheckoutAddon,
  CheckoutPlan,
  CreateBankTransferResponse,
  Package,
  PackageId,
  UpgradeQuote,
  ValidateCouponResponse,
} from '@dearourcommunity/client';
import { formatNumber } from '../core/i18n/format';
import { PackagesService } from '../core/services/packages.service';
import { PaymentService } from '../core/services/payment.service';
import { ToolkitAccessService } from '../toolkit/toolkit-access.service';

export type PaymentMethod = 'momo' | 'bank';

/**
 * UX CR-006 amendment 15/07 — message thay cho 400 nguyên văn khi quyền sở hữu
 * Quick Scan/Toolkit đổi giữa chừng (admin duyệt/backfill sau khi trang đã load)
 * và app đã tự đồng bộ lại lựa chọn. Chỉ giữ KEY ở module-level; dịch tại nơi dùng.
 */
const OWNED_RECONCILED_KEY = 'checkout.store.ownedReconciled';

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
  // CR-009 — báo giá nâng cấp do server tính (GET /packages/:id/upgrade-quote). Khi user đã
  // sở hữu gói thấp hơn cùng ladder thì `originalPrice` = payableAmount (phần chênh), và số
  // credit thực nhận = `creditDeltas` (không phải nguyên config gói).
  upgradeQuote: UpgradeQuote | null;
  // Đang lấy báo giá → khoá nút thanh toán để không gửi nhầm giá niêm yết (BE sẽ 400).
  quoteLoading: boolean;
  // CR-011 — số mục phải chọn theo TỪNG GÓI (bucket) do server tính; `null` = chưa nạp.
  // Lượt của gói nào chỉ tiêu được trong pool của gói đó nên FE phải đếm theo bucket.
  checkoutPlan: CheckoutPlan | null;
  // CR-012 — món MUA LẺ đã bấm "+" (khoá của gói cao hơn / Quick Scan / Toolkit). Giá do server
  // quyết; FE chỉ gửi (type, refId). Luôn được lọc lại theo `checkoutPlan.addonCandidates`.
  selectedAddons: CheckoutAddon[];
  // CR-012 — món đến từ deep-link `?addons=extra_course:9890` của Frontpage, giữ lại tới khi nạp
  // xong kế hoạch checkout rồi mới đối chiếu với danh sách bán được (không tin query param).
  pendingAddonRefs: CheckoutAddon[];
  // Lấy báo giá THẤT BẠI. Checkout luôn nằm sau authGuard nên đây là lỗi thật (không phải
  // "khách vãng lai") → fail-closed: khoá nút thanh toán + cho user thử lại, thay vì âm thầm
  // dùng giá niêm yết & số lượt của config gói (sai với lượt nâng cấp, submit sẽ ăn 400).
  quoteError: boolean;
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
  upgradeQuote: null,
  quoteLoading: false,
  quoteError: false,
  checkoutPlan: null,
  selectedAddons: [],
  pendingAddonRefs: [],
};

/** Khoá định danh một món mua lẻ (loại + id) — dùng để so khớp/dedupe. */
const addonKey = (addon: CheckoutAddon) => `${addon.type}:${addon.refId}`;

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
      enrolledCourseIds,
      upgradeQuote,
      checkoutPlan,
      selectedAddons,
    }) => ({
      // ── CR-012: mua lẻ tại checkout ──────────────────────────────────────────
      /** Món bán được cho gói này (server tính: đã loại món miễn phí trong gói / đã sở hữu). */
      addonCandidates: computed<AddonCandidate[]>(() => checkoutPlan()?.addonCandidates ?? []),
      /** Tổng tiền món thêm — chỉ để HIỂN THỊ; số thực thu do server cộng lại khi tạo đơn. */
      addonAmount: computed(() => {
        const priceByKey = new Map(
          (checkoutPlan()?.addonCandidates ?? []).map((c) => [addonKey(c), c.price]),
        );
        return selectedAddons().reduce(
          (sum, addon) => sum + (priceByKey.get(addonKey(addon)) ?? 0),
          0,
        );
      }),
      selectedAddonCount: computed(() => selectedAddons().length),
      // CR-011 — số mục phải chọn do SERVER tính theo từng bucket (gói). FE chỉ hiển thị và
      // gate; BE validate lại bằng đúng hàm này nên không thể lệch.
      planCourseRequired: computed(() => checkoutPlan()?.courses.required ?? 0),
      planQuickScanRequired: computed(() => checkoutPlan()?.quickScan.required ?? 0),
      planToolkitRequired: computed(() => checkoutPlan()?.toolkit.required ?? 0),
      /** Dãy đếm theo gói để hiện "Gói A 1/1 · Gói B 0/2". */
      courseBuckets: computed(() =>
        (checkoutPlan()?.courses.buckets ?? []).map((bucket) => ({
          packageId: bucket.packageId,
          label: bucket.packageLabel?.trim().split(/\s+/).pop() ?? bucket.packageId,
          capacity: bucket.capacity,
          selected: selectedCourseIds().filter((id) => bucket.itemIds.includes(id)).length,
          // Pool riêng của gói này — dùng để chia section khoá theo gói ở checkout
          itemIds: bucket.itemIds,
        })),
      ),
      // CR-009 — số credit THỰC được cấp cho lượt này: nâng cấp = phần chênh (creditDeltas
      // trong quote), mua mới = nguyên config gói. Số khoá/Quick Scan/Toolkit phải chọn ở
      // checkout tính theo số này, khớp validate BE.
      grantedCredits: computed(() => {
        const deltas = upgradeQuote()?.creditDeltas;
        const source = deltas?.length ? deltas : (selectedPackage()?.credits ?? []);
        return new Map(source.map((c) => [c.creditType, Number(c.amount)]));
      }),
      // Giá niêm yết của gói (khác `originalPrice` = số thực phải trả khi nâng cấp)
      listPrice: computed(() => Number(selectedPackage()?.price ?? 0)),
      isUpgrade: computed(() => upgradeQuote()?.isUpgrade ?? false),
      upgradeCreditAmount: computed(() => Number(upgradeQuote()?.creditAmount ?? 0)),
      upgradeFromName: computed(() => upgradeQuote()?.fromPackageName ?? null),
      // Coupon do server tính (changelog SDK 0.6.8): FE gửi giá gốc + couponCode, số tiền
      // sau giảm lấy từ response createBankTransfer (bankTransfer.amount) — không tự trừ ở client.
      paymentSuccess: computed(() => resultCode() === '0'),
      amountFormatted: computed(() => formatNumber(amount())),
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
        // CR-011 — pool người mua được chọn = khoá RIÊNG của gói + khoá KẾ THỪA từ gói con
        const poolIds = [...(pkg?.courses ?? []), ...(pkg?.inheritedCourses ?? [])].map((pc) =>
          Number(pc.wpCourseId),
        );
        if (pkg?.packageType === 'organization') return poolIds;
        const enrolled = new Set(enrolledCourseIds());
        return poolIds.filter((id) => !enrolled.has(id));
      }),
      // CR-006 — FULL pool Quick Scan/Toolkit theo flag `toolkit:*` của gói, KỂ CẢ mục đã
      // sở hữu (UX 15/07: mục sở hữu hiện disabled + badge "Đã sở hữu" thay vì ẩn không lý do)
      poolQuickScanIds: computed(() =>
        Object.entries(selectedPackage()?.features ?? {})
          .filter(([key, value]) => value === true && key.startsWith('toolkit:'))
          .map(([key]) => key.slice('toolkit:'.length))
          .filter(isQuickScanId),
      ),
      poolToolkitIds: computed(() =>
        Object.entries(selectedPackage()?.features ?? {})
          .filter(([key, value]) => value === true && key.startsWith('toolkit:'))
          .map(([key]) => key.slice('toolkit:'.length))
          .filter((id) => !isQuickScanId(id)),
      ),
      selectedQuickScanCount: computed(() => selectedToolkitIds().filter(isQuickScanId).length),
      selectedToolkitCount: computed(
        () => selectedToolkitIds().filter((id) => !isQuickScanId(id)).length,
      ),
    }),
  ),
  withComputed(({ poolQuickScanIds, poolToolkitIds, ownedToolkitIds, grantedCredits }) => ({
    // Credit thực nhận theo nhóm — để phân biệt "gói không có lượt" vs "đã sở hữu hết pool"
    // (CR-009: lượt nâng cấp là phần chênh, không phải nguyên config gói)
    configuredQuickScanCredit: computed(() => grantedCredits().get('quick_scan') ?? 0),
    configuredToolkitCredit: computed(() => grantedCredits().get('toolkit') ?? 0),
    // CR-006 amendment — pool còn chọn được (loại mục đã sở hữu) — khớp tập pickable của BE
    pickableQuickScanIds: computed(() => {
      const owned = new Set(ownedToolkitIds());
      return poolQuickScanIds().filter((id) => !owned.has(id));
    }),
    pickableToolkitIds: computed(() => {
      const owned = new Set(ownedToolkitIds());
      return poolToolkitIds().filter((id) => !owned.has(id));
    }),
  })),
  withComputed(
    ({
      grantedCredits,
      pickableCourseIds,
      pickableQuickScanIds,
      pickableToolkitIds,
      configuredQuickScanCredit,
      configuredToolkitCredit,
      planCourseRequired,
      planQuickScanRequired,
      planToolkitRequired,
    }) => ({
      // Số mục BẮT BUỘC chọn = min(credit thực nhận, pool còn chọn được) — khớp validate BE
      // (amendment 06/07: tránh khoá cứng khi user đã sở hữu hết pool / credit vượt pool;
      // CR-009: credit thực nhận của lượt nâng cấp là phần chênh)
      // CR-011 — tổng số khoá phải chọn = tổng capacity các bucket (server tính); fallback về
      // công thức cũ khi chưa nạp được plan (BE vẫn là chốt chặn cuối).
      requiredCourseSelections: computed(() =>
        planCourseRequired() > 0
          ? planCourseRequired()
          : Math.min(grantedCredits().get('course_selection') ?? 0, pickableCourseIds().length),
      ),
      requiredQuickScanSelections: computed(() =>
        planQuickScanRequired() > 0
          ? planQuickScanRequired()
          : Math.min(configuredQuickScanCredit(), pickableQuickScanIds().length),
      ),
      requiredToolkitSelections: computed(() =>
        planToolkitRequired() > 0
          ? planToolkitRequired()
          : Math.min(configuredToolkitCredit(), pickableToolkitIds().length),
      ),
    }),
  ),
  withComputed(
    ({
      poolQuickScanIds,
      poolToolkitIds,
      pickableQuickScanIds,
      pickableToolkitIds,
      configuredQuickScanCredit,
      configuredToolkitCredit,
      requiredQuickScanSelections,
      requiredToolkitSelections,
    }) => ({
      // UX 15/07 — gói CÓ lượt nhưng user đã sở hữu hết pool → required 0; UI hiện khối
      // info "đã sở hữu toàn bộ" thay vì ẩn section không lý do.
      quickScanPoolFullyOwned: computed(
        () =>
          configuredQuickScanCredit() > 0 &&
          poolQuickScanIds().length > 0 &&
          pickableQuickScanIds().length === 0,
      ),
      toolkitPoolFullyOwned: computed(
        () =>
          configuredToolkitCredit() > 0 &&
          poolToolkitIds().length > 0 &&
          pickableToolkitIds().length === 0,
      ),
      // UX 15/07 — không còn lựa chọn thực (số bài còn lại = số lượt) → chọn sẵn toàn bộ,
      // UI khoá thao tác thay vì bắt user click cho đủ.
      quickScanForced: computed(
        () =>
          requiredQuickScanSelections() > 0 &&
          pickableQuickScanIds().length === requiredQuickScanSelections(),
      ),
      toolkitForced: computed(
        () =>
          requiredToolkitSelections() > 0 &&
          pickableToolkitIds().length === requiredToolkitSelections(),
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
  withMethods(
    (
      store,
      paymentService = inject(PaymentService),
      packagesService = inject(PackagesService),
      toolkitAccess = inject(ToolkitAccessService),
      transloco = inject(TranslocoService),
    ) => {
      /** UX 15/07 — không còn lựa chọn thực → chọn sẵn toàn bộ mục còn lại (UI khoá thao tác). */
      const autoSelectForcedToolkits = () => {
        const picks = new Set(store.selectedToolkitIds());
        if (store.quickScanForced()) store.pickableQuickScanIds().forEach((id) => picks.add(id));
        if (store.toolkitForced()) store.pickableToolkitIds().forEach((id) => picks.add(id));
        if (picks.size !== store.selectedToolkitIds().length) {
          patchState(store, { selectedToolkitIds: [...picks] });
        }
      };

      /**
       * UX 15/07 — 400 validate có thể do quyền sở hữu đổi giữa chừng (admin duyệt/backfill
       * sau khi trang đã load): refetch selections/me, gỡ mục đã sở hữu khỏi lựa chọn rồi
       * chọn sẵn lại nếu hết lựa chọn thực. Trả true nếu lựa chọn/số lượt giảm (khi đó UI
       * hiện message hành động được thay vì 400 nguyên văn của BE).
       */
      const reconcileOwnedToolkits = async (): Promise<boolean> => {
        const beforeSelected = store.selectedToolkitIds();
        const beforeRequired =
          store.requiredQuickScanSelections() + store.requiredToolkitSelections();
        toolkitAccess.invalidateSelections();
        await toolkitAccess.ensureSelections(); // lỗi mạng đã nuốt bên trong → set rỗng
        const owned = [...toolkitAccess.allowedToolkitIds()];
        // Set rỗng trong khi store đang có dữ liệu nhiều khả năng là fetch lỗi (quyền đã cấp
        // không bị thu hồi trong luồng thường) → giữ nguyên, BE vẫn là chốt chặn cuối.
        if (owned.length === 0 && store.ownedToolkitIds().length > 0) return false;
        const ownedSet = new Set(owned);
        patchState(store, {
          ownedToolkitIds: owned,
          selectedToolkitIds: beforeSelected.filter((id) => !ownedSet.has(id)),
        });
        autoSelectForcedToolkits();
        const afterRequired =
          store.requiredQuickScanSelections() + store.requiredToolkitSelections();
        return afterRequired < beforeRequired || beforeSelected.some((id) => ownedSet.has(id));
      };

      /**
       * CR-009 — lấy báo giá nâng cấp cho gói đang chọn. Server là nguồn chân lý: user đang
       * giữ gói thấp hơn cùng ladder thì `originalPrice` (số gửi đi khi thanh toán) chuyển
       * thành phần chênh. Best-effort: chưa đăng nhập/lỗi mạng → giữ giá niêm yết (BE vẫn
       * chặn bằng anti-tamper nếu thực sự phải trả số khác).
       */
      const loadUpgradeQuote = async (packageId: string): Promise<void> => {
        patchState(store, { quoteLoading: true, quoteError: false });
        try {
          // CR-011 — kế hoạch checkout (số mục phải chọn theo từng bucket) đi kèm báo giá.
          // GIÁ là fail-closed (sai số tiền thì không cho thanh toán), còn PLAN chỉ ảnh hưởng
          // số lượt hiển thị nên lỗi thì rơi về công thức cũ — BE vẫn validate lại khi submit.
          const quote = await packagesService.getUpgradeQuote(packageId);
          const plan = await paymentService.getCheckoutPlan(packageId).catch((err) => {
            console.error('Failed to load checkout plan', err);
            return null;
          });
          if (store.selectedPackage()?.id !== packageId) {
            // Đổi gói giữa chừng: bỏ kết quả cũ nhưng phải hạ cờ loading, tránh kẹt nút
            patchState(store, { quoteLoading: false });
            return;
          }
          patchState(store, {
            upgradeQuote: quote,
            checkoutPlan: plan,
            originalPrice: Number(quote.payableAmount),
            quoteLoading: false,
            quoteError: false,
          });
          // Số lượt có thể đã co lại (nâng cấp = phần chênh) → chọn sẵn nếu hết lựa chọn thực
          autoSelectForcedToolkits();
          // CR-012 — đã có danh sách món bán được → chốt lại lựa chọn (kể cả món từ deep-link)
          reconcileAddons();
        } catch (err) {
          // Fail-closed: KHÔNG rơi về giá niêm yết/config gói vì với lượt nâng cấp cả số tiền
          // lẫn số lượt chọn đều sai → user thao tác xong mới bị BE từ chối.
          console.error('Failed to load upgrade quote', err);
          patchState(store, {
            upgradeQuote: null,
            checkoutPlan: null,
            quoteLoading: false,
            quoteError: true,
          });
        }
      };

      /**
       * CR-012 — chỉ giữ lại món thực sự BÁN ĐƯỢC cho gói này (gộp cả món deep-link từ
       * Frontpage). Query param là dữ liệu ngoài nên phải đối chiếu với danh sách server trả
       * về, nếu không user có thể tự thêm món rồi ăn 400 lúc submit.
       */
      const reconcileAddons = () => {
        const sellable = new Set(
          (store.checkoutPlan()?.addonCandidates ?? []).map((candidate) => addonKey(candidate)),
        );
        const merged = new Map<string, CheckoutAddon>();
        for (const addon of [...store.selectedAddons(), ...store.pendingAddonRefs()]) {
          if (sellable.has(addonKey(addon))) merged.set(addonKey(addon), addon);
        }
        patchState(store, { selectedAddons: [...merged.values()], pendingAddonRefs: [] });
      };

      return {
        loadUpgradeQuote,

        selectPackage(pkg: Package) {
          patchState(store, {
            selectedPackage: pkg,
            originalPrice: Number(pkg.price),
            upgradeQuote: null,
            checkoutPlan: null,
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
            // CR-012 — đổi gói → bỏ món mua lẻ cũ (danh sách bán được theo từng gói)
            selectedAddons: [],
          });
          // UX 15/07 — pool mới không còn lựa chọn thực → chọn sẵn luôn
          autoSelectForcedToolkits();
          // CR-009 — hỏi server số thực phải trả cho gói này (nâng cấp = phần chênh)
          void loadUpgradeQuote(pkg.id);
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

        // ── CR-012: mua lẻ tại checkout ────────────────────────────────────────────
        /** Bỏ một món mua lẻ khỏi đơn (UI chỉ hiện món đã chọn nên đây là nút ×). */
        toggleAddon(addon: CheckoutAddon) {
          const key = addonKey(addon);
          const current = store.selectedAddons();
          if (current.some((item) => addonKey(item) === key)) {
            patchState(store, { selectedAddons: current.filter((item) => addonKey(item) !== key) });
            return;
          }
          const sellable = store.addonCandidates().some((candidate) => addonKey(candidate) === key);
          if (sellable) {
            patchState(store, {
              selectedAddons: [...current, { type: addon.type, refId: addon.refId }],
            });
          }
        },

        /**
         * CR-012 D8 — món chọn sẵn từ Frontpage qua `?addons=extra_course:9890`.
         * Giữ tạm rồi lọc qua `addonCandidates` khi kế hoạch checkout về (reconcileAddons).
         */
        setPendingAddons(raw: string | null) {
          const parsed = (raw ?? '')
            .split(',')
            .map((chunk) => chunk.trim())
            .filter(Boolean)
            .map((chunk) => {
              const [type, ...rest] = chunk.split(':');
              return { type, refId: rest.join(':') };
            })
            .filter(
              (item): item is CheckoutAddon =>
                !!item.refId &&
                (item.type === 'extra_course' ||
                  item.type === 'quick_scan' ||
                  item.type === 'toolkit'),
            );
          patchState(store, { pendingAddonRefs: parsed });
          // Chỉ chốt ngay khi ĐÃ có plan ĐÚNG gói đang chọn (vào lại /billing mà store còn plan).
          // Tải trang MỚI thì cả plan lẫn gói đều null — PHẢI giữ nguyên pending (đừng để
          // `undefined === undefined` chạy reconcile khi addonCandidates còn rỗng → xoá mất
          // pending); `loadUpgradeQuote` sẽ chốt sau khi nạp plan.
          const plan = store.checkoutPlan();
          if (plan && plan.packageId === store.selectedPackage()?.id) reconcileAddons();
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
          // UX 15/07 — sau khi loại mục sở hữu, nếu hết lựa chọn thực → chọn sẵn phần còn lại
          autoSelectForcedToolkits();
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
            ...(step === 1
              ? { bankTransfer: null, bankCreating: false, bankCreateError: false }
              : {}),
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
              courseIds:
                store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
              // CR-006 — Quick Scan/Toolkit chọn tại checkout
              toolkitIds:
                store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
                  ? store.selectedToolkitIds()
                  : undefined,
              // CR-012 — món mua lẻ (server tự cộng tiền theo bảng giá)
              addons: store.selectedAddons().length ? store.selectedAddons() : undefined,
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
            // CR-004/CR-006 — 400 validate (vd bộ chọn không khớp) hiện nguyên văn để user sửa;
            // UX 15/07: nếu do quyền sở hữu vừa đổi thì tự đồng bộ lại và hiện message hành động được
            let errorMsg = blockedMsg ? null : toApiErrorMessage(err);
            if (errorMsg && (await reconcileOwnedToolkits()))
              errorMsg = transloco.translate(OWNED_RECONCILED_KEY);
            patchState(store, {
              isLoading: false,
              paymentError: !blockedMsg,
              paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
              paymentErrorMsg: errorMsg,
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
              courseIds:
                store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
              toolkitIds:
                store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
                  ? store.selectedToolkitIds()
                  : undefined,
              // CR-012 — món mua lẻ: số tiền trên QR phải là TỔNG THU (gói + món thêm)
              addons: store.selectedAddons().length ? store.selectedAddons() : undefined,
            });

            patchState(store, { bankTransfer: response, bankCreating: false });
          } catch (err) {
            // BE có thể trả 400 nếu số tiền không khớp giá gói / coupon không hợp lệ.
            console.error('Failed to create bank transfer', err);
            // 400 từ guard booking → notice chặn thanh toán, KHÔNG hiện khối "Thử lại"
            const blockedMsg = toBookingBlockedMessage(err, !!store.bookingRef());
            // CR-004/CR-006 — 400 validate hiện nguyên văn để user sửa lựa chọn;
            // UX 15/07: nếu do quyền sở hữu vừa đổi thì tự đồng bộ lại và hiện message hành động được
            let errorMsg = blockedMsg ? null : toApiErrorMessage(err);
            if (errorMsg && (await reconcileOwnedToolkits()))
              errorMsg = transloco.translate(OWNED_RECONCILED_KEY);
            patchState(store, {
              bankCreating: false,
              bankCreateError: !blockedMsg,
              paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
              paymentErrorMsg: errorMsg,
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
              courseIds:
                store.requiredCourseSelections() > 0 ? store.selectedCourseIds() : undefined,
              toolkitIds:
                store.requiredQuickScanSelections() + store.requiredToolkitSelections() > 0
                  ? store.selectedToolkitIds()
                  : undefined,
              // CR-012 — bước này persist món mua lẻ vào giao dịch (nguồn chân lý fulfillment)
              addons: store.selectedAddons().length ? store.selectedAddons() : undefined,
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
            // CR-004/CR-006 — 400 validate (vd bộ chọn không khớp) hiện nguyên văn để user sửa;
            // UX 15/07: nếu do quyền sở hữu vừa đổi thì tự đồng bộ lại và hiện message hành động được
            let errorMsg = blockedMsg ? null : toApiErrorMessage(err);
            if (errorMsg && (await reconcileOwnedToolkits()))
              errorMsg = transloco.translate(OWNED_RECONCILED_KEY);
            patchState(store, {
              isLoading: false,
              paymentError: !blockedMsg,
              paymentBlockedMsg: blockedMsg ?? store.paymentBlockedMsg(),
              paymentErrorMsg: errorMsg,
            });
          }
        },
      };
    },
  ),
);
