import { computed, inject } from '@angular/core';
import { ApiError, PackageType, RegisterDto, UserPackageInfo } from '@dearourcommunity/client';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TranslocoService } from '@jsverse/transloco';
import { AuthService } from '../services/auth.service';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  isAdmin?: boolean;
  packageId?: string | null;
  package?: {
    id: string;
    name: string;
    type: PackageType;
  } | null;
  /** Gói đang sở hữu (personal + kế thừa từ org) — auth.me() trả về (CR-003: gate toolkit). */
  packages?: UserPackageInfo[];
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ token }) => ({
    isAuthenticated: computed(() => !!token()),
  })),
  withMethods((store, authService = inject(AuthService), transloco = inject(TranslocoService)) => ({
    async loadCurrentUser() {
      if (!authService.token) return;
      patchState(store, { isLoading: true, error: null });
      try {
        const user = await authService.me();
        patchState(store, {
          user: user as AuthUser,
          token: authService.token,
          isLoading: false,
        });
      } catch (err) {
        console.error('Failed to load current user', err);
        authService.clearToken();
        patchState(store, {
          user: null,
          token: null,
          error:
            err instanceof ApiError ? err.message : transloco.translate('auth.errors.loadAccount'),
          isLoading: false,
        });
      }
    },

    async login(credentials: { email: string; password: string }) {
      patchState(store, { isLoading: true, error: null });
      try {
        const { accessToken } = await authService.login(credentials);
        authService.setToken(accessToken);

        const user = await authService.me();

        patchState(store, {
          user: user as AuthUser,
          token: accessToken,
          isLoading: false,
        });
        return { success: true };
      } catch (err) {
        const errMsg =
          err instanceof ApiError
            ? err.message
            : transloco.translate('auth.errors.invalidCredentials');
        patchState(store, {
          error: errMsg,
          isLoading: false,
        });
        return { success: false, error: errMsg };
      }
    },

    async register(dto: RegisterDto) {
      patchState(store, { isLoading: true, error: null });
      try {
        const { accessToken } = await authService.register(dto);
        authService.setToken(accessToken);

        const user = await authService.me();

        patchState(store, {
          user: user as AuthUser,
          token: accessToken,
          isLoading: false,
        });
        return { success: true };
      } catch (err) {
        const errMsg =
          err instanceof ApiError ? err.message : transloco.translate('auth.errors.registerFailed');
        patchState(store, {
          error: errMsg,
          isLoading: false,
        });
        return { success: false, error: errMsg };
      }
    },

    logout() {
      authService.clearToken();
      patchState(store, initialState);
    },

    clearError() {
      patchState(store, { error: null });
    },
  })),
);
