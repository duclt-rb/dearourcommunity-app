import { describe, expect, it } from 'vitest';
import vi from '../../../../public/i18n/vi.json';
import en from '../../../../public/i18n/en.json';

/** Flatten nested JSON thành tập key 'a.b.c'. Mảng coi là giá trị lá. */
function flatKeys(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return [prefix];
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    flatKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

// Chốt chặn: en.json không bao giờ được lệch key so với vi.json (và ngược lại).
describe('i18n key parity (vi ⇄ en)', () => {
  const viKeys = new Set(flatKeys(vi));
  const enKeys = new Set(flatKeys(en));

  it('every vi key exists in en', () => {
    const missing = [...viKeys].filter((k) => !enKeys.has(k));
    expect(missing).toEqual([]);
  });

  it('every en key exists in vi', () => {
    const missing = [...enKeys].filter((k) => !viKeys.has(k));
    expect(missing).toEqual([]);
  });
});
