import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';
import { PurchaseExtraSlotsDto } from '@dearourcommunity/client';

@Injectable({ providedIn: 'root' })
export class PurchasesService {
  private clientService = inject(ClientService);

  /**
   * Mua thêm slot học tập cho doanh nghiệp
   * POST /api/v1/org/:orgId/purchases/extra-slots
   */
  purchaseExtraSlots(orgId: string, dto: PurchaseExtraSlotsDto) {
    return this.clientService.purchases.purchaseExtraSlots(orgId, dto);
  }

  /**
   * Lấy lịch sử giao dịch mua hàng của doanh nghiệp
   * GET /api/v1/org/:orgId/purchases
   */
  getOrgPurchases(orgId: string) {
    return this.clientService.purchases.getOrgPurchases(orgId);
  }
}
