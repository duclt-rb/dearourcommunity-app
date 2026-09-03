import { describe, expect, it } from 'vitest';
import { migrateV1toV2 } from './quick-scan.store';
import { QUICK_SCANS_VI } from './quick-scan.data';
import { needsMigration, TOOLKIT_PERSIST_VERSION } from '../shared/persist-migration';

// Migration map build từ edition TIẾNG VIỆT — không phụ thuộc locale đang chạy
const FNB = QUICK_SCANS_VI['esg-quick-scan-fnb'];

describe('quick-scan persist migration v1 → v2', () => {
  // Payload v1 thật: profile key theo NHÃN VN, actionPlan key theo AREA VN
  const v1 = {
    scores: { 'e-1': 2, 's-3': 1 },
    profile: {
      'Tên doanh nghiệp': 'Quán Cà Phê Xanh',
      'Số lượng nhân viên': '12',
      'Đã từng tham gia đào tạo ESG chưa?': 'Có',
      'Trường lạ không có trong config': 'giữ nguyên',
    },
    actionPlan: {
      'Phát sinh & Xử lý rác thải': { action: 'Phân loại tại nguồn', owner: 'Lan' },
      'Tuân thủ về dữ liệu': { status: 'doing' },
    },
    currentStep: 3,
  };

  it('rekeys profile by field id and actionPlan by focus id', () => {
    const v2 = migrateV1toV2(structuredClone(v1), FNB);
    expect(v2.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(v2.profile['business-name']).toBe('Quán Cà Phê Xanh');
    expect(v2.profile['employees']).toBe('12');
    // Giá trị boolean v1 lưu nhãn 'Có' → value ổn định 'yes'
    expect(v2.profile['esg-training']).toBe('yes');
    expect(v2.actionPlan?.['waste']).toEqual({ action: 'Phân loại tại nguồn', owner: 'Lan' });
    expect(v2.actionPlan?.['data']).toEqual({ status: 'doing' });
    // scores & step giữ nguyên
    expect(v2.scores).toEqual(v1.scores);
    expect(v2.currentStep).toBe(3);
  });

  it('preserves unknown keys (forward tolerance)', () => {
    const v2 = migrateV1toV2(structuredClone(v1), FNB);
    expect(v2.profile['Trường lạ không có trong config']).toBe('giữ nguyên');
  });

  it('v2 payload is not migrated again (needsMigration guard)', () => {
    const v2 = migrateV1toV2(structuredClone(v1), FNB);
    expect(needsMigration(v2)).toBe(false);
    expect(needsMigration(v1)).toBe(true);
  });

  it('every profile field and priority focus has a stable unique id', () => {
    for (const config of Object.values(QUICK_SCANS_VI)) {
      const profileIds = config.profileFields.map((f) => f.id);
      const focusIds = config.priorityFocus.map((f) => f.id);
      expect(new Set(profileIds).size).toBe(profileIds.length);
      expect(new Set(focusIds).size).toBe(focusIds.length);
      for (const id of [...profileIds, ...focusIds]) {
        expect(id).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });
});
