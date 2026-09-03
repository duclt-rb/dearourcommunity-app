import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  patternError,
  required,
  validate,
} from '@angular/forms/signals';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  LucideEye,
  LucideEyeOff,
  LucideLock,
  LucideMail,
  LucidePhone,
  LucideUser,
} from '@lucide/angular';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AuthStore } from '../../core/stores/auth.store';
import AuthLayoutComponent from '../auth-layout/auth-layout';
import LogoComponent from '../../shared/logo/logo';
import { frontpageUrl } from '../../core/i18n/locale';
import { isValidPhone, normalizePhone } from '../../core/phone';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    LogoComponent,
    FormField,
    RouterLink,
    LucideUser,
    LucideMail,
    LucidePhone,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    InputText,
    Button,
    TranslocoPipe,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  encapsulation: ViewEncapsulation.None,
})
export default class RegisterPage {
  // Link chính sách trên Frontpage — theo locale đang hiển thị (bỏ hardcode domain + /vi/)
  readonly termsUrl = frontpageUrl('/policies/quyen-va-nghia-vu-cua-cac-ben');
  readonly privacyUrl = frontpageUrl('/policies/chinh-sach-bao-mat');

  private route = inject(ActivatedRoute);
  private readonly transloco = inject(TranslocoService);
  store = inject(AuthStore);

  registerModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: false,
  });

  registerForm = form(this.registerModel, (p) => {
    required(p.firstName, {
      message: this.transloco.translate('auth.register.familyNameRequired'),
    });
    required(p.lastName, { message: this.transloco.translate('auth.register.givenNameRequired') });
    required(p.email, { message: this.transloco.translate('auth.register.emailRequired') });
    email(p.email, { message: this.transloco.translate('validation.email') });
    required(p.phone, { message: this.transloco.translate('auth.register.phoneRequired') });
    // Format kiểm trên bản đã normalize (bỏ khoảng trắng/gạch) — đồng bộ rule với BE
    validate(p.phone, (ctx) =>
      ctx.value() === '' || isValidPhone(ctx.value())
        ? undefined
        : patternError(/^$/, {
            message: this.transloco.translate('auth.register.phoneInvalid'),
          }),
    );
    required(p.password, { message: this.transloco.translate('auth.register.passwordRequired') });
    minLength(p.password, 8, {
      message: this.transloco.translate('auth.register.passwordMinLength'),
    });
    required(p.repeatPassword, {
      message: this.transloco.translate('auth.register.repeatPasswordRequired'),
    });
    validate(p.repeatPassword, (ctx) => {
      return ctx.value() === this.registerModel().password
        ? undefined
        : patternError(/^$/, {
            message: this.transloco.translate('auth.register.passwordMismatch'),
          });
    });
    required(p.agreeToTerms, { message: this.transloco.translate('auth.register.agreeRequired') });
  });

  // PrimeNG PassThrough
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

    this.registerForm().markAsTouched();

    if (this.registerForm().invalid()) return;

    try {
      // Gửi số đã normalize — user gõ "0912 345 678" hay "+61 431..." đều hợp lệ
      const dto = { ...this.registerModel(), phone: normalizePhone(this.registerModel().phone) };
      const result = await this.store.register(dto);
      if (result.success) {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');

        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.href = '/profile';
        }
      }
    } catch {
      // Handled by AuthStore
    }
  }
}
