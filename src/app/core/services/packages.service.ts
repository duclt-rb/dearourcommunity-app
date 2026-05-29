import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private clientService = inject(ClientService);

  findAll() {
    return this.clientService.packages.findAll();
  }
}
