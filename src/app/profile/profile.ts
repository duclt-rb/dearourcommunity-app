import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ClientService } from '../core/client.service';
import { ProfileStore } from './profile.store';
import { SidebarComponent } from './sidebar/sidebar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class ProfilePage implements OnInit {
  private api = inject(ClientService);
  private router = inject(Router);
  store = inject(ProfileStore);

  loading = signal(true);

  async ngOnInit() {
    try {
      await this.store.loadProfile();
    } catch {
      this.api.clearToken();
      this.router.navigate(['/auth/login']);
    } finally {
      this.loading.set(false);
    }
  }
}
