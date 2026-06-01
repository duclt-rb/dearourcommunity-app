import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  LucideAlertTriangle,
  LucideArrowRight,
  LucideCheckCircle2,
  LucideLogIn,
  LucideLogOut,
  LucideMail,
  LucideUserPlus,
  LucideUsers,
} from '@lucide/angular';
import { Button } from 'primeng/button';
import AuthLayoutComponent from '../../auth/auth-layout/auth-layout';
import { OrganizationService } from '../../core/services/organization.service';
import { AuthStore } from '../../core/stores/auth.store';
import LogoComponent from '../../shared/logo/logo';

interface InvitationDetails {
  email: string;
  organizationName?: string;
  organizationId: string;
  expiresAt: string;
  inviter?: {
    id: string;
    displayName: string;
  };
}

@Component({
  selector: 'app-invitation-check',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AuthLayoutComponent,
    LogoComponent,
    LucideMail,
    LucideCheckCircle2,
    LucideAlertTriangle,
    LucideArrowRight,
    LucideLogIn,
    LucideUserPlus,
    LucideLogOut,
    LucideUsers,
    Button,
  ],
  templateUrl: './check.html',
  styleUrl: './check.css',
  encapsulation: ViewEncapsulation.None,
})
export default class CheckInvitationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orgService = inject(OrganizationService);
  authStore = inject(AuthStore);

  // States
  token = signal<string | null>(null);
  invitation = signal<InvitationDetails | null>(null);
  loading = signal(true);
  accepting = signal(false);
  success = signal(false);
  errorMessage = signal<string | null>(null);

  // Computed properties
  isAuthenticated = computed(() => this.authStore.isAuthenticated());
  currentUser = computed(() => this.authStore.user());

  currentUserEmail = computed(() => this.currentUser()?.email || '');

  isEmailMatching = computed(() => {
    const inviteEmail = this.invitation()?.email?.toLowerCase().trim();
    const userEmail = this.currentUserEmail().toLowerCase().trim();
    return inviteEmail === userEmail;
  });

  isExpired = computed(() => {
    const expires = this.invitation()?.expiresAt;
    if (!expires) return false;
    return new Date(expires).getTime() < Date.now();
  });

  // Check display names
  inviterName = computed(() => {
    return this.invitation()?.inviter?.displayName || 'Chủ sở hữu';
  });

  orgName = computed(() => {
    return this.invitation()?.organizationName || 'Tổ chức';
  });

  async ngOnInit() {
    // 1. Load current user first if token exists in storage
    if (!this.isAuthenticated()) {
      await this.authStore.loadCurrentUser();
    }

    // 2. Read query parameter
    this.route.queryParamMap.subscribe(async (params) => {
      const tokenVal = params.get('token');
      this.token.set(tokenVal);

      if (!tokenVal) {
        this.errorMessage.set('Mã lời mời không tồn tại hoặc đường dẫn không hợp lệ.');
        this.loading.set(false);
        return;
      }

      await this.verifyToken(tokenVal);
    });
  }

  async verifyToken(tokenVal: string) {
    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const res = await this.orgService.checkInvitation(tokenVal);
      this.invitation.set(res as unknown as InvitationDetails);
    } catch (err: unknown) {
      console.error('Verify token failed:', err);
      const msg =
        err instanceof Error ? err.message : 'Lời mời không hợp lệ hoặc đã hết hạn sử dụng.';
      this.errorMessage.set(msg);
    } finally {
      this.loading.set(false);
    }
  }

  async acceptInvite() {
    const tokenVal = this.token();
    if (!tokenVal) return;

    this.accepting.set(true);
    this.errorMessage.set(null);

    try {
      await this.orgService.acceptInvitation(tokenVal);
      this.success.set(true);

      // Reload profile to refresh org membership details in memory/auth state
      await this.authStore.loadCurrentUser();
    } catch (err: unknown) {
      console.error('Accept invitation failed:', err);
      const msg =
        err instanceof Error ? err.message : 'Chấp nhận lời mời thất bại. Vui lòng thử lại sau.';
      this.errorMessage.set(msg);
    } finally {
      this.accepting.set(false);
    }
  }

  async logoutAndLogin() {
    this.authStore.logout();
    const currentUrl = window.location.pathname + window.location.search;
    window.location.href = `/auth/login?redirect=${encodeURIComponent(currentUrl)}`;
  }

  getLoginUrl(): string {
    const currentUrl = window.location.pathname + window.location.search;
    return `/auth/login?redirect=${encodeURIComponent(currentUrl)}`;
  }

  getRegisterUrl(): string {
    const currentUrl = window.location.pathname + window.location.search;
    return `/auth/register?redirect=${encodeURIComponent(currentUrl)}`;
  }
}
