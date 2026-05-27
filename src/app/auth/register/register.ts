import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
      <div style="text-align:center;">
        <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Create Account</h1>
        <p style="color:#666;margin-bottom:1rem;">Coming soon</p>
        <a routerLink="/auth/login" style="color:var(--color-primary);">Back to login</a>
      </div>
    </div>
  `,
})
export default class RegisterPage {}
