import { Injectable, inject } from '@angular/core';
import type { UpdateAddonPricesDto } from '@dearourcommunity/client';
import { ClientService } from './client.service';

/** CR-012 — giá bán lẻ khoá / Quick Scan / Toolkit tại checkout (admin sửa được). */
@Injectable({ providedIn: 'root' })
export class AddonsService {
  private clientService = inject(ClientService);

  /** GET /api/v1/addon-prices — bảng giá (public). */
  getPrices() {
    return this.clientService.addons.getPrices();
  }

  /** GET /api/v1/addon-prices/details — bảng giá kèm người sửa gần nhất (admin). */
  getPriceRows() {
    return this.clientService.addons.getPriceRows();
  }

  /** PATCH /api/v1/addon-prices — cập nhật giá (admin). */
  updatePrices(dto: UpdateAddonPricesDto) {
    return this.clientService.addons.updatePrices(dto);
  }
}
