import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * UX 15/07 — trang xác nhận chuyển khoản chỉ có nghĩa khi gắn với một đơn hàng:
 * bắt buộc `?orderId=` (billing điều hướng sang sau khi confirm thành công).
 * Thiếu → về dashboard. Đăng nhập đã có authGuard ở parent route `checkout`.
 */
export const bankConfirmationGuard: CanActivateFn = (route) => {
  if (route.queryParams['orderId']) return true;
  return inject(Router).createUrlTree(['/profile/dashboard']);
};
