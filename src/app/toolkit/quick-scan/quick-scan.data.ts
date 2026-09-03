import { localePick } from '../../core/i18n/locale';
import { QuickScanConfig } from './quick-scan.types';
import { QUICK_SCANS_EN } from './data/quick-scan.data.en';
import { QUICK_SCANS_VI } from './data/quick-scan.data.vi';

/**
 * Facade per-locale: nội dung thật nằm trong `data/quick-scan.data.{vi,en}.ts`
 * (cấu trúc id/key khoá chặt bởi `data/parity.spec.ts`). An toàn ở module level
 * vì locale resolve sync và cố định suốt page load (đổi locale = full reload).
 *
 * Bản VI được re-export riêng cho migration localStorage v1→v2: map nhãn→id
 * PHẢI build từ config tiếng Việt (v1 persist nhãn VN), bất kể locale đang chạy.
 */
export { QUICK_SCANS_VI } from './data/quick-scan.data.vi';

export const QUICK_SCANS: Record<string, QuickScanConfig> = localePick({
  vi: QUICK_SCANS_VI,
  en: QUICK_SCANS_EN,
});

export function getQuickScan(id: string | null): QuickScanConfig | undefined {
  return id ? QUICK_SCANS[id] : undefined;
}
