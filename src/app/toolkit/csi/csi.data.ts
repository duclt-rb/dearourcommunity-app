import { localePick } from '../../core/i18n/locale';
import { CsiToolkitConfig } from './csi.types';
import { CSI_TOOLKITS_EN } from './data/csi.data.en';
import { CSI_TOOLKITS_VI } from './data/csi.data.vi';

/**
 * Facade per-locale: nội dung thật nằm trong `data/csi.data.{vi,en}.ts`
 * (cấu trúc id/key khoá chặt bởi `data/parity.spec.ts`). An toàn ở module level
 * vì locale resolve sync và cố định suốt page load (đổi locale = full reload).
 */
export const CSI_TOOLKITS: Record<string, CsiToolkitConfig> = localePick({
  vi: CSI_TOOLKITS_VI,
  en: CSI_TOOLKITS_EN,
});

export function getCsiToolkit(id: string | null): CsiToolkitConfig | undefined {
  return id ? CSI_TOOLKITS[id] : undefined;
}
