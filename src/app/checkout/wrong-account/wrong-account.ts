import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideLogOut } from '@lucide/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-wrong-account',
  standalone: true,
  imports: [LucideLogOut],
  templateUrl: './wrong-account.html',
  styleUrl: './wrong-account.css',
})
export default class WrongAccountComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Email cần dùng để thanh toán (truyền qua ?email= trên link checkout)
  readonly expectedEmail = this.route.snapshot.queryParams['expected'] ?? '';
  // Email của tài khoản đang đăng nhập (sai)
  readonly currentEmail = this.route.snapshot.queryParams['current'] ?? '';
  // URL checkout gốc để quay lại sau khi đăng nhập đúng tài khoản
  private readonly redirect = this.route.snapshot.queryParams['redirect'] ?? '/checkout/billing';

  // Đăng xuất rồi chuyển sang trang đăng nhập, giữ lại redirect về đúng URL checkout.
  logout() {
    this.authService.clearToken();
    this.router.navigate(['/auth/login'], { queryParams: { redirect: this.redirect } });
  }
}
