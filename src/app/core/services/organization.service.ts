import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { AssignCourseSelectionDto, InviteMemberDto } from '@dearourcommunity/client';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private clientService = inject(ClientService);

  get org() {
    return this.clientService.org;
  }

  getMyOrgs() {
    return this.clientService.org.getMyOrgs();
  }

  getActiveOrg() {
    return this.clientService.org.getActiveOrg();
  }

  getDetail(id: string) {
    return this.clientService.org.getDetail(id);
  }

  getMembers(orgId: string) {
    return this.clientService.org.getMembers(orgId);
  }

  inviteMember(orgId: string, dto: InviteMemberDto) {
    return this.clientService.org.inviteMember(orgId, dto);
  }

  removeMember(orgId: string, memberId: string) {
    return this.clientService.org.removeMember(orgId, memberId);
  }

  checkInvitation(token: string) {
    return this.clientService.org.checkInvitation(token);
  }

  acceptInvitation(token: string) {
    return this.clientService.org.acceptInvitation({ token });
  }

  /**
   * Owner gán khoá cho member — trừ 1 org-credit `course_selection` + enroll member (CR-001 5.7)
   * POST /api/v1/org/:orgId/course-selections (owner-only)
   */
  assignCourseSelection(orgId: string, dto: AssignCourseSelectionDto) {
    return this.clientService.org.assignCourseSelection(orgId, dto);
  }

  /**
   * Danh sách khoá đã gán trong org
   * GET /api/v1/org/:orgId/course-selections (owner-only)
   */
  getCourseSelections(orgId: string) {
    return this.clientService.org.getCourseSelections(orgId);
  }

  /**
   * Số dư credit thuộc org (mentoring_session / course_selection)
   * GET /api/v1/org/:orgId/credits (owner-only)
   */
  getCredits(orgId: string) {
    return this.clientService.org.getCredits(orgId);
  }
}
