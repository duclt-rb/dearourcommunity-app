import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideArrowLeft],
  templateUrl: './system.html',
  styleUrl: './system.css',
})
export default class SystemComponent {
  // Quản lý gói học & Mentor chỉ bật ở môi trường non-production (local/dev)
  readonly showAdminTools = !environment.production;
}
