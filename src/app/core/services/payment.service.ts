import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { CreatePaymentDto, ValidateCouponDto } from '@dearourcommunity/client';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private clientService = inject(ClientService);

  /**
   * Tạo link thanh toán MoMo cho gói học phí
   * POST /api/v1/payment/momo/create
   * Trả về payUrl để chuyển hướng người dùng
   */
  createPayment(dto: CreatePaymentDto) {
    return this.clientService.payment.createPayment(dto);
  }

  /**
   * Kiểm tra trạng thái kích hoạt tài khoản/enrollment của đơn hàng
   * GET /api/v1/payment/momo/enrollment-status?orderId=
   * Dùng để poll trạng thái sau khi người dùng thanh toán thành công
   */
  checkEnrollmentStatus(orderId: string) {
    return this.clientService.payment.checkEnrollmentStatus(orderId);
  }

  /**
   * Kiểm tra mã giảm giá
   * POST /api/v1/payment/coupons/validate
   */
  validateCoupon(dto: ValidateCouponDto) {
    return this.clientService.payment.validateCoupon(dto);
  }
}
