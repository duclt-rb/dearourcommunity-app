import { describe, expect, it } from 'vitest';
import { CSI_TOOLKITS_EN } from './csi.data.en';
import { CSI_TOOLKITS_VI } from './csi.data.vi';

/**
 * Structure-parity guard giữa hai edition VI/EN: mọi thứ trừ text người đọc
 * (id, STT, loại việc, mã CSI, kiểu trả lời, tag, độ dài & thứ tự mảng) phải GIỐNG HỆT NHAU.
 * Mọi chuỗi khác là text người đọc → thay bằng placeholder (vẫn so sánh SỰ TỒN TẠI).
 */
const STRUCTURAL_KEYS = new Set([
  'id',
  'num',
  'kind',
  'code',
  'answer',
  'tag',
  'refs',
  'type',
  'no',
]);

/** Ký tự có dấu tiếng Việt — bản EN không được còn. */
const VIETNAMESE = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹàáèéìíòóùúý]/i;

function strings(value: unknown, key = '', out: [string, string][] = []): [string, string][] {
  if (Array.isArray(value)) value.forEach((v) => strings(v, key, out));
  else if (value !== null && typeof value === 'object') {
    for (const [k, child] of Object.entries(value as Record<string, unknown>))
      strings(child, k, out);
  } else if (typeof value === 'string') out.push([key, value]);
  return out;
}

function structural(value: unknown, key = ''): unknown {
  if (Array.isArray(value)) return value.map((v) => structural(v));
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, child] of Object.entries(value as Record<string, unknown>)) {
      out[k] = structural(child, k);
    }
    return out;
  }
  if (typeof value === 'string' && !STRUCTURAL_KEYS.has(key)) return value ? '<text>' : '';
  return value;
}

describe('csi data VI/EN structure parity', () => {
  it('both editions expose the same config ids', () => {
    expect(Object.keys(CSI_TOOLKITS_EN).sort()).toEqual(Object.keys(CSI_TOOLKITS_VI).sort());
  });

  for (const [id, vi] of Object.entries(CSI_TOOLKITS_VI)) {
    it(`config '${id}' has an EN edition with identical structure`, () => {
      const en = CSI_TOOLKITS_EN[id];
      expect(en).toBeDefined();
      expect(structural(en)).toEqual(structural(vi));
    });

    it(`config '${id}' EN edition has no untranslated Vietnamese text`, () => {
      const leftovers = strings(CSI_TOOLKITS_EN[id])
        .filter(([key]) => !STRUCTURAL_KEYS.has(key))
        .filter(([, text]) => VIETNAMESE.test(text));
      expect(leftovers).toEqual([]);
    });
  }
});
