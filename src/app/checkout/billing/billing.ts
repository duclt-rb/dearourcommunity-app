import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import type { MentorBooking } from '@dearourcommunity/client';
import { CheckoutStore, type PaymentMethod } from '../checkout.store';
import { findToolkit } from '../../toolkit/toolkit.data';
import { CourseService } from '../../core/services/course.service';
import { ToolkitAccessService } from '../../toolkit/toolkit-access.service';
import { ProfileStore } from '../../profile/profile.store';
import {
  LucideBookOpen,
  LucideCheck,
  LucideTag,
  LucideX,
  LucideSend,
  LucideArrowLeft,
  LucideArrowRight,
  LucideLandmark,
  LucideCopy,
  LucideCircleCheck,
  LucideCircleX,
  LucideExternalLink,
  LucideInfo,
  LucideWrench,
  LucideZap,
} from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';
import BookingSummaryComponent from '../booking-summary/booking-summary';
import { environment } from '../../../environments/environment';

/** Khoá trong pool checkout sau khi map từ `Package.courses` (kèm xuất xứ CR-010). */
interface PackageCourseUI {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  sourcePackageId: string | null;
  sourcePackageName: string | null;
  sourcePackageTier: number | null;
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    LucideBookOpen,
    LucideCheck,
    LucideTag,
    LucideX,
    LucideSend,
    LucideArrowLeft,
    LucideArrowRight,
    LucideLandmark,
    LucideCopy,
    LucideCircleCheck,
    LucideCircleX,
    LucideExternalLink,
    LucideInfo,
    LucideWrench,
    LucideZap,
    LogoComponent,
    BookingSummaryComponent,
  ],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export default class BillingComponent implements OnInit {
  readonly store = inject(CheckoutStore);
  readonly profileStore = inject(ProfileStore);
  private readonly courseService = inject(CourseService);
  private readonly toolkitAccess = inject(ToolkitAccessService);
  private readonly router = inject(Router);

  // MoMo tạm khoá trên production (đang phát triển — "Sắp ra mắt")
  readonly momoDisabled = environment.production;

  ngOnInit() {
    this.profileStore.loadProfile();
    // CR-004/CR-006 amendment — nạp "đã sở hữu" để pool chọn + số lượt khớp validate BE
    // (loại khoá đã enroll, toolkit đã có; required = min(credit, pool còn lại)).
    // Best-effort: lỗi mạng → pool đầy đủ như cũ, BE vẫn là chốt chặn cuối.
    void this.courseService
      .findMyEnrolled()
      .then((courses) => this.store.setEnrolledCourseIds(courses.map((c) => Number(c.id))))
      .catch(() => undefined);
    void this.toolkitAccess
      .ensureSelections()
      .then(() => this.store.setOwnedToolkitIds([...this.toolkitAccess.allowedToolkitIds()]))
      .catch(() => undefined);

    // Production: MoMo chưa mở → mặc định chuyển sang chuyển khoản ngân hàng.
    // Chỉ đặt phương thức, KHÔNG tạo giao dịch CK ở đây — vì lúc init còn đang ở
    // bước Order, người dùng chưa nhập coupon. Nếu tạo ngay, bankTransfer sẽ được
    // chốt với giá gốc (không coupon) và mức giảm không hiển thị ở màn chuyển khoản.
    // Việc tạo giao dịch CK được hoãn tới khi sang bước 2 (goToPayment).
    if (this.momoDisabled && this.paymentMethod() === 'momo') {
      this.store.selectPaymentMethod('bank');
    }
  }

  // Aliases for 100% template compatibility
  step = this.store.step;
  couponApplied = this.store.couponApplied;
  appliedCode = this.store.appliedCode;
  couponError = this.store.couponError;
  couponErrorMsg = this.store.couponErrorMsg;
  couponValidating = this.store.couponValidating;
  couponDiscount = this.store.couponDiscount;
  couponFinalPrice = this.store.couponFinalPrice;
  loading = this.store.isLoading;
  paymentError = this.store.paymentError;
  paymentMethod = this.store.paymentMethod;
  bankTransferSubmitted = this.store.bankTransferSubmitted;
  bankTransfer = this.store.bankTransfer;
  bankCreating = this.store.bankCreating;
  bankCreateError = this.store.bankCreateError;
  paymentBlockedMsg = this.store.paymentBlockedMsg;
  // CR-004/CR-006 — message 400 validate từ BE (hiện nguyên văn để user sửa lựa chọn)
  paymentErrorMsg = this.store.paymentErrorMsg;

  // ── CR-009: nâng cấp gói chỉ trả phần chênh ──
  /** Đang hỏi server số phải trả → khoá nút để không gửi nhầm giá niêm yết. */
  quoteLoading = this.store.quoteLoading;
  isUpgrade = this.store.isUpgrade;
  /** Giá niêm yết của gói (khác số phải trả khi nâng cấp). */
  listPrice = this.store.listPrice;
  upgradeCreditAmount = this.store.upgradeCreditAmount;
  upgradeFromName = this.store.upgradeFromName;

  // ── CR-004: chọn khoá tại checkout ──
  requiredSelections = this.store.requiredCourseSelections;
  selectedCourseCount = this.store.selectedCourseCount;
  courseSelectionComplete = this.store.courseSelectionComplete;
  isOrgPackage = this.store.isOrgPackage;

  // ── CR-006: chọn Quick Scan / Toolkit tại checkout ──
  requiredQuickScans = this.store.requiredQuickScanSelections;
  requiredToolkits = this.store.requiredToolkitSelections;
  selectedQuickScanCount = this.store.selectedQuickScanCount;
  selectedToolkitCount = this.store.selectedToolkitCount;
  quickScanSelectionComplete = this.store.quickScanSelectionComplete;
  toolkitSelectionComplete = this.store.toolkitSelectionComplete;
  /** Gate tổng cho nút thanh toán: đủ khoá + đủ Quick Scan + đủ Toolkit. */
  selectionComplete = this.store.checkoutSelectionComplete;
  // UX 15/07 — gói có lượt nhưng user sở hữu hết pool → khối info thay vì ẩn section;
  // hết lựa chọn thực → store đã chọn sẵn, UI khoá thao tác và ghi chú.
  quickScanFullyOwned = this.store.quickScanPoolFullyOwned;
  toolkitFullyOwned = this.store.toolkitPoolFullyOwned;
  quickScanForced = this.store.quickScanForced;
  toolkitForced = this.store.toolkitForced;

  /** Pool Quick Scan / Toolkit ĐẦY ĐỦ của gói — mục đã sở hữu hiện disabled + badge (UX 15/07). */
  readonly quickScanPool = computed(() => {
    const owned = new Set(this.store.ownedToolkitIds());
    return this.store
      .poolQuickScanIds()
      .map((id) => ({ id, title: findToolkit(id)?.name ?? id, owned: owned.has(id) }));
  });
  readonly toolkitPool = computed(() => {
    const owned = new Set(this.store.ownedToolkitIds());
    return this.store
      .poolToolkitIds()
      .map((id) => ({ id, title: findToolkit(id)?.name ?? id, owned: owned.has(id) }));
  });

  isToolkitSelected(id: string): boolean {
    return this.store.selectedToolkitIds().includes(id);
  }

  toggleToolkit(id: string) {
    this.store.toggleToolkit(id);
  }

  /**
   * Pool khoá CÒN chọn được của gói (đã kèm tên + thumbnail từ GET /packages/:id, theo thứ tự
   * admin sắp; amendment 06/07 — loại khoá user đã enroll để khớp validate BE).
   */
  readonly packageCourses = computed(() => {
    const pkg = this.store.selectedPackage();
    if (!pkg?.courses) return [];
    const pickable = new Set(this.store.pickableCourseIds());
    return [...pkg.courses]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((pc) => ({
        // wp_course_id là bigint — BE serialize thành string, phải ép số để courseIds gửi lên đúng kiểu
        id: Number(pc.wpCourseId),
        title: pc.course?.postTitle ?? `Khoá học #${pc.wpCourseId}`,
        // Ảnh đại diện khoá (SDK 0.18.0) — null/undefined → card fallback icon sách
        thumbnailUrl: pc.course?.thumbnailUrl ?? null,
        // CR-010 — gói xuất xứ (SDK 0.23.0): gói tier thấp nhất cùng ladder có khoá này
        sourcePackageId: pc.sourcePackageId ?? null,
        sourcePackageName: pc.sourcePackageName ?? null,
        sourcePackageTier: pc.sourcePackageTier ?? null,
      }))
      .filter((c) => pickable.has(c.id));
  });

  /**
   * CR-010 — pool khoá chia theo GÓI XUẤT XỨ để user thấy "gói A gồm khoá này, lên gói B có
   * thêm khoá này". Nhóm sắp theo tier tăng dần; khoá không có xuất xứ (gói ngoài ladder) gom
   * vào nhóm cuối không tiêu đề. Chỉ 1 nhóm → template render như cũ (không hiện tiêu đề).
   */
  readonly courseGroups = computed(() => {
    const groups = new Map<
      string,
      {
        packageId: string | null;
        packageName: string | null;
        tier: number;
        courses: PackageCourseUI[];
      }
    >();

    for (const course of this.packageCourses()) {
      const key = course.sourcePackageId ?? '__unknown__';
      const group = groups.get(key) ?? {
        packageId: course.sourcePackageId,
        packageName: course.sourcePackageName,
        // Không rõ xuất xứ → xếp cuối
        tier: course.sourcePackageTier ?? Number.MAX_SAFE_INTEGER,
        courses: [] as PackageCourseUI[],
      };
      group.courses.push(course);
      groups.set(key, group);
    }

    return [...groups.values()].sort((a, b) => a.tier - b.tier);
  });

  isCourseSelected(courseId: number): boolean {
    return this.store.selectedCourseIds().includes(courseId);
  }

  toggleCourse(courseId: number) {
    this.store.toggleCourse(courseId);
  }

  readonly copiedField = signal<string | null>(null);

  // ── CR-001: chặn thanh toán trùng booking (chủ động, trước khi user thao tác) ──
  /** Booking do <app-booking-summary> fetch được, đẩy lên qua output bookingLoaded. */
  readonly bookingInfo = signal<MentorBooking | null>(null);

  onBookingLoaded(booking: MentorBooking) {
    this.bookingInfo.set(booking);
  }

  /** Booking đã thanh toán hoặc đã duyệt → không cho thanh toán lại. */
  readonly bookingAlreadyPaid = computed<boolean>(() => {
    const b = this.bookingInfo();
    return !!b && (b.paymentTransactionId !== null || b.status === 'approved');
  });

  /** Booking đã bị từ chối → không thể thanh toán. */
  readonly bookingRejected = computed<boolean>(() => this.bookingInfo()?.status === 'rejected');

  /** Chặn mọi thao tác thanh toán khi booking đã được xử lý xong. */
  readonly bookingBlocked = computed<boolean>(
    () => this.bookingAlreadyPaid() || this.bookingRejected(),
  );

  // Link tới trang chi tiết gói trên website chính (mở tab mới)
  readonly packageDetailUrl = computed<string | null>(() => {
    const id = this.store.selectedPackage()?.id;
    return id ? `${environment.appUrl}/vi/what-we-offer/${id}` : null;
  });

  // Số tiền phải trả để hiển thị: với chuyển khoản đã tạo giao dịch thì lấy số thực thu
  // (đã trừ coupon) do server trả; còn lại hiển thị giá gốc của gói (MoMo tự xử lý giảm giá).
  readonly displayTotal = computed<number>(() => {
    const bank = this.bankTransfer();
    if (this.paymentMethod() === 'bank' && bank) return bank.amount;
    return this.store.originalPrice();
  });

  get originalPrice(): number {
    return this.store.originalPrice();
  }

  goToPayment() {
    // Booking đã xử lý xong (thanh toán/duyệt/từ chối) → không cho sang bước thanh toán
    if (this.bookingBlocked()) return;
    // CR-004/CR-006 — bắt buộc chọn đủ khoá + Quick Scan + Toolkit (nút đã disable, đây là chốt chặn)
    if (!this.selectionComplete()) return;
    this.store.setStep(2);
    // Tạo giao dịch CK khi sang bước thanh toán — lúc này coupon (nếu có) đã được
    // áp dụng ở bước Order, nên bankTransfer sẽ phản ánh đúng mức giảm.
    if (this.paymentMethod() === 'bank') {
      this.store.prepareBankTransfer();
    }
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

  selectPaymentMethod(method: PaymentMethod) {
    // Chặn chọn MoMo khi đang khoá (production)
    if (method === 'momo' && this.momoDisabled) return;
    this.store.selectPaymentMethod(method);
    // Khi chọn chuyển khoản, tạo giao dịch để lấy thông tin TK + nội dung CK từ server
    if (method === 'bank') {
      this.store.prepareBankTransfer();
    }
  }

  // Thử tạo lại giao dịch chuyển khoản sau khi gặp lỗi
  retryBankTransfer() {
    this.store.prepareBankTransfer();
  }

  async confirmPayment() {
    if (this.paymentMethod() === 'bank') {
      await this.store.confirmBankTransfer();
      const bank = this.bankTransfer();
      // UX 15/07 — xác nhận thành công → sang trang riêng (thông báo 72h + chứng từ
      // + form hoá đơn VAT); lỗi thì ở lại billing hiện message như cũ.
      if (this.bankTransferSubmitted() && bank) {
        void this.router.navigate(['/checkout/bank-confirmation'], {
          queryParams: { orderId: bank.orderId },
        });
      }
    } else {
      this.store.confirmPayment();
    }
  }

  async copyToClipboard(value: string, field: string) {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedField.set(field);
      setTimeout(() => {
        if (this.copiedField() === field) this.copiedField.set(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  }
}
