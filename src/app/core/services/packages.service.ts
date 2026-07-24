import { Injectable, inject } from '@angular/core';
import { UpdatePackageDto } from '@dearourcommunity/client';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  private clientService = inject(ClientService);

  findAll() {
    return this.clientService.packages.findAll();
  }

  findById(id: string) {
    return this.clientService.packages.findById(id);
  }

  /** CR-009 — báo giá nâng cấp (cần đăng nhập): số thực phải trả sau khi trừ gói đang sở hữu. */
  getUpgradeQuote(id: string) {
    return this.clientService.packages.getUpgradeQuote(id);
  }

  update(id: string, dto: UpdatePackageDto) {
    return this.clientService.packages.update(id, dto);
  }
}
