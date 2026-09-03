import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AuthStore } from '../core/stores/auth.store';
import { ToolkitAccessService } from './toolkit-access.service';
import { findToolkit } from './toolkit.data';
import { frontpageUrl } from '../core/i18n/locale';

/**
 * CR-003 — `/toolkit` không còn trang danh sách trong app: catalog/giới thiệu
 * nằm ở Frontpage → hard-redirect sang đó.
 */
export const toolkitCatalogRedirectGuard: CanActivateFn = () => {
  window.location.href = frontpageUrl('/toolkit');
  return false;
};

/**
 * CR-003 — gate trang chi tiết toolkit theo gói đã mua:
 * - Chưa đăng nhập → hard-redirect /auth/login?redirect=… (pattern authGuard).
 * - id lạ / coming-soon / gói không có flag `toolkit:<id>` → trang khóa
 *   `/toolkit/locked?toolkit=<id>` (thông báo + CTA mua gói).
 *
 * CR-006 — quyền đọc từ selections của user; admin (`isAdmin`) mở hết mọi Quick Scan/Toolkit
 * (xem `ToolkitAccessService.isAdmin`).
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

  // Đảm bảo profile + catalog (CTA trang khoá) + quyền toolkit (CR-006) sẵn sàng trước khi check.
  if (!authStore.user()) {
    await authStore.loadCurrentUser();
  }
  await access.ensureCatalog();

  // loadCurrentUser thất bại sẽ clear token → coi như chưa đăng nhập.
  if (!authStore.user()) {
    window.location.href = `/auth/login?redirect=${encodeURIComponent(state.url)}`;
    return false;
  }

  // CR-006 — quyền theo selections (chọn ở checkout / backfill), không còn theo flag gói
  await access.ensureSelections();

  if (access.canAccess(id)) {
    return true;
  }
  return router.createUrlTree(['/toolkit/locked'], { queryParams: { toolkit: id } });
};
