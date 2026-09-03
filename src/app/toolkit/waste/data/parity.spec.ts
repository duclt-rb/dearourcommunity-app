import { describe, expect, it } from 'vitest';
import { WASTE_TOOLKITS_EN } from './waste.data.en';
import { WASTE_TOOLKITS_VI } from './waste.data.vi';

/**
 * Structure-parity guard giữa hai edition VI/EN: mọi thứ trừ text người đọc
 * (id, key, weight, threshold, độ dài & thứ tự mảng) phải GIỐNG HỆT NHAU.
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
  'ref',
  'desc',
  'note',
  'introLead',
  'targetDay',
  'unit',
  'verify',
  'area',
  'action',
  'deadline',
  'measure',
  'focus',
  'frequency',
  'tip',
  'costLabel',
  'costPlaceholder',
  'sourceHeader',
  'annualLabel',
  'resultCardLabel',
  'stepLabel',
]);

/** Thay giá trị các field human-text bằng placeholder, giữ nguyên phần còn lại. */
function structural(value: unknown, parentKey = ''): unknown {
  if (Array.isArray(value)) return value.map((v) => structural(v, parentKey));
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] =
        HUMAN_TEXT_FIELDS.has(key) || parentKey === 'riskSuggestions'
          ? '<text>'
          : structural(child, key);
    }
    return out;
  }
  return value;
}

describe('waste data VI/EN structure parity', () => {
  it('both editions expose the same config ids', () => {
    expect(Object.keys(WASTE_TOOLKITS_EN).sort()).toEqual(Object.keys(WASTE_TOOLKITS_VI).sort());
  });

  for (const [id, vi] of Object.entries(WASTE_TOOLKITS_VI)) {
    it(`config '${id}' has an EN edition with identical structure`, () => {
      const en = WASTE_TOOLKITS_EN[id];
      expect(en).toBeDefined();
      expect(structural(en)).toEqual(structural(vi));
    });
  }
});
