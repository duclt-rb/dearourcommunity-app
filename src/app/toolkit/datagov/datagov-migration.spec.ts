import { describe, expect, it } from 'vitest';
import { migrateV1toV2 } from './datagov.store';
import { getDataGov } from './datagov.data';
import { DataGovToolkitConfig } from './datagov.types';
import { needsMigration, TOOLKIT_PERSIST_VERSION } from '../shared/persist-migration';

const SAN_XUAT = getDataGov('datagov-toolkit-san-xuat') as DataGovToolkitConfig;
const FNB = getDataGov('datagov-toolkit-fnb') as DataGovToolkitConfig;

describe('datagov persist migration v1 → v2', () => {
  // Payload v1 thật: dataMap inner keys theo NHÃN cột VN, legal-basis/transfer GIÁ TRỊ VN;
  // cột "Nhạy cảm?" đã lưu 'yes'/'no' từ v1.
  const v1 = {
    dataMap: {
      d1: {
        'Nguồn thu thập': 'Form tuyển dụng',
        'Mục đích xử lý': 'Quản lý nhân sự',
        'Cơ sở pháp lý': 'Đồng ý',
        'Nhạy cảm?': 'yes',
        'Nơi lưu trữ': 'Server nội bộ',
        'Ai có quyền truy cập': 'Phòng HR',
        'Thời gian lưu': '5 năm',
        'Chia sẻ / Bên thứ ba': 'BHXH',
        'Chuyển ra nước ngoài?': 'Không chắc',
        'Cột lạ không có trong config': 'giữ nguyên',
      },
      d3: {
        'Cơ sở pháp lý': 'Nghĩa vụ pháp lý',
        'Chuyển ra nước ngoài?': 'Có',
        'Nhạy cảm?': 'no',
      },
    },
    assessment: { 'collect-1': 'full', 'security-2': 'partial' },
    incidentChecks: { i1: true },
    incidentLog: [{ date: '2026-01-15', desc: 'Lộ file lương', severity: 'high' }],
    legal: { l1: { last: '2026-01-01', next: '2027-01-01', owner: 'Lan', status: 'doing' } },
    actions: { a1: { owner: 'Minh', status: 'todo' } },
    milestones: { m30: { meetDate: '2026-02-01', note: 'OK' } },
    currentStep: 2,
  };

  it('rekeys dataMap inner keys by column key and maps legal-basis/transfer values', () => {
    const v2 = migrateV1toV2(structuredClone(v1), SAN_XUAT);
    expect(v2.version).toBe(TOOLKIT_PERSIST_VERSION);
    expect(v2.dataMap?.['d1']).toMatchObject({
      source: 'Form tuyển dụng',
      purpose: 'Quản lý nhân sự',
      'legal-basis': 'consent',
      sensitive: 'yes', // đã là enum từ v1 — không đổi
      storage: 'Server nội bộ',
      access: 'Phòng HR',
      retention: '5 năm',
      sharing: 'BHXH',
      transfer: 'unsure',
    });
    expect(v2.dataMap?.['d3']).toEqual({
      'legal-basis': 'legal_obligation',
      transfer: 'yes',
      sensitive: 'no',
    });
    // Không còn key nhãn VN nào sót lại
    expect(Object.keys(v2.dataMap?.['d1'] ?? {})).not.toContain('Cơ sở pháp lý');
    expect(Object.keys(v2.dataMap?.['d1'] ?? {})).not.toContain('Chuyển ra nước ngoài?');
  });

  it('leaves already-stable parts of the payload untouched', () => {
    const v2 = migrateV1toV2(structuredClone(v1), SAN_XUAT);
    expect(v2.assessment).toEqual(v1.assessment);
    expect(v2.incidentChecks).toEqual(v1.incidentChecks);
    expect(v2.incidentLog).toEqual(v1.incidentLog);
    expect(v2.legal).toEqual(v1.legal);
    expect(v2.actions).toEqual(v1.actions);
    expect(v2.milestones).toEqual(v1.milestones);
    expect(v2.currentStep).toBe(2);
  });

  it('preserves unknown keys and unknown values (forward tolerance)', () => {
    const withUnknownValue = structuredClone(v1);
    withUnknownValue.dataMap.d3['Cơ sở pháp lý'] = 'giá trị lạ';
    const v2 = migrateV1toV2(withUnknownValue, SAN_XUAT);
    expect(v2.dataMap?.['d1']?.['Cột lạ không có trong config']).toBe('giữ nguyên');
    expect(v2.dataMap?.['d3']?.['legal-basis']).toBe('giá trị lạ');
  });

  it('v2 payload is not migrated again (needsMigration guard)', () => {
    const v2 = migrateV1toV2(structuredClone(v1), SAN_XUAT);
    expect(needsMigration(v2)).toBe(false);
    expect(needsMigration(v1)).toBe(true);
    // Chạy lại migrate trên v2 là no-op về nội dung
    expect(migrateV1toV2(structuredClone(v2), SAN_XUAT)).toEqual(v2);
  });

  it('maps every VN legal-basis and transfer value of the real option lists', () => {
    const legalPairs: [string, string][] = [
      ['Đồng ý', 'consent'],
      ['Hợp đồng', 'contract'],
      ['Nghĩa vụ pháp lý', 'legal_obligation'],
      ['Lợi ích hợp pháp', 'legitimate_interest'],
      ['Lợi ích sống còn', 'vital_interest'],
      ['Khác', 'other'],
    ];
    const transferPairs: [string, string][] = [
      ['Có', 'yes'],
      ['Không', 'no'],
      ['Không chắc', 'unsure'],
    ];
    for (const [vn, key] of legalPairs) {
      const v2 = migrateV1toV2({ dataMap: { d1: { 'Cơ sở pháp lý': vn } } }, FNB);
      expect(v2.dataMap?.['d1']?.['legal-basis']).toBe(key);
    }
    for (const [vn, key] of transferPairs) {
      const v2 = migrateV1toV2({ dataMap: { d1: { 'Chuyển ra nước ngoài?': vn } } }, FNB);
      expect(v2.dataMap?.['d1']?.['transfer']).toBe(key);
    }
  });

  it('every dataMap column has a stable unique kebab-case key in both configs', () => {
    for (const config of [SAN_XUAT, FNB]) {
      const keys = config.dataMapColumns.map((c) => c.key);
      expect(new Set(keys).size).toBe(keys.length);
      for (const key of keys) {
        expect(key).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });
});
