import { localePick } from '../../core/i18n/locale';
import { WasteToolkitConfig } from './waste.types';
import { WASTE_TOOLKITS_EN } from './data/waste.data.en';
import { WASTE_TOOLKITS_VI } from './data/waste.data.vi';

/**
 * Facade per-locale: nội dung thật nằm trong `data/waste.data.{vi,en}.ts`
 * (cấu trúc id/key khoá chặt bởi `data/parity.spec.ts`). An toàn ở module level
 * vì locale resolve sync và cố định suốt page load (đổi locale = full reload).
 *
 * Bản VI được re-export riêng cho migration localStorage v1→v2: map nhãn→id
 * PHẢI build từ config tiếng Việt (v1 persist nhãn VN), bất kể locale đang chạy.
 */
export { WASTE_TOOLKITS_VI } from './data/waste.data.vi';

export const WASTE_TOOLKITS: Record<string, WasteToolkitConfig> = localePick({
  vi: WASTE_TOOLKITS_VI,
  en: WASTE_TOOLKITS_EN,
});

export function getWasteToolkit(id: string | null): WasteToolkitConfig | undefined {
  return id ? WASTE_TOOLKITS[id] : undefined;
}
