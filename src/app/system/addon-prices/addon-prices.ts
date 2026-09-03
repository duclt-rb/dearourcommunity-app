import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucideAlertCircle, LucideCheck, LucideTag } from '@lucide/angular';
import { ApiError, type AddonPriceRow, type AddonType } from '@dearourcommunity/client';
import { AddonsService } from '../../core/services/addons.service';

// Nhãn loại addon là translation key — dịch tại nơi render (items() bên dưới).
const LABELS: Record<AddonType, string> = {
  extra_course: 'system.addonPrices.types.extraCourse',
  quick_scan: 'system.addonPrices.types.quickScan',
  toolkit: 'system.addonPrices.types.toolkit',
};

/**
 * CR-012 — màn admin sửa giá bán lẻ. Một mức chung cho mỗi loại (D4); giá này chỉ áp cho đơn
 * TẠO SAU khi sửa — đơn chuyển khoản đang chờ duyệt đã chốt giá trong `extra_data`.
 */
@Component({
  selector: 'app-system-addon-prices',
  standalone: true,
  imports: [DatePipe, DecimalPipe, TranslocoPipe, LucideAlertCircle, LucideCheck, LucideTag],
  templateUrl: './addon-prices.html',
  styleUrl: './addon-prices.css',
})
export default class SystemAddonPricesComponent implements OnInit {
  private readonly addonsService = inject(AddonsService);
  private readonly transloco = inject(TranslocoService);

  readonly rows = signal<AddonPriceRow[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);
  readonly saveSuccess = signal(false);

  /** Giá đang nhập, theo từng loại (chuỗi để giữ nguyên ô trống khi user xoá). */
  readonly draft = signal<Record<AddonType, string>>({
    extra_course: '',
    quick_scan: '',
    toolkit: '',
  });

  readonly items = computed(() =>
    this.rows().map((row) => ({
      addonType: row.addonType,
      label: LABELS[row.addonType]
        ? this.transloco.translate(LABELS[row.addonType])
        : row.addonType,
      price: row.price,
      updatedBy: row.updatedBy,
      updatedAt: row.updatedAt,
    })),
  );

  /** Chỉ cho lưu khi có ít nhất một giá khác giá hiện tại. */
  readonly changed = computed(() => {
    const draft = this.draft();
    return this.rows().some((row) => {
      const raw = draft[row.addonType];
      return raw !== '' && Number(raw) !== Number(row.price);
    });
  });

  readonly draftValid = computed(() =>
    Object.values(this.draft()).every(
      (raw) => raw === '' || (!isNaN(Number(raw)) && Number(raw) >= 0),
    ),
  );

  ngOnInit() {
    void this.load();
  }

  async load() {
    this.isLoading.set(true);
    this.loadError.set(null);
    try {
      const rows = await this.addonsService.getPriceRows();
      this.rows.set(rows);
      this.draft.set(
        rows.reduce((acc, row) => ({ ...acc, [row.addonType]: String(Number(row.price)) }), {
          extra_course: '',
          quick_scan: '',
          toolkit: '',
        } as Record<AddonType, string>),
      );
    } catch (err) {
      this.loadError.set(
        err instanceof ApiError
          ? err.message
          : this.transloco.translate('system.addonPrices.errors.loadFailed'),
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  setDraft(addonType: AddonType, value: string) {
    this.draft.update((draft) => ({ ...draft, [addonType]: value }));
    this.saveSuccess.set(false);
  }

  async save() {
    if (!this.changed() || !this.draftValid() || this.isSaving()) return;

    this.isSaving.set(true);
    this.saveError.set(null);
    this.saveSuccess.set(false);
    try {
      const draft = this.draft();
      const rows = await this.addonsService.updatePrices({
        extraCourse: draft.extra_course === '' ? undefined : Number(draft.extra_course),
        quickScan: draft.quick_scan === '' ? undefined : Number(draft.quick_scan),
        toolkit: draft.toolkit === '' ? undefined : Number(draft.toolkit),
      });
      this.rows.set(rows);
      this.saveSuccess.set(true);
    } catch (err) {
      this.saveError.set(
        err instanceof ApiError
          ? err.message
          : this.transloco.translate('system.addonPrices.errors.saveFailed'),
      );
    } finally {
      this.isSaving.set(false);
    }
  }
}
