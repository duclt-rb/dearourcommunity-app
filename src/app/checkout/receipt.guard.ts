import { CanActivateFn } from '@angular/router';

export const receiptGuard: CanActivateFn = (route) => {
  const queryParams = route.queryParams;

  const resultCode = queryParams['resultCode'];
  const orderId = queryParams['orderId'];
  const transId = queryParams['transId'];
  const amount = queryParams['amount'];

  // Bắt buộc phải có đầy đủ các tham số kết quả thanh toán từ Momo mới cho vào trang receipt
  if (resultCode !== undefined && orderId && transId && amount) {
    return true;
  }

  // Nếu không đủ tham số, chuyển hướng về trang chọn gói đăng ký
  window.location.href = '/profile/plans';
  return false;
};
