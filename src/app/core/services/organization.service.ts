import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private clientService = inject(ClientService);

  get org() {
    return this.clientService.org;
  }
}
