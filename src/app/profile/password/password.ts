import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  minLength,
  patternError,
  required,
  validate,
} from '@angular/forms/signals';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [FormField],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export default class PasswordComponent {
  store = inject(ProfileStore);

  passwordModel = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (p) => {
    required(p.currentPassword, { message: 'Mật khẩu hiện tại là bắt buộc' });
    required(p.newPassword, { message: 'Mật khẩu mới là bắt buộc' });
    minLength(p.newPassword, 8, { message: 'Mật khẩu mới phải tối thiểu 8 ký tự' });
    validate(p.newPassword, (ctx) => {
      return ctx.value() && ctx.value() === this.passwordModel().currentPassword
        ? patternError(/^$/, { message: 'Mật khẩu mới phải khác mật khẩu hiện tại' })
        : undefined;
    });
    required(p.confirmPassword, { message: 'Nhập lại mật khẩu là bắt buộc' });
    validate(p.confirmPassword, (ctx) => {
      return ctx.value() === this.passwordModel().newPassword
        ? undefined
        : patternError(/^$/, { message: 'Mật khẩu nhập lại không khớp' });
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
      this.successMessage.set('Đã cập nhật mật khẩu mới thành công!');
      this.passwordModel.set({ currentPassword: '', newPassword: '', confirmPassword: '' });
      this.passwordForm().reset();
    } catch {
      this.errorMessage.set(
        'Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại!',
      );
    } finally {
      this.loading.set(false);
    }
  }
}
