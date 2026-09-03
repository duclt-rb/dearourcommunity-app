import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LucideArrowLeft } from '@lucide/angular';
import { LanguageSwitcher } from '../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [
    LanguageSwitcher,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LucideArrowLeft,
    TranslocoPipe,
  ],
  templateUrl: './system.html',
  styleUrl: './system.css',
})
export default class SystemComponent {}
