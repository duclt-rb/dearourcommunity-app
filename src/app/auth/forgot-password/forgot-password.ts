import { Component, inject, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ApiError } from '@dearourcommunity/client';
import { LucideArrowLeft, LucideMail, LucideMailCheck } from '@lucide/angular';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth.service';
import { getActiveLocale } from '../../core/i18n/locale';
import AuthLayoutComponent from '../auth-layout/auth-layout';
import LogoComponent from '../../shared/logo/logo';
import { AUTH_INPUT_PT, AUTH_SUBMIT_PT } from '../auth-form.pt';

/** Chờ giữa 2 lần gửi lại — khớp BE: mỗi email nhận tối đa 1 thư / 60 giây. */
const RESEND_COOLDOWN_SECONDS = 60;

/** CR-019 — Quên mật khẩu: nhập email → BE gửi link đặt lại (hiệu lực 60 phút). */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    LogoComponent,
    FormField,
    RouterLink,
    LucideMail,
    LucideMailCheck,
    LucideArrowLeft,
    InputText,
    Button,
    TranslocoPipe,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  encapsulation: ViewEncapsulation.None,
})
export default class ForgotPasswordPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly transloco = inject(TranslocoService);
  private readonly authService = inject(AuthService);

  readonly inputPt = AUTH_INPUT_PT;
  readonly submitPt = AUTH_SUBMIT_PT;

  // Trang đăng nhập truyền sẵn email user đã gõ (?email=)
  model = signal({ email: this.route.snapshot.queryParamMap.get('email') ?? '' });

  forgotForm = form(this.model, (p) => {
    required(p.email, { message: this.transloco.translate('auth.login.emailRequired') });
    email(p.email, { message: this.transloco.translate('validation.email') });
  });

  loading = signal(false);
  error = signal<string | null>(null);
  /** Email đã gửi link — có giá trị là chuyển sang màn "Kiểm tra hộp thư". */
  sentTo = signal<string | null>(null);
  cooldown = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  async onSubmit(e: Event) {
    e.preventDefault();
    this.forgotForm().markAsTouched();
    if (this.forgotForm().invalid()) return;
    await this.send(this.model().email.trim());
  }

  async resend() {
    const to = this.sentTo();
    if (to && this.cooldown() === 0) await this.send(to);
  }

  /** Nhập lại email khác. */
  changeEmail() {
    this.sentTo.set(null);
    this.error.set(null);
  }

  private async send(to: string) {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.authService.forgotPassword({ email: to, lang: getActiveLocale() });
      this.sentTo.set(to);
      this.startCooldown();
    } catch (err) {
      this.error.set(
        this.transloco.translate(
          err instanceof ApiError && err.code === 429
            ? 'auth.forgotPassword.tooManyRequests'
            : 'auth.forgotPassword.sendFailed',
        ),
      );
    } finally {
      this.loading.set(false);
    }
  }

  private startCooldown() {
    this.stopCooldown();
    this.cooldown.set(RESEND_COOLDOWN_SECONDS);
    this.timer = setInterval(() => {
      this.cooldown.update((s) => s - 1);
      if (this.cooldown() <= 0) this.stopCooldown();
    }, 1000);
  }

  private stopCooldown() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  ngOnDestroy() {
    this.stopCooldown();
  }
}
