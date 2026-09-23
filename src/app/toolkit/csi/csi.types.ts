// CSI 2026 toolkit type model — "Bộ công cụ ESG theo Bộ chỉ số CSI 2026, phiên bản DN nhỏ
// và siêu nhỏ". Nội dung lấy NGUYÊN VĂN từ bộ file Excel gốc (10 sheet): mỗi sheet là một
// bước của wizard, văn bản người đọc nằm trong `data/csi.data.{vi,en}.ts`.
import { localePick } from '../../core/i18n/locale';
import type { SegmentOptionLite } from '../waste/waste.types';

export type { SegmentOptionLite } from '../waste/waste.types';
export { ACTION_STATUS_OPTIONS } from '../waste/waste.types';

// ── Trang đọc (sheet 1 Hướng dẫn · 2 Giới thiệu CSI · 3 Thuật ngữ) ──

export interface CsiPair {
  label: string;
  text: string;
}

export type CsiDocBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'pairs'; rows: CsiPair[] }
  | { kind: 'table'; headers: string[]; rows: string[][] };

export interface CsiDocSection {
  id: string;
  title: string;
  blocks: CsiDocBlock[];
}

export interface CsiDocPage {
  id: string;
  /** Dòng tiêu đề đầu sheet (title / subtitle / ghi chú). */
  header: string[];
  sections: CsiDocSection[];
}

// ── Sheet 3.1 — Hồ sơ doanh nghiệp ──

export interface CsiOption {
  value: string;
  label: string;
}

export interface CsiProfileField {
  id: string;
  label: string;
  /** Có khi nhãn gốc liệt kê lựa chọn trong ngoặc, vd "(Nhỏ / Siêu nhỏ)". */
  options?: CsiOption[];
}

export interface CsiProfileRow {
  id: string;
  label: string;
}

export interface CsiInfoBlock {
  id: string;
  title: string;
  text: string;
}

/** Bảng số liệu 3 năm: Mô tả · 2023 · 2024 · 2025 · Ghi chú / tài liệu đính kèm. */
export interface CsiYearTable {
  id: string;
  title: string;
  headers: string[];
  rows: CsiProfileRow[];
}

export interface CsiSectionARow {
  id: string;
  label: string;
  maxScore: number;
}

export interface CsiProfile {
  title: string;
  subtitle: string;
  note: string;
  generalTitle: string;
  generalFields: CsiProfileField[];
  infoBlocks: CsiInfoBlock[];
  yearTables: CsiYearTable[];
  standards: { title: string; rows: CsiProfileRow[] };
  violations: { title: string; headers: string[]; rows: CsiProfileRow[] };
  /** Tự đánh giá mức độ hoàn thiện Mục A (Phần I 14đ · Phần II 4đ). */
  sectionA: { title: string; headers: string[]; rows: CsiSectionARow[] };
}

// ── Sheet 4–7 — Chỉ số I / G / E / L&S ──

export type CsiLevel = 'C' | 'A';
export type CsiSectionId = 'I' | 'G' | 'E' | 'LS';

export interface CsiIndicator {
  /** Mã chỉ số nguyên văn (vd "I 1", "L 30") — cũng là khoá persist. */
  id: string;
  level: CsiLevel;
  text: string;
  /** Chỉ số I: đơn vị tính của số liệu 3 năm. */
  unit?: string;
  maxScore: number;
  /** Gợi ý hành động. */
  hint: string;
  /** Hồ sơ minh chứng cần chuẩn bị. */
  evidence: string;
}

/** Nhóm con "» …" (title rỗng = chỉ số nằm thẳng dưới nhóm). */
export interface CsiBlock {
  id: string;
  title: string;
  declaredMax: number;
  indicators: CsiIndicator[];
}

export interface CsiGroup {
  id: string;
  title: string;
  /** Điểm tối đa ghi ở dòng nhóm trong file (có thể khác tổng chỉ số thành phần). */
  declaredMax: number;
  blocks: CsiBlock[];
}

/** Tiêu đề cột nguyên văn của sheet; `unit`/`y2023…` chỉ có ở sheet chỉ số I. */
export type CsiColumnKey =
  | 'code'
  | 'level'
  | 'text'
  | 'unit'
  | 'y2023'
  | 'y2024'
  | 'y2025'
  | 'maxScore'
  | 'answer'
  | 'selfScore'
  | 'available'
  | 'priority'
  | 'hint'
  | 'evidence'
  | 'note'
  | 'owner'
  | 'deadline'
  | 'group';

