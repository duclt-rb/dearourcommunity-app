import { describe, expect, it } from 'vitest';
import { migrateV1toV2 } from './energy.store';
import { getEnergyToolkit } from './energy.data';
import { needsMigration, TOOLKIT_PERSIST_VERSION } from '../shared/persist-migration';

// Chốt chặn: payload v1 (planInfo key theo nhãn tiếng Việt) phải rekey được sang id
// ổn định mà không mất dữ liệu — kể cả key lạ (forward tolerance).
describe('energy toolkit persist migration (v1 → v2)', () => {
  const config = getEnergyToolkit('energy-toolkit-fnb')!;

  /** Payload v1 thực tế: không có `version`, planInfo key là NHÃN tiếng Việt của config VI. */
  const v1 = {
    planInfo: {
      'Doanh nghiệp': 'Nhà hàng Bình Minh',
      'Người phụ trách chung': 'Anh Tuấn',
      'Ngày lập kế hoạch': '2026-03-10',
      'Khoá không nhận diện': 'phải giữ nguyên',
    },
    // Các record đã key theo id từ v1 — migration không được đụng tới.
    assessment: { 'pol-1': 'full' },
    allocation: { hvac: 40 },
    trackKwh: [1200, null, 900],
    rate: 3000,
    currentStep: 2,
  };

  it('detects a versionless payload as v1', () => {
    expect(needsMigration(v1)).toBe(true);
  });

  it('rekeys planInfo by field id, preserving values and unknown keys', () => {
    const migrated = migrateV1toV2(v1, config);

    expect(migrated.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(migrated.planInfo).toEqual({
      'business-name': 'Nhà hàng Bình Minh',
      'overall-owner': 'Anh Tuấn',
      'plan-date': '2026-03-10',
      // Key lạ giữ nguyên (forward tolerance)
      'Khoá không nhận diện': 'phải giữ nguyên',
    });
  });

  it('leaves already-id-keyed records and scalars untouched', () => {
    const migrated = migrateV1toV2(v1, config);
    expect(migrated.assessment).toEqual(v1.assessment);
    expect(migrated.allocation).toEqual(v1.allocation);
    expect(migrated.trackKwh).toEqual(v1.trackKwh);
    expect(migrated.rate).toBe(3000);
    expect(migrated.currentStep).toBe(2);
  });

  it('is a no-op on a v2 payload (guarded by needsMigration; idempotent otherwise)', () => {
    const migrated = migrateV1toV2(v1, config);
    expect(needsMigration(migrated)).toBe(false);
    // Kể cả khi chạy lại (không qua guard), kết quả không đổi.
    expect(migrateV1toV2(migrated, config)).toEqual(migrated);
  });

  it('handles a payload missing planInfo', () => {
    const migrated = migrateV1toV2({ currentStep: 1 }, config);
    expect(migrated.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(migrated.planInfo).toEqual({});
  });

  it('uses identical field ids across sector variants (fnb ⇄ supply)', () => {
    const supply = getEnergyToolkit('energy-toolkit-supply')!;
    expect(supply.planFields.map((f) => f.id)).toEqual(config.planFields.map((f) => f.id));
  });
});
