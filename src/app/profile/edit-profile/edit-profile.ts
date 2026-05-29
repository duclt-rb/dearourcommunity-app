import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export default class EditProfileComponent implements OnInit {
  store = inject(ProfileStore);

  // Temporary local form states
  tempFirstName = signal('');
  tempLastName = signal('');
  tempPhone = signal('');
  tempAvatarUrl = signal<string | null>(null);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.tempFirstName.set(this.store.firstName());
    this.tempLastName.set(this.store.lastName());
    this.tempPhone.set(this.store.phone());
    this.tempAvatarUrl.set(this.store.avatarUrl());
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  changePhoto() {
    const urls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    ];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    this.tempAvatarUrl.set(randomUrl);
  }

  removePhoto() {
    this.tempAvatarUrl.set(null);
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      this.store.updateProfile(
        this.tempFirstName(),
        this.tempLastName(),
        this.tempPhone(),
        this.tempAvatarUrl(),
      );
      this.successMessage.set('Đã cập nhật thông tin hồ sơ thành công!');
    } catch {
      this.errorMessage.set('Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại!');
    } finally {
      this.loading.set(false);
    }
  }
}
