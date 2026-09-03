import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthService } from '../core/services/auth.service';
import { ProfileStore } from './profile.store';
import { SidebarComponent } from './sidebar/sidebar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, TranslocoPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export default class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  store = inject(ProfileStore);

  loading = signal(true);

  async ngOnInit() {
    try {
      await this.store.loadProfile();
    } catch {
      this.authService.clearToken();
      this.router.navigate(['/auth/login']);
    } finally {
      this.loading.set(false);
    }
  }
}
