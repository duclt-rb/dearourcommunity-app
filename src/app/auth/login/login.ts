import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LucideMail, LucideLock, LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    LucideMail,
    LucideLock,
    LucideEye,
    LucideEyeOff,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class LoginPage {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  loading = false;

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Login:', { email: this.email, password: this.password });
    }, 1500);
  }
}
