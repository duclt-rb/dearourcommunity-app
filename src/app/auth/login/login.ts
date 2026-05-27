import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';
import { LucideEye, LucideEyeOff, LucideLock, LucideMail } from '@lucide/angular';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import AuthLayoutComponent from '../auth-layout/auth-layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    FormField,
    RouterLink,
    LucideMail,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    InputText,
    Button,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class LoginPage {
  private router = inject(Router);

  loginModel = signal({ email: '', password: '' });

  loginForm = form(this.loginModel, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Please enter a valid email' });
    required(p.password, { message: 'Password is required' });
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
  loading = signal(false);
  error = signal<string | null>(null);

  async onSubmit(e: Event) {
    e.preventDefault();

    this.loginForm().markAsTouched();

    if (this.loginForm().invalid()) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      // TODO: Wire up to @dearourcommunity/client AuthClient
      await new Promise((r) => setTimeout(r, 1200)); // simulate
      this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('Invalid email or password');
    } finally {
      this.loading.set(false);
    }
  }

  loginWithGoogle() {
    // TODO: Implement OAuth
  }

  loginWithFacebook() {
    // TODO: Implement OAuth
  }
}
