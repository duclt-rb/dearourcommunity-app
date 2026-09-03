import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ApiError } from '@dearourcommunity/client';
import type { InvoiceBuyerType, InvoiceRequest } from '@dearourcommunity/client';
import { ClientService } from '../../core/services/client.service';
import { ProfileStore } from '../../profile/profile.store';

/**
 * CR-007 amendment 08/07 — form yêu cầu xuất hoá đơn VAT hiển thị SAU khi user xác nhận
 * thanh toán (màn "Tôi đã chuyển khoản" của billing + trang receipt MoMo). Gửi qua
 * POST /invoices/requests theo orderId — idempotent, gửi lại trả về yêu cầu cũ.
 * Field theo form kế toán; validate mirror BE (invoiceInfoSchema).
 */
@Component({
  selector: 'app-invoice-request-form',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './invoice-request-form.html',
  styleUrl: './invoice-request-form.css',
})
export default class InvoiceRequestFormComponent {
  private readonly clientService = inject(ClientService);
  private readonly profileStore = inject(ProfileStore);
  private readonly transloco = inject(TranslocoService);

  /** orderId của giao dịch vừa xác nhận (bank: bankTransfer.orderId; MoMo: query ở receipt). */
  readonly orderId = input.required<string>();

  readonly enabled = signal(false);
  readonly buyerType = signal<InvoiceBuyerType>('company');
  readonly companyName = signal('');
  readonly taxCode = signal('');
  /** Cá nhân: họ tên theo CCCD. Doanh nghiệp: người đại diện/liên hệ nhận HĐ. */
  readonly buyerName = signal('');
  readonly idNumber = signal('');
  readonly address = signal('');
  readonly email = signal('');
  readonly phone = signal('');
  readonly note = signal('');
  readonly confirmAccuracy = signal(false);
  readonly confirmConsent = signal(false);

  readonly submitting = signal(false);
  /** Yêu cầu đã gửi thành công — chuyển form sang trạng thái "đã ghi nhận". */
  readonly submitted = signal<InvoiceRequest | null>(null);
  readonly errorMsg = signal<string | null>(null);

  /** User đã tự sửa email nhận hoá đơn → không prefill đè nữa. */
  private emailTouched = false;

  constructor() {
    // Prefill email tài khoản — best-effort: chỉ tự load khi store chưa có email (billing
    // đã load profile; receipt sau redirect MoMo thì chưa), lỗi mạng/token bỏ qua để không
    // ném unhandled rejection (loadProfile catch xong throw lại).
    if (!this.profileStore.email()) {
      void this.profileStore.loadProfile().catch(() => undefined);
    }
    effect(() => {
      const accountEmail = this.profileStore.email();
      if (accountEmail && !this.emailTouched && !this.email()) {
        this.email.set(accountEmail);
      }
    });
  }

  /** MST Việt Nam: 10 chữ số hoặc 13 chữ số chi nhánh (10-3, dấu gạch tuỳ chọn) — khớp BE. */
  private static readonly TAX_CODE_REGEX = /^\d{10}(-?\d{3})?$/;
  /** CMND 9 số hoặc CCCD 12 số — khớp BE. */
  private static readonly ID_NUMBER_REGEX = /^(\d{9}|\d{12})$/;
  /** SĐT liên hệ — khớp BE (bắt đầu +/số, 8–20 ký tự). */
  private static readonly PHONE_REGEX = /^\+?\d[\d\s.-]{6,18}$/;
  /** Mirror regex mặc định của z.email() (Zod v4) — email qua gate client thì chắc chắn qua BE. */
  private static readonly EMAIL_REGEX =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

  readonly taxCodeValid = computed(() =>
    InvoiceRequestFormComponent.TAX_CODE_REGEX.test(this.taxCode().trim()),
  );
  readonly idNumberValid = computed(() =>
    InvoiceRequestFormComponent.ID_NUMBER_REGEX.test(this.idNumber().trim()),
  );
  readonly phoneValid = computed(() => {
    const phone = this.phone().trim();
    return (
      phone === '' || (phone.length <= 20 && InvoiceRequestFormComponent.PHONE_REGEX.test(phone))
    );
  });

  /** Form hợp lệ (mirror BE — invoiceInfoSchema, kể cả max length cột DB + 2 ô xác nhận). */
  readonly formValid = computed(() => {
    if (!this.confirmAccuracy() || !this.confirmConsent()) return false;
    const email = this.email().trim();
    if (email.length > 255 || !InvoiceRequestFormComponent.EMAIL_REGEX.test(email)) return false;
    const address = this.address().trim();
    if (!address || address.length > 500) return false;
    if (!this.phoneValid()) return false;
    if (this.note().trim().length > 500) return false;
    const buyerName = this.buyerName().trim();
    if (!buyerName || buyerName.length > 255) return false;
    if (this.buyerType() === 'company') {
      const companyName = this.companyName().trim();
      return companyName.length > 0 && companyName.length <= 255 && this.taxCodeValid();
    }
    const taxCode = this.taxCode().trim();
    return this.idNumberValid() && (taxCode === '' || this.taxCodeValid());
  });

  toggleEnabled() {
    this.enabled.set(!this.enabled());
  }

  onEmailInput(value: string) {
    this.emailTouched = true;
    this.email.set(value);
  }

  async submit() {
    if (!this.formValid() || this.submitting()) return;
    this.submitting.set(true);
    this.errorMsg.set(null);
    const buyerType = this.buyerType();
    const taxCode = this.taxCode().trim();
    const phone = this.phone().trim();
    const note = this.note().trim();
    try {
      const request = await this.clientService.invoices.createRequest({
        orderId: this.orderId(),
        invoiceInfo: {
          buyerType,
          buyerName: this.buyerName().trim(),
          companyName: buyerType === 'company' ? this.companyName().trim() : undefined,
          taxCode: taxCode || undefined,
          idNumber: buyerType === 'personal' ? this.idNumber().trim() : undefined,
          address: this.address().trim(),
          email: this.email().trim(),
          phone: phone || undefined,
          note: note || undefined,
        },
      });
      this.submitted.set(request);
    } catch (err) {
      // 404 (orderId không thuộc user) / 400 (giao dịch failed, validate) — hiện nguyên văn
      this.errorMsg.set(
        err instanceof ApiError && err.message
          ? err.message
          : this.transloco.translate('checkout.invoiceRequest.submitError'),
      );
    } finally {
      this.submitting.set(false);
    }
  }
}
