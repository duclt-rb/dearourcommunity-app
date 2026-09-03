import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucideEye, LucideEyeOff, LucideLock, LucideMail } from '@lucide/angular';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthStore } from '../../core/stores/auth.store';
import AuthLayoutComponent from '../auth-layout/auth-layout';
import LogoComponent from '../../shared/logo/logo';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    LogoComponent,
    FormField,
    RouterLink,
    LucideMail,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    InputText,
    Button,
    TranslocoPipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  encapsulation: ViewEncapsulation.None,
})
export default class LoginPage {
  private route = inject(ActivatedRoute);
  private readonly transloco = inject(TranslocoService);
  store = inject(AuthStore);

  loginModel = signal({ email: '', password: '' });

  loginForm = form(this.loginModel, (p) => {
    required(p.email, { message: this.transloco.translate('auth.login.emailRequired') });
    email(p.email, { message: this.transloco.translate('validation.email') });
    required(p.password, { message: this.transloco.translate('auth.login.passwordRequired') });
  });

  // PrimeNG PassThrough — design token values applied directly to DOM
  inputPt = {
    root: {
      style: `
        width: 100%;
        height: 50px;
        padding: 0 14px 0 44px;
        border: 1.5px solid var(--color-border-input);
        border-radius: 14px;
        background: var(--color-bg-input);
        font-family: var(--font-sans);
        font-size: 0.9375rem;
        color: var(--color-text);
        letter-spacing: var(--tracking-base);
        transition: all 0.2s;
        outline: none;
        box-shadow: none;
      `,
    },
  };

  submitPt = {
    root: {
      style: `
        width: 100%;
        height: 50px;
        border: none;
        border-radius: 14px;
        background: var(--color-primary);
        color: var(--color-bg);
        font-family: var(--font-sans);
        font-size: 0.9375rem;
        font-weight: 600;
        letter-spacing: var(--tracking-base);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      `,
    },
  };

  showPassword = signal(false);
  loading = this.store.isLoading;
  error = this.store.error;

  async onSubmit(e: Event) {
    e.preventDefault();

    this.loginForm().markAsTouched();

    if (this.loginForm().invalid()) return;

    try {
      const { email, password } = this.loginModel();
      const result = await this.store.login({ email, password });

      if (result.success) {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');

        if (redirect) {
          window.location.href = redirect;
        } else if (this.store.user()?.isAdmin) {
          // Admin đăng nhập → vào thẳng trang quản trị
          window.location.href = '/system';
        } else {
          window.location.href = '/profile';
        }
      }
    } catch {
      // Handled by AuthStore
    }
  }

  loginWithGoogle() {
    // TODO: Implement OAuth
  }

  loginWithFacebook() {
    // TODO: Implement OAuth
  }
}
