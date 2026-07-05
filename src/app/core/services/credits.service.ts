import { Injectable, inject } from '@angular/core';
import type { AdjustCreditDto } from '@dearourcommunity/client';
import { ClientService } from './client.service';

/** Hệ thống credit (CR-001) — số dư/lịch sử + điều chỉnh tay của admin (CSKH). */
@Injectable({ providedIn: 'root' })
export class CreditsService {
  private clientService = inject(ClientService);

  /**
   * Số dư + lịch sử credit của user đang đăng nhập
   * GET /api/v1/credits/me
   */
  getMine(page?: number, limit?: number) {
    return this.clientService.credits.getMine(page, limit);
  }

  /**
   * Admin điều chỉnh credit tay (amount âm = trừ; note bắt buộc — Q15)
   * POST /api/v1/credits/adjust
   */
  adjust(dto: AdjustCreditDto) {
    return this.clientService.credits.adjust(dto);
  }

  /**
   * Admin tra cứu số dư + lịch sử credit của một user (hoặc org-scope) — màn CSKH
   * GET /api/v1/credits/of-user/:userId
   */
  getOfUser(userId: string, options?: { organizationId?: string; page?: number; limit?: number }) {
    return this.clientService.credits.getOfUser(userId, options);
  }
}
