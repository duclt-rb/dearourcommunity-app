import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from './client.service';

export const authGuard: CanActivateFn = () => {
  const api = inject(ClientService);
  const router = inject(Router);

  if (api.token) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
