import { Component, ViewEncapsulation } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  encapsulation: ViewEncapsulation.None,
})
export default class AuthLayoutComponent {}
