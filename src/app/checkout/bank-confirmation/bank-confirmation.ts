import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideArrowRight, LucideCircleCheck } from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';
import InvoiceRequestFormComponent from '../invoice-request-form/invoice-request-form';

/**
 * UX 15/07 — màn xác nhận SAU khi user bấm "Tôi đã chuyển khoản", tách khỏi billing:
 * thông báo DOC đã nhận thông tin (đối soát 72h) + hướng dẫn gửi chứng từ thanh toán
 * + form yêu cầu xuất hoá đơn VAT (CR-007). Điều hướng bằng `?orderId=` nên reload
 * vẫn vào lại được (guard chỉ cần orderId; parent route `checkout` đã có authGuard).
 */
@Component({
  selector: 'app-bank-confirmation',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoPipe,
    LucideArrowRight,
    LucideCircleCheck,
    LogoComponent,
    InvoiceRequestFormComponent,
  ],
  templateUrl: './bank-confirmation.html',
  styleUrl: './bank-confirmation.css',
})
export default class BankConfirmationComponent {
  /** orderId của giao dịch vừa xác nhận — guard đảm bảo luôn có. */
  readonly orderId = inject(ActivatedRoute).snapshot.queryParamMap.get('orderId') ?? '';
}
