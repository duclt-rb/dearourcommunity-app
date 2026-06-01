import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.token) {
    return true;
  }

  // Chuyển hướng cứng dùng window.location.href và truyền full URL qua query param redirect
  const fullUrl = state.url;
  window.location.href = `/auth/login?redirect=${encodeURIComponent(fullUrl)}`;
  return false;
};
