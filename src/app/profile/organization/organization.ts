import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationService } from '../../core/services/organization.service';
import { PackagesService } from '../../core/services/packages.service';
import { PurchasesService } from '../../core/services/purchases.service';
import { ProfileStore } from '../profile.store';
import {
  CourseSelection,
  CreditBalances,
  OrganizationMember,
  Package,
  OrgMembership,
} from '@dearourcommunity/client';

/** Một khoá trong pool gán được — lấy từ dto.courses của (các) gói organization mà org đã mua. */
interface PoolCourse {
  courseId: number;
  title: string;
}

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
  private purchasesService = inject(PurchasesService);
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

  // ── Gán khoá cho thành viên (CR-001 — org-credit `course_selection`, owner-only) ──
  orgCredits = signal<CreditBalances | null>(null);
  courseSelections = signal<CourseSelection[] | null>(null);
  coursePool = signal<PoolCourse[]>([]);
  assignMemberUserId = signal('');
  assignCourseId = signal('');
  assignLoading = signal(false);

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

  /** Số suất chọn khoá còn lại của org. */
  courseSelectionBalance = computed(() => this.orgCredits()?.course_selection ?? 0);

  /** Thành viên đang hoạt động — nguồn cho select gán khoá. */
  assignableMembers = computed(() => (this.members() ?? []).filter((m) => m.status === 'active'));

  canAssign = computed(
    () =>
      !this.assignLoading() &&
      this.courseSelectionBalance() > 0 &&
      this.assignMemberUserId() !== '' &&
      this.assignCourseId() !== '',
  );

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

        // Dữ liệu gán khoá (owner-only guard ở BE)
        if (this.isOwner()) {
          await this.loadCourseAssignmentData(org.id);
        }
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
          : 'Không thể tải thông tin doanh nghiệp. Vui lòng thử lại sau.';
      this.errorMessage.set(msg);
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Tải dữ liệu cho phần "Gán khoá cho thành viên": số dư org-credit, danh sách đã gán
   * và pool khoá — pool lấy từ purchases của org: lọc purchase (completed, type package)
   * của gói có packageType='organization' → dto.courses (PackageCourse có wpCourseId +
   * course.postTitle để hiển thị tên).
   */
  async loadCourseAssignmentData(orgId: string) {
    const [credits, selections, pool] = await Promise.all([
      this.orgService.getCredits(orgId),
      this.orgService.getCourseSelections(orgId),
      this.buildCoursePool(orgId),
    ]);
    this.orgCredits.set(credits);
    this.courseSelections.set(selections);
    this.coursePool.set(pool);
  }

  private async buildCoursePool(orgId: string): Promise<PoolCourse[]> {
    const purchases = await this.purchasesService.getOrgPurchases(orgId);
    const packageIds = [
      ...new Set(
        purchases
          .filter((p) => p.status === 'completed' && p.type === 'package')
          .map((p) => p.packageId),
      ),
    ];

    const packages = await Promise.all(
      packageIds.map((id) => this.packageService.findById(id).catch(() => null)),
    );

    const pool = new Map<number, PoolCourse>();
    for (const pkg of packages) {
      if (!pkg || pkg.packageType !== 'organization') continue;
      for (const pc of pkg.courses) {
        if (!pool.has(pc.wpCourseId)) {
          pool.set(pc.wpCourseId, {
            courseId: pc.wpCourseId,
            title: pc.course?.postTitle ?? `Khóa học #${pc.wpCourseId}`,
          });
        }
      }
    }
    return [...pool.values()];
  }

  /** Owner gán khoá cho member — BE trừ 1 org-credit `course_selection` + enroll member. */
  async onAssignSubmit(event: Event) {
    event.preventDefault();
    const org = this.activeOrg();
    if (!org || !this.canAssign()) return;

    const memberUserId = this.assignMemberUserId();
    const courseId = Number(this.assignCourseId());

    this.assignLoading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      await this.orgService.assignCourseSelection(org.id, { memberUserId, courseId });

      const member = this.assignableMembers().find((m) => m.userId === memberUserId);
      const course = this.coursePool().find((c) => c.courseId === courseId);
      this.successMessage.set(
        `Đã gán khoá "${course?.title ?? courseId}" cho ${
          member ? this.getMemberDisplayName(member) : 'thành viên'
        } thành công!`,
      );
      this.assignMemberUserId.set('');
      this.assignCourseId.set('');

      // Refresh số suất còn lại + danh sách đã gán
      await this.loadCourseAssignmentData(org.id);
    } catch (err) {
      // Hiển thị message lỗi từ BE (vd hết lượt / member đã có khoá này)
      console.error('Failed to assign course selection:', err);
      const msg =
        err instanceof Error ? err.message : 'Không thể gán khoá cho thành viên. Vui lòng thử lại.';
      this.errorMessage.set(msg);
    } finally {
      this.assignLoading.set(false);
    }
  }

  /** Tên hiển thị của người nhận khoá trong bảng đã gán. */
  getSelectionMemberName(userId: string): string {
    const member = (this.members() ?? []).find((m) => m.userId === userId);
    return member ? this.getMemberDisplayName(member) : userId;
  }

  /** Tên khoá trong bảng đã gán (fallback #id nếu khoá không còn trong pool). */
  getSelectionCourseTitle(wpCourseId: number): string {
    return (
      this.coursePool().find((c) => c.courseId === wpCourseId)?.title ?? `Khóa học #${wpCourseId}`
    );
  }

  async onInviteSubmit(event: Event) {
    event.preventDefault();
    const email = this.inviteEmail().trim();
    if (!email) return;

    const org = this.activeOrg();
    if (!org) {
      this.errorMessage.set('Không tìm thấy thông tin doanh nghiệp.');
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
      this.successMessage.set(
        `Đã gửi lời mời tham gia doanh nghiệp tới email ${email} thành công!`,
      );
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

    if (
      !confirm(`Bạn có chắc chắn muốn xóa thành viên ${memberEmail} ra khỏi doanh nghiệp không?`)
    ) {
      return;
    }

    this.actionLoading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      await this.orgService.removeMember(org.id, memberId);
      this.successMessage.set(`Đã xóa thành viên khỏi doanh nghiệp thành công!`);

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
