import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserProfile } from '@dearourcommunity/client';
import { AuthService } from './services/auth.service';

export const systemGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (!authService.token) {
    window.location.href = `/auth/login?redirect=${encodeURIComponent(state.url)}`;
    return false;
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
  window.location.href = '/profile/dashboard';
  return false;
};
