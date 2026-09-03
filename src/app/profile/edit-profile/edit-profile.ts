import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, patternError, required, validate } from '@angular/forms/signals';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ProfileStore } from '../profile.store';
import { isValidPhone, normalizePhone } from '../../core/phone';
import { apiErrorMessage } from '../../core/api-error';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormField, TranslocoPipe],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export default class EditProfileComponent implements OnInit {
  store = inject(ProfileStore);
  private readonly transloco = inject(TranslocoService);

  profileModel = signal({
    lastName: '',
    firstName: '',
    phone: '',
  });

  profileForm = form(this.profileModel, (p) => {
    required(p.lastName, {
      message: this.transloco.translate('profile.editProfile.lastNameRequired'),
    });
    required(p.firstName, {
      message: this.transloco.translate('profile.editProfile.firstNameRequired'),
    });
    required(p.phone, { message: this.transloco.translate('profile.editProfile.phoneRequired') });
    // Format kiểm trên bản đã normalize (bỏ khoảng trắng/gạch) — đồng bộ rule với BE
    validate(p.phone, (ctx) =>
      ctx.value() === '' || isValidPhone(ctx.value())
        ? undefined
        : patternError(/^$/, {
            message: this.transloco.translate('profile.editProfile.phoneInvalid'),
          }),
    );
  });

  // Avatar được điều khiển bằng nút bấm nên giữ riêng ngoài form.
  tempAvatarUrl = signal<string | null>(null);

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.profileModel.set({
      lastName: this.store.lastName(),
      firstName: this.store.firstName(),
      phone: this.store.phone(),
    });
    this.tempAvatarUrl.set(this.store.avatarUrl());
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
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.profileForm().markAsTouched();
    if (this.profileForm().invalid()) return;

    this.loading.set(true);

    try {
      const { firstName, lastName, phone } = this.profileModel();
      await this.store.updateProfile(
        firstName,
        lastName,
        normalizePhone(phone),
        this.tempAvatarUrl(),
      );
      this.successMessage.set(this.transloco.translate('profile.editProfile.saveSuccess'));
    } catch (err) {
      this.errorMessage.set(
        apiErrorMessage(err, this.transloco.translate('profile.editProfile.saveError')),
      );
    } finally {
      this.loading.set(false);
    }
  }
}