export interface CsiSection {
  id: CsiSectionId;
  title: string;
  subtitle: string;
  note: string;
  /** Cột "Phần" ở bảng điểm/kế hoạch, vd "Chỉ số I". */
  shortLabel: string;
  /** Tên dòng tương ứng ở Bảng điểm tổng hợp. */
  dashboardLabel: string;
  /** Điểm tối đa CSI công bố (dùng cho điểm quy đổi). */
  publishedMax: number;
  headers: Partial<Record<CsiColumnKey, string>>;
  groups: CsiGroup[];
  total: { label: string; maxScore: number };
}

// ── Sheet 8 — Bảng điểm · Sheet 9 — Kế hoạch hành động ──

export interface CsiDashboardLabels {
  title: string;
  subtitle: string;
  note: string;
  partsTitle: string;
  partsHeaders: string[];
  partARows: string[];
  totalLabel: string;
  partsNote: string;
  complianceTitle: string;
  complianceHeaders: string[];
  /** 7 dòng theo thứ tự file: tổng C · C đạt · C cần xử lý ngay · C N/A · tổng A · A đạt · chưa đánh giá. */
  complianceRows: string[];
  groupsTitle: string;
  groupsHeaders: string[];
}

export interface CsiPlanLabels {
  title: string;
  notes: string[];
  /** 14 cột nguyên văn của sheet Kế hoạch hành động. */
  headers: string[];
}

export interface CsiToolkitConfig {
  id: string;
  name: string;
  sector: string;
  brand: string;
  guide: CsiDocPage;
  intro: CsiDocPage;
  glossary: CsiDocPage;
  profile: CsiProfile;
  sections: CsiSection[];
  dashboard: CsiDashboardLabels;
  plan: CsiPlanLabels;
}

// ── Trả lời & mức ưu tiên ──

export type CsiAnswer = 'yes' | 'no' | 'na';

/** Có / Không / Không thuộc đối tượng áp dụng — đúng biểu mẫu CSI (không có "Một phần"). */
export const CSI_ANSWER_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'yes', label: 'Có' },
    { value: 'no', label: 'Không' },
    { value: 'na', label: 'Không thuộc đối tượng áp dụng' },
  ],
  en: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'na', label: 'Not applicable' },
  ],
});

/** Mục A chỉ có Có/Không (sheet Hồ sơ doanh nghiệp). */
export const CSI_YES_NO_OPTIONS: SegmentOptionLite[] = CSI_ANSWER_OPTIONS.slice(0, 2);

export type CsiPriority = 'unrated' | 'high' | 'medium' | 'done' | 'na';

/**
 * Mức ưu tiên (chốt 23/09): C + Không → CAO - Tuân thủ · A + Không → TRUNG BÌNH - Nâng cao ·
 * Có → Đã đạt · N/A → Không áp dụng · chưa trả lời → Chưa đánh giá.
 */
export function priorityFor(level: CsiLevel, answer: string | undefined): CsiPriority {
  if (answer === 'yes') return 'done';
  if (answer === 'na') return 'na';
  if (answer === 'no') return level === 'C' ? 'high' : 'medium';
  return 'unrated';
}

export const CSI_PRIORITY_LABELS: Record<CsiPriority, string> = localePick({
  vi: {
    unrated: 'Chưa đánh giá',
    high: 'CAO - Tuân thủ',
    medium: 'TRUNG BÌNH - Nâng cao',
    done: 'Đã đạt',
    na: 'Không áp dụng',
  },
  en: {
    unrated: 'Not assessed',
    high: 'HIGH - Compliance',
    medium: 'MEDIUM - Advanced',
    done: 'Achieved',
    na: 'Not applicable',
  },
});

/** Bộ lọc cột "Mức ưu tiên" ở Kế hoạch hành động ('' = tất cả). */
export const CSI_PRIORITY_FILTERS: SegmentOptionLite[] = [
  { value: '', label: localePick({ vi: 'Tất cả', en: 'All' }) },
  ...(['high', 'medium', 'unrated', 'done', 'na'] as CsiPriority[]).map((p) => ({
    value: p,
    label: CSI_PRIORITY_LABELS[p],
  })),
];
