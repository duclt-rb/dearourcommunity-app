import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';

/**
 * Chặn các route công cụ quản trị (gói học, mentor) trên production.
 * Trên non-production (local/dev) cho qua; trên production điều hướng về Lịch sử giao dịch.
 */
export const nonProdGuard: CanActivateFn = () => {
  if (!environment.production) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/system/transactions');
};
