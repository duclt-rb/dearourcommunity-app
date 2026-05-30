import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { InviteMemberDto } from '@dearourcommunity/client';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private clientService = inject(ClientService);

  get org() {
    return this.clientService.org;
  }

  getMyOrgs() {
    return this.clientService.org.getMyOrgs();
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
}
