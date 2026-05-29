import { Injectable } from '@angular/core';
import { Client } from '@dearourcommunity/client';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'doc:access_token';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private client = new Client({ baseUrl: environment.apiBaseUrl });

  constructor() {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      this.client.token = saved;
    }
  }

  get auth() {
    return this.client.auth;
  }

  get org() {
    return this.client.org;
  }

  get packages() {
    return this.client.packages;
  }

  get course() {
    return this.client.course;
  }

  get purchases() {
    return this.client.purchases;
  }

  get health() {
    return this.client.health;
  }

  get token(): string | null {
    return this.client.token;
  }

  setToken(token: string | null) {
    this.client.token = token;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  clearToken() {
    this.setToken(null);
  }
}
