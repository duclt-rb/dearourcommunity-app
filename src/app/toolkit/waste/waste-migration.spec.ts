import { describe, expect, it } from 'vitest';
import { migrateV1toV2 } from './waste.store';
import { getWasteToolkit } from './waste.data';
import { needsMigration, TOOLKIT_PERSIST_VERSION } from '../shared/persist-migration';

// Chốt chặn: payload v1 (key theo nhãn tiếng Việt) phải rekey được sang id ổn định
// mà không mất dữ liệu — kể cả key lạ (forward tolerance).
describe('waste toolkit persist migration (v1 → v2)', () => {
  const config = getWasteToolkit('waste-toolkit-fnb')!;

  /** Payload v1 thực tế: không có `version`, key là NHÃN tiếng Việt của config VI. */
  const v1 = {
    mappingInfo: {
      'Tên doanh nghiệp': 'Quán Cà Phê Xanh',
      'Loại hình F&B': 'Quán cà phê',
      'Số điểm bán / cơ sở': '2',
      'Ngày lập bản đồ': '2026-01-15',
      'Thực hiện cùng': 'Chị Lan',
    },
    contractorInfo: {
      'Tên nhà thầu': 'Công ty Môi trường ABC',
      'Số giấy phép': 'GP-1234/DONRE',
      'Ngày hết hạn giấy phép': '2027-06-30',
      'Các loại chất thải được cấp phép xử lý': 'Dầu thải, rác nguy hại',
      'Ngày đánh giá': '2026-01-20',
      'Người đánh giá': 'Anh Minh',
      'Khoá không nhận diện': 'phải giữ nguyên',
    },
    planInfo: {
      'Tên doanh nghiệp': 'Quán Cà Phê Xanh',
      'Ngày lập kế hoạch': '2026-02-01',
      'Chuyên gia Eco Solutions': 'Chị Lan',
      'Người phụ trách (nội bộ)': 'Anh Minh',
      'Ngày review kế tiếp': '2026-03-01',
    },
    // Các record đã key theo id từ v1 — migration không được đụng tới.
    assessment: { 'sep-1': 'full', 'con-2': 'partial' },
    currentStep: 3,
  };

  it('detects a versionless payload as v1', () => {
    expect(needsMigration(v1)).toBe(true);
  });

  it('rekeys mappingInfo/contractorInfo/planInfo by field id, preserving values', () => {
    const migrated = migrateV1toV2(v1, config);

    expect(migrated.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(migrated.mappingInfo).toEqual({
      'business-name': 'Quán Cà Phê Xanh',
      'business-type': 'Quán cà phê',
      'site-count': '2',
      'mapping-date': '2026-01-15',
      'conducted-with': 'Chị Lan',
    });
    expect(migrated.contractorInfo).toEqual({
      'contractor-name': 'Công ty Môi trường ABC',
      'license-number': 'GP-1234/DONRE',
      'license-expiry': '2027-06-30',
      'licensed-waste-types': 'Dầu thải, rác nguy hại',
      'assessment-date': '2026-01-20',
      assessor: 'Anh Minh',
      // Key lạ giữ nguyên (forward tolerance)
      'Khoá không nhận diện': 'phải giữ nguyên',
    });
    expect(migrated.planInfo).toEqual({
      'business-name': 'Quán Cà Phê Xanh',
      'plan-date': '2026-02-01',
      'eco-expert': 'Chị Lan',
      'internal-owner': 'Anh Minh',
      'next-review-date': '2026-03-01',
    });
  });

  it('leaves already-id-keyed records and scalars untouched', () => {
    const migrated = migrateV1toV2(v1, config);
    expect(migrated.assessment).toEqual(v1.assessment);
    expect(migrated.currentStep).toBe(3);
  });

  it('is a no-op on a v2 payload (guarded by needsMigration; idempotent otherwise)', () => {
    const migrated = migrateV1toV2(v1, config);
    expect(needsMigration(migrated)).toBe(false);
    // Kể cả khi chạy lại (không qua guard), kết quả không đổi.
    expect(migrateV1toV2(migrated, config)).toEqual(migrated);
  });

  it('handles a payload missing the label-keyed records', () => {
    const migrated = migrateV1toV2({ currentStep: 1 }, config);
    expect(migrated.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(migrated.mappingInfo).toEqual({});
    expect(migrated.contractorInfo).toEqual({});
    expect(migrated.planInfo).toEqual({});
  });

  it('uses identical field ids across sector variants (fnb ⇄ supply)', () => {
    const supply = getWasteToolkit('waste-toolkit-supply')!;
    expect(supply.mappingFields.map((f) => f.id)).toEqual(config.mappingFields.map((f) => f.id));
    expect(supply.contractorFields.map((f) => f.id)).toEqual(
      config.contractorFields.map((f) => f.id),
    );
    expect(supply.planFields.map((f) => f.id)).toEqual(config.planFields.map((f) => f.id));
  });
});
