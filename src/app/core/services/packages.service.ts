import { Injectable, inject } from '@angular/core';
import { UpdatePackageDto } from '@dearourcommunity/client';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private clientService = inject(ClientService);

  findAll() {
    return this.clientService.packages.findAll();
  }

  update(id: string, dto: UpdatePackageDto) {
    return this.clientService.packages.update(id, dto);
  }
}
