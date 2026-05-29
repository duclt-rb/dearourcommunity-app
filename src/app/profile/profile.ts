import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../core/client.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class ProfilePage implements OnInit {
  private api = inject(ClientService);
  private router = inject(Router);

  name = signal('');
  email = signal('');
  loading = signal(true);

  async ngOnInit() {
    try {
      const user = await this.api.auth.me();
      this.name.set(user.displayName);
      this.email.set(user.email);
    } catch {
      this.api.clearToken();
      this.router.navigate(['/auth/login']);
    } finally {
      this.loading.set(false);
    }
  }

  logout() {
    this.api.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
