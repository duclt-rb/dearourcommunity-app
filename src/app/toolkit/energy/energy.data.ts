import { localePick } from '../../core/i18n/locale';
import { EnergyToolkitConfig } from './energy.types';
import { ENERGY_TOOLKITS_EN } from './data/energy.data.en';
import { ENERGY_TOOLKITS_VI } from './data/energy.data.vi';

/**
 * Facade per-locale: nội dung thật nằm trong `data/energy.data.{vi,en}.ts`
 * (cấu trúc id/key khoá chặt bởi `data/parity.spec.ts`). An toàn ở module level
 * vì locale resolve sync và cố định suốt page load (đổi locale = full reload).
 *
 * Bản VI được re-export riêng cho migration localStorage v1→v2: map nhãn→id
 * PHẢI build từ config tiếng Việt (v1 persist nhãn VN), bất kể locale đang chạy.
 */
export { ENERGY_TOOLKITS_VI } from './data/energy.data.vi';

export const ENERGY_TOOLKITS: Record<string, EnergyToolkitConfig> = localePick({
  vi: ENERGY_TOOLKITS_VI,
  en: ENERGY_TOOLKITS_EN,
});

export function getEnergyToolkit(id: string | null): EnergyToolkitConfig | undefined {
  return id ? ENERGY_TOOLKITS[id] : undefined;
}
