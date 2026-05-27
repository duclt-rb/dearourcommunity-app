import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {
  LucideHeart,
  LucideMail,
  LucideLock,
  LucideUser,
  LucideEye,
  LucideEyeOff,
} from '@lucide/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    LucideHeart,
    LucideMail,
    LucideLock,
    LucideUser,
    LucideEye,
    LucideEyeOff,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export default class RegisterPage {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  agreeTerms = false;
  showPassword = false;
  loading = false;

  get passwordStrength(): number {
    const p = this.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score += 25;
    if (/[A-Z]/.test(p)) score += 25;
    if (/[0-9]/.test(p)) score += 25;
    if (/[^A-Za-z0-9]/.test(p)) score += 25;
    return score;
  }

  get strengthClass(): string {
    const s = this.passwordStrength;
    if (s <= 25) return 'weak';
    if (s <= 50) return 'fair';
    if (s <= 75) return 'good';
    return 'strong';
  }

  get strengthText(): string {
    const s = this.passwordStrength;
    if (s <= 25) return 'Weak';
    if (s <= 50) return 'Fair';
    if (s <= 75) return 'Good';
    return 'Strong';
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Register:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });
    }, 1500);
  }
}
