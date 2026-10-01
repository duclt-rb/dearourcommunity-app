import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import {
  RegisterDto,
  LoginDto,
  UpdateProfileDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@dearourcommunity/client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private clientService = inject(ClientService);

  get token(): string | null {
    return this.clientService.token;
  }

  setToken(token: string | null) {
    this.clientService.setToken(token);
  }

  clearToken() {
    this.clientService.clearToken();
  }

  me() {
    return this.clientService.auth.me();
  }

  login(credentials: LoginDto) {
    return this.clientService.auth.login(credentials);
  }

  register(dto: RegisterDto) {
    return this.clientService.auth.register(dto);
  }

  updateProfile(dto: UpdateProfileDto) {
    return this.clientService.auth.updateProfile(dto);
  }

  /** CR-019 — gửi email link đặt lại mật khẩu (luôn thành công, không lộ email có tài khoản). */
  forgotPassword(dto: ForgotPasswordDto) {
    return this.clientService.auth.forgotPassword(dto);
  }

  verifyResetToken(token: string) {
    return this.clientService.auth.verifyResetToken(token);
  }

  resetPassword(dto: ResetPasswordDto) {
    return this.clientService.auth.resetPassword(dto);
  }
}
