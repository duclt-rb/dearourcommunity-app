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
   * Số dư MỌI loại credit thuộc org (đủ các key của CreditType, thiếu loại nào trả 0).
   * Lưu ý: theo luồng mua chỉ course_selection của gói org thuộc pool org (R13 CR-001) —
   * các loại khác về người mua, nhưng admin vẫn adjust tay vào org được (CR-005).
   * GET /api/v1/org/:orgId/credits (owner-only)
   */
  getCredits(orgId: string) {
    return this.clientService.org.getCredits(orgId);
  }

  /**
   * CR-004 — suất khoá giữ chỗ từ checkout (reserved/assigned); org có slot thì chỉ gán
   * được khoá còn suất reserved. GET /api/v1/org/:orgId/course-slots (owner-only)
   */
  getCourseSlots(orgId: string) {
    return this.clientService.org.getCourseSlots(orgId);
  }
}
