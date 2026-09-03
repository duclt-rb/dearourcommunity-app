import { describe, expect, it } from 'vitest';
import { QUICK_SCANS_EN } from './quick-scan.data.en';
import { QUICK_SCANS_VI } from './quick-scan.data.vi';

/**
 * Structure-parity guard giữa hai edition VI/EN: mọi thứ trừ text người đọc
 * (id, key, maxScore, type, priority, độ dài & thứ tự mảng) phải GIỐNG HỆT NHAU.
 * Field human-text chỉ được thay giá trị bằng placeholder (vẫn so sánh SỰ TỒN TẠI
 * của field — thiếu `hint` ở một edition cũng là lỗi cấu trúc).
 */
const HUMAN_TEXT_FIELDS = new Set([
  'name',
  'sector',
  'label',
  'hint',
  'title',
  'topic',
  'text',
  'risk',
  'area',
  'pillar',
  'benefit',
]);

/** Thay giá trị các field human-text bằng placeholder, giữ nguyên phần còn lại. */
function structural(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(structural);
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = HUMAN_TEXT_FIELDS.has(key) ? '<text>' : structural(child);
    }
    return out;
  }
  return value;
}

describe('quick-scan data VI/EN structure parity', () => {
  it('both editions expose the same config ids', () => {
    expect(Object.keys(QUICK_SCANS_EN).sort()).toEqual(Object.keys(QUICK_SCANS_VI).sort());
  });

  for (const [id, vi] of Object.entries(QUICK_SCANS_VI)) {
    it(`config '${id}' has an EN edition with identical structure`, () => {
      const en = QUICK_SCANS_EN[id];
      expect(en).toBeDefined();
      expect(structural(en)).toEqual(structural(vi));
    });
  }
});
