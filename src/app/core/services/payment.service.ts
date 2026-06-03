import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import type {
  ConfirmBankTransferDto,
  CreateBankTransferDto,
  CreatePaymentDto,
  RejectTransactionDto,
  TransactionsQuery,
  ValidateCouponDto,
} from '@dearourcommunity/client';

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
   * Tạo yêu cầu chuyển khoản ngân hàng cho gói học phí
   * POST /api/v1/payment/bank/create
   * Trả về thông tin tài khoản nhận + nội dung chuyển khoản (= orderId) để hiển thị cho user
   */
  createBankTransfer(dto: CreateBankTransferDto) {
    return this.clientService.payment.createBankTransfer(dto);
  }

  /**
   * Người dùng báo đã chuyển khoản → giao dịch chuyển sang `awaiting_confirmation`,
   * vào hàng đợi chờ admin đối soát/duyệt.
   * POST /api/v1/payment/bank/confirm
   */
  confirmBankTransfer(dto: ConfirmBankTransferDto) {
    return this.clientService.payment.confirmBankTransfer(dto);
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

  /**
   * Lấy danh sách giao dịch hệ thống có phân trang + lọc (chỉ admin mới có quyền)
   * GET /api/v1/payment/transactions
   * Trả về `Paginated<Transaction>` ({ items, meta }).
   */
  getTransactions(query?: TransactionsQuery) {
    return this.clientService.payment.getTransactions(query);
  }

  /**
   * Admin duyệt giao dịch chuyển khoản → kích hoạt gói → `success`
   * POST /api/v1/payment/admin/transactions/:id/approve
   */
  approveTransaction(id: string) {
    return this.clientService.payment.approveTransaction(id);
  }

  /**
   * Admin từ chối giao dịch chuyển khoản → `failed`
   * POST /api/v1/payment/admin/transactions/:id/reject
   */
  rejectTransaction(id: string, dto: RejectTransactionDto) {
    return this.clientService.payment.rejectTransaction(id, dto);
  }
}
