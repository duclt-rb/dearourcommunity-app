import { localePick } from '../../core/i18n/locale';
import { DataGovToolkitConfig } from './datagov.types';
import { DATAGOV_TOOLKITS_EN } from './data/datagov.data.en';
import { DATAGOV_TOOLKITS_VI } from './data/datagov.data.vi';

/**
 * Facade per-locale: nội dung thật nằm trong `data/datagov.data.{vi,en}.ts`
 * (cấu trúc id/key khoá chặt bởi `data/parity.spec.ts`). An toàn ở module level
 * vì locale resolve sync và cố định suốt page load (đổi locale = full reload).
 *
 * Bản VI được re-export riêng cho migration localStorage v1→v2: map nhãn cột →
 * key + map giá trị PHẢI build từ config tiếng Việt, bất kể locale đang chạy.
 */
export { DATAGOV_TOOLKITS_VI } from './data/datagov.data.vi';

const DATAGOV_TOOLKITS: Record<string, DataGovToolkitConfig> = localePick({
  vi: DATAGOV_TOOLKITS_VI,
  en: DATAGOV_TOOLKITS_EN,
});

export function getDataGov(id: string | null): DataGovToolkitConfig | undefined {
  return id ? DATAGOV_TOOLKITS[id] : undefined;
}
