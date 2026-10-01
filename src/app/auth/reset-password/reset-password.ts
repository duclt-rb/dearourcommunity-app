import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import {
  form,
  FormField,
  maxLength,
  minLength,
  patternError,
  required,
  validate,
} from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ApiError, type ResetTokenErrorReason } from '@dearourcommunity/client';
import {
  LucideArrowLeft,
  LucideCircleCheckBig,
  LucideEye,
  LucideEyeOff,
  LucideLock,
  LucideShieldAlert,
} from '@lucide/angular';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth.service';
import AuthLayoutComponent from '../auth-layout/auth-layout';
import LogoComponent from '../../shared/logo/logo';
import { AUTH_INPUT_PT, AUTH_SUBMIT_PT } from '../auth-form.pt';

// Đồng bộ BE `reset-password.dto.ts`
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 72;

/** checking → form → done; link hỏng thì expired | invalid; không gọi được BE thì error. */
type ViewState = 'checking' | 'form' | 'done' | 'expired' | 'invalid' | 'error';

/** CR-019 — Đặt mật khẩu mới từ link trong email (`/auth/reset-password?token=…`). */
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    LogoComponent,
    FormField,
    RouterLink,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    LucideShieldAlert,
    LucideCircleCheckBig,
    LucideArrowLeft,
    InputText,
    Button,
    TranslocoPipe,
  ],
  templateUrl: './reset-password.html',
  styleUrl: '../forgot-password/forgot-password.css',
  encapsulation: ViewEncapsulation.None,
})
export default class ResetPasswordPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly transloco = inject(TranslocoService);
  private readonly authService = inject(AuthService);

  readonly inputPt = AUTH_INPUT_PT;
  readonly submitPt = AUTH_SUBMIT_PT;

  private readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  state = signal<ViewState>('checking');
  /** Email tài khoản đã che bớt (BE trả khi link hợp lệ). */
  accountEmail = signal('');
  loading = signal(false);
  error = signal<string | null>(null);

  showPassword = signal(false);
  showConfirm = signal(false);

  model = signal({ password: '', confirmPassword: '' });

  resetForm = form(this.model, (p) => {
    required(p.password, {
      message: this.transloco.translate('auth.resetPassword.passwordRequired'),
    });
    minLength(p.password, PASSWORD_MIN_LENGTH, {
      message: this.transloco.translate('validation.minLength', { n: PASSWORD_MIN_LENGTH }),
    });
    maxLength(p.password, PASSWORD_MAX_LENGTH, {
      message: this.transloco.translate('validation.maxLength', { n: PASSWORD_MAX_LENGTH }),
    });
    required(p.confirmPassword, {
      message: this.transloco.translate('auth.resetPassword.confirmRequired'),
    });
    validate(p.confirmPassword, (ctx) =>
      ctx.value() === this.model().password
        ? undefined
        : patternError(/^$/, { message: this.transloco.translate('validation.passwordMismatch') }),
    );
  });

  async ngOnInit() {
    if (!this.token) {
      this.state.set('invalid');
      return;
    }
    await this.check();
  }

  /** Kiểm tra link trước khi hiện form — tránh user gõ mật khẩu rồi mới biết link đã hết hạn. */
  async check() {
    this.state.set('checking');
    try {
      const info = await this.authService.verifyResetToken(this.token);
      this.accountEmail.set(info.email);
      this.state.set('form');
    } catch (err) {
      this.state.set(this.linkState(err) ?? 'error');
    }
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.resetForm().markAsTouched();
    if (this.resetForm().invalid()) return;

    this.loading.set(true);
    this.error.set(null);
    try {
      const { password, confirmPassword } = this.model();
      await this.authService.resetPassword({ token: this.token, password, confirmPassword });
      this.state.set('done');
    } catch (err) {
      const linkState = this.linkState(err);
      if (linkState) {
        this.state.set(linkState);
      } else {
        this.error.set(
          this.transloco.translate(
            err instanceof ApiError && err.code === 429
              ? 'auth.forgotPassword.tooManyRequests'
              : 'auth.resetPassword.failed',
          ),
        );
      }
    } finally {
      this.loading.set(false);
    }
  }

  /** 400 kèm `details.reason` → link hết hạn / không hợp lệ; lỗi khác → null. */
  private linkState(err: unknown): 'expired' | 'invalid' | null {
    if (!(err instanceof ApiError) || err.code !== 400) return null;
    const reason = (err.details as { reason?: ResetTokenErrorReason } | null)?.reason;
    if (reason === 'RESET_TOKEN_EXPIRED') return 'expired';
    if (reason === 'RESET_TOKEN_INVALID') return 'invalid';
    return null;
  }
}
