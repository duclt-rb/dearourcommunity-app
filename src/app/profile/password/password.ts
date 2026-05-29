import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-password',
  standalone: true,
  imports: [],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export default class PasswordComponent {
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.successMessage.set(null);
    this.errorMessage.set(null);

    const current = this.currentPassword().trim();
    const next = this.newPassword().trim();
    const confirm = this.confirmPassword().trim();

    if (!current || !next || !confirm) {
      this.errorMessage.set('Vui lòng điền đầy đủ các trường.');
      return;
    }

    if (next.length < 8) {
      this.errorMessage.set('Mật khẩu mới phải tối thiểu 8 ký tự.');
      return;
    }

    if (next !== confirm) {
      this.errorMessage.set('Mật khẩu nhập lại không khớp.');
      return;
    }

    this.loading.set(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      this.successMessage.set('Đã cập nhật mật khẩu mới thành công!');
      this.currentPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
    } catch {
      this.errorMessage.set('Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại!');
    } finally {
      this.loading.set(false);
    }
  }
}
