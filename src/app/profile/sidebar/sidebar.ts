import { Component, inject } from '@angular/core';
import { ProfileStateService } from '../profile-state.service';
import { ClientService } from '../../core/client.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import LogoComponent from '../../shared/logo/logo';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  state = inject(ProfileStateService);
  private api = inject(ClientService);
  private router = inject(Router);

  onLogout() {
    this.api.clearToken();
    this.router.navigate(['/auth/login']);
  }
}
