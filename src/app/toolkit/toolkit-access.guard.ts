import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/services/auth.service';
import { AuthStore } from '../core/stores/auth.store';
import { ToolkitAccessService } from './toolkit-access.service';
import { findToolkit } from './toolkit.data';

/**
 * CR-003 — `/toolkit` không còn trang danh sách trong app: catalog/giới thiệu
 * nằm ở Frontpage → hard-redirect sang đó.
 */
export const toolkitCatalogRedirectGuard: CanActivateFn = () => {
  window.location.href = `${environment.appUrl}/vi/toolkit`;
  return false;
};

/**
 * CR-003 — gate trang chi tiết toolkit theo gói đã mua:
 * - Chưa đăng nhập → hard-redirect /auth/login?redirect=… (pattern authGuard).
 * - id lạ / coming-soon / gói không có flag `toolkit:<id>` → trang khóa
 *   `/toolkit/locked?toolkit=<id>` (thông báo + CTA mua gói).
 */
export const toolkitAccessGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const authStore = inject(AuthStore);
  const access = inject(ToolkitAccessService);
  const router = inject(Router);

  const id = route.paramMap.get('id') ?? '';
  const toolkit = findToolkit(id);
  if (!toolkit || toolkit.comingSoon) {
    return router.createUrlTree(['/toolkit/locked'], { queryParams: { toolkit: id } });
  }

  if (!authService.token) {
    window.location.href = `/auth/login?redirect=${encodeURIComponent(state.url)}`;
    return false;
  }

  // Đảm bảo profile (gói sở hữu) + catalog gói (flags) đã sẵn sàng trước khi check.
  if (!authStore.user()) {
    await authStore.loadCurrentUser();
  }
  await access.ensureCatalog();

  // loadCurrentUser thất bại sẽ clear token → coi như chưa đăng nhập.
  if (!authStore.user()) {
    window.location.href = `/auth/login?redirect=${encodeURIComponent(state.url)}`;
    return false;
  }

  if (access.canAccess(id)) {
    return true;
  }
  return router.createUrlTree(['/toolkit/locked'], { queryParams: { toolkit: id } });
};
