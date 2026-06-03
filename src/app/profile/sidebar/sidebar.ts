import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import LogoComponent from '../../shared/logo/logo';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  store = inject(ProfileStore);
  private authService = inject(AuthService);
  private router = inject(Router);

  onUpgrade() {
    window.location.href = `${environment.appUrl}/packages`;
  }

  onLogout() {
    this.authService.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
