import { inject, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { ClientService } from './client.service';
import { ApiError, RegisterDto } from '@dearourcommunity/client';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  packageId?: string | null;
  package?: {
    name: string;
  } | null;
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
  withMethods((store, api = inject(ClientService)) => ({
    async loadCurrentUser() {
      if (!api.token) return;
      patchState(store, { isLoading: true, error: null });
      try {
        const user = await api.auth.me();
        patchState(store, {
          user: user as AuthUser,
          token: api.token,
          isLoading: false,
        });
      } catch (err) {
        console.error('Failed to load current user', err);
        api.clearToken();
        patchState(store, {
          user: null,
          token: null,
          error: err instanceof ApiError ? err.message : 'Failed to retrieve profile',
          isLoading: false,
        });
      }
    },

    async login(credentials: { email: string; password: string }) {
      patchState(store, { isLoading: true, error: null });
      try {
        const { accessToken } = await api.auth.login(credentials);
        api.setToken(accessToken);

        const user = await api.auth.me();

        patchState(store, {
          user: user as AuthUser,
          token: accessToken,
          isLoading: false,
        });
        return { success: true };
      } catch (err) {
        const errMsg = err instanceof ApiError ? err.message : 'Invalid email or password';
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
        const { accessToken } = await api.auth.register(dto);
        api.setToken(accessToken);

        const user = await api.auth.me();

        patchState(store, {
          user: user as AuthUser,
          token: accessToken,
          isLoading: false,
        });
        return { success: true };
      } catch (err) {
        const errMsg = err instanceof ApiError ? err.message : 'Registration failed';
        patchState(store, {
          error: errMsg,
          isLoading: false,
        });
        return { success: false, error: errMsg };
      }
    },

    logout() {
      api.clearToken();
      patchState(store, initialState);
    },

    clearError() {
      patchState(store, { error: null });
    },
  })),
);
