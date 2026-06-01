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
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  encapsulation: ViewEncapsulation.None,
})
export default class RegisterPage {
  private route = inject(ActivatedRoute);
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
    required(p.firstName, { message: 'Họ là bắt buộc' });
    required(p.lastName, { message: 'Tên là bắt buộc' });
    required(p.email, { message: 'Email là bắt buộc' });
    email(p.email, { message: 'Email không hợp lệ' });
    required(p.phone, { message: 'Số điện thoại là bắt buộc' });
    required(p.password, { message: 'Mật khẩu là bắt buộc' });
    minLength(p.password, 8, { message: 'Mật khẩu tối thiểu 8 ký tự' });
    required(p.repeatPassword, { message: 'Nhập lại mật khẩu là bắt buộc' });
    validate(p.repeatPassword, (ctx) => {
      return ctx.value() === this.registerModel().password
        ? undefined
        : patternError(/^$/, { message: 'Mật khẩu không khớp' });
    });
    required(p.agreeToTerms, { message: 'Bạn phải đồng ý với điều khoản' });
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
      const dto = this.registerModel();
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
