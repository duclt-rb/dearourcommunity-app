import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { RegisterDto, LoginDto } from '@dearourcommunity/client';

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
}
