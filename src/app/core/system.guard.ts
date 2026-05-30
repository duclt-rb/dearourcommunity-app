import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserProfile } from '@dearourcommunity/client';
import { AuthService } from './services/auth.service';

export const systemGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.token) {
    return router.createUrlTree(['/auth/login']);
  }

  try {
    const user = (await authService.me()) as UserProfile & { isAdmin: boolean };

    if (user && user.isAdmin === true) {
      return true;
    }
  } catch (err) {
    console.error('Failed to load profile inside systemGuard', err);
  }

  // Redirect back to profile dashboard if not admin
  return router.createUrlTree(['/profile/dashboard']);
};
