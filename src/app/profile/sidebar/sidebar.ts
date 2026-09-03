import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthService } from '../../core/services/auth.service';
import LogoComponent from '../../shared/logo/logo';
import { ProfileStore } from '../profile.store';
import { frontpageUrl } from '../../core/i18n/locale';
import { LanguageSwitcher } from '../../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [LanguageSwitcher, RouterLink, RouterLinkActive, LogoComponent, TranslocoPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  store = inject(ProfileStore);
  private authService = inject(AuthService);
  private router = inject(Router);

  onUpgrade() {
    window.location.href = frontpageUrl('/packages');
  }

  onLogout() {
    this.authService.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
