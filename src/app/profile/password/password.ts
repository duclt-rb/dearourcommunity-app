import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  minLength,
  patternError,
  required,
  validate,
} from '@angular/forms/signals';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [FormField, TranslocoPipe],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export default class PasswordComponent {
  store = inject(ProfileStore);
  private readonly transloco = inject(TranslocoService);

  passwordModel = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (p) => {
    required(p.currentPassword, {
      message: this.transloco.translate('profile.password.currentRequired'),
    });
    required(p.newPassword, { message: this.transloco.translate('profile.password.newRequired') });
    minLength(p.newPassword, 8, {
      message: this.transloco.translate('profile.password.newMinLength'),
    });
    validate(p.newPassword, (ctx) => {
      return ctx.value() && ctx.value() === this.passwordModel().currentPassword
        ? patternError(/^$/, {
            message: this.transloco.translate('profile.password.newMustDiffer'),
          })
        : undefined;
    });
    required(p.confirmPassword, {
      message: this.transloco.translate('profile.password.confirmRequired'),
    });
    validate(p.confirmPassword, (ctx) => {
      return ctx.value() === this.passwordModel().newPassword
        ? undefined
        : patternError(/^$/, {
            message: this.transloco.translate('validation.passwordMismatch'),
          });
    });
  });

  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  async onSubmit(e: Event) {
    e.preventDefault();
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.passwordForm().markAsTouched();
    if (this.passwordForm().invalid()) return;

    this.loading.set(true);

    try {
      const { currentPassword, newPassword, confirmPassword } = this.passwordModel();
      await this.store.changePassword(currentPassword, newPassword, confirmPassword);
      this.successMessage.set(this.transloco.translate('profile.password.updateSuccess'));
      this.passwordModel.set({ currentPassword: '', newPassword: '', confirmPassword: '' });
      this.passwordForm().reset();
    } catch {
      this.errorMessage.set(this.transloco.translate('profile.password.updateError'));
    } finally {
      this.loading.set(false);
    }
  }
}
