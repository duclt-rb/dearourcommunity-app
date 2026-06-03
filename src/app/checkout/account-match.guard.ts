import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

/**
 * Đảm bảo đúng tài khoản đang thanh toán: nếu URL checkout có `?email=`, email đó
 * phải khớp với tài khoản đang đăng nhập. Lệch nhau → đá sang trang cảnh báo
 * `/checkout/wrong-account` (kèm email mong muốn + email hiện tại + URL gốc để quay lại).
 *
 * Không truyền `email` → không ràng buộc, cho qua bình thường (tương thích ngược).
 * Chạy SAU `authGuard` (đã chắc chắn có token) và `checkoutGuard` (đã có gói).
 */
export const accountMatchGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const rawExpected = (route.queryParams['email'] ?? '').trim();
  const expectedEmail = rawExpected.toLowerCase();
  // Không có email kỳ vọng → bỏ qua kiểm tra.
  if (!expectedEmail) return true;

  try {
    const user = await authService.me();
    const currentEmail = (user.email ?? '').trim().toLowerCase();
    if (currentEmail === expectedEmail) return true;

    // Sai tài khoản → trang cảnh báo. Hard redirect cho đồng bộ với các guard khác.
    const params = new URLSearchParams({
      expected: rawExpected,
      current: user.email ?? '',
      redirect: state.url,
    });
    window.location.href = `/checkout/wrong-account?${params.toString()}`;
    return false;
  } catch (err) {
    // me() lỗi (token hỏng…) → để luồng đăng nhập/authGuard xử lý, không chặn ở đây.
    console.error('Failed to verify account in accountMatchGuard', err);
    return true;
  }
};
