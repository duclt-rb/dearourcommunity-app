import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationService } from '../../core/services/organization.service';
import { PackagesService } from '../../core/services/packages.service';
import { ProfileStore } from '../profile.store';
import { OrganizationMember, Package, OrgMembership } from '@dearourcommunity/client';

@Component({
  selector: 'app-profile-organization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './organization.html',
  styleUrl: './organization.css',
})
export default class OrganizationComponent implements OnInit {
  private orgService = inject(OrganizationService);
  private packageService = inject(PackagesService);
  store = inject(ProfileStore);

  // States
  packageDetails = signal<Package | null>(null);
  members = signal<OrganizationMember[] | null>(null);

  loading = signal(true);
  actionLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Form states
  inviteEmail = signal('');

  // Computed properties
  activeOrg = computed<OrgMembership | null>(() => {
    const orgs = this.store.organizations();
    return orgs && orgs.length > 0 ? orgs[0] : null;
  });

  isOwner = computed(() => {
    return this.activeOrg()?.role === 'owner';
  });

  slotsUsed = computed(() => {
    const list = this.members() || [];
    return list.filter((m) => m.status === 'active').length;
  });

  maxSlots = computed(() => {
    return this.packageDetails()?.slots ?? 0;
  });

  slotsPercentage = computed(() => {
    const max = this.maxSlots();
    if (max === 0) return 0;
    return Math.min(100, Math.round((this.slotsUsed() / max) * 100));
  });

  isEmailValid = computed(() => {
    const email = this.inviteEmail().trim();
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  });

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      const org = this.activeOrg();
      if (org) {
        // Fetch members
        const membersList = await this.orgService.getMembers(org.id);
        this.members.set(membersList);
      }

      // Fetch package details if packageId exists
      const packageId = this.store.packageId();
      if (packageId) {
        const pkg = await this.packageService.findById(packageId);
        this.packageDetails.set(pkg);
      }
    } catch (err) {
      console.error('Failed to load organization data:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Không thể tải thông tin tổ chức. Vui lòng thử lại sau.';
      this.errorMessage.set(msg);
    } finally {
      this.loading.set(false);
    }
  }

  async onInviteSubmit(event: Event) {
    event.preventDefault();
    const email = this.inviteEmail().trim();
    if (!email) return;

    const org = this.activeOrg();
    if (!org) {
      this.errorMessage.set('Không tìm thấy thông tin tổ chức.');
      return;
    }

    if (this.slotsUsed() >= this.maxSlots()) {
      this.errorMessage.set(
        'Số lượng thành viên hoạt động đã đạt giới hạn tối đa của gói học phí.',
      );
      return;
    }

    this.actionLoading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      await this.orgService.inviteMember(org.id, { email });
      this.successMessage.set(`Đã gửi lời mời tham gia tổ chức tới email ${email} thành công!`);
      this.inviteEmail.set('');

      // Reload members list
      const membersList = await this.orgService.getMembers(org.id);
      this.members.set(membersList);
    } catch (err) {
      console.error('Failed to invite member:', err);
      const msg =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi lời mời. Vui lòng thử lại.';
      this.errorMessage.set(msg);
    } finally {
      this.actionLoading.set(false);
    }
  }

  async onRemoveMember(memberId: string, memberEmail: string) {
    const org = this.activeOrg();
    if (!org) return;

    if (!confirm(`Bạn có chắc chắn muốn xóa thành viên ${memberEmail} ra khỏi tổ chức không?`)) {
      return;
    }

    this.actionLoading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      await this.orgService.removeMember(org.id, memberId);
      this.successMessage.set(`Đã xóa thành viên khỏi tổ chức thành công!`);

      // Reload members list
      const membersList = await this.orgService.getMembers(org.id);
      this.members.set(membersList);
    } catch (err) {
      console.error('Failed to remove member:', err);
      const msg =
        err instanceof Error ? err.message : 'Không thể xóa thành viên. Vui lòng thử lại sau.';
      this.errorMessage.set(msg);
    } finally {
      this.actionLoading.set(false);
    }
  }

  // Get a display name for members using wpUser structure
  getMemberDisplayName(member: OrganizationMember): string {
    if (member.user?.wpUser?.displayName) {
      return member.user.wpUser.displayName;
    }
    return member.role === 'owner' ? 'Chủ sở hữu' : 'Thành viên';
  }

  // Get email from nested wpUser structure
  getMemberEmail(member: OrganizationMember): string {
    return member.user?.wpUser?.userEmail || 'N/A';
  }
}
