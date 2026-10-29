// CSI 2026 toolkit type model — "Đánh giá mức độ sẵn sàng ESG, Doanh nghiệp nhỏ và siêu nhỏ" (CR-023).
// Công cụ KHÔNG chấm điểm: mỗi việc là Có / Chưa có / Không áp dụng (hoặc chọn khoảng với câu số
// liệu), kết quả là mức sẵn sàng theo 4 lĩnh vực. Nội dung sinh từ file Excel nguồn bằng
// `tools/csi-readiness/build-data.py` → `data/csi.data.{vi,en}.ts` (cấu trúc khoá chặt bởi parity.spec).

export type { SegmentOptionLite } from '../waste/waste.types';

// ── Trang đọc (Bắt đầu · Về công cụ này) ──

export interface CsiPair {
  label: string;
  text: string;
}

export type CsiDocBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'pairs'; rows: CsiPair[] };

export interface CsiDocSection {
  title: string;
  blocks: CsiDocBlock[];
}

export interface CsiGuide {
  title: string;
  subtitle: string;
  audience: string;
  brand: string;
  byline: string;
  sections: CsiDocSection[];
  footer: string;
}

export interface CsiAbout {
  title: string;
  sections: CsiDocSection[];
}

export interface CsiGlossary {
  title: string;
  entries: { term: string; definition: string }[];
}

// ── Thông tin doanh nghiệp ──

export interface CsiOption {
  label: string;
}

export interface CsiProfileField {
  id: string;
  label: string;
  type?: 'date';
  options?: CsiOption[];
}

export interface CsiProfile {
  title: string;
  timeHint: string;
  fields: CsiProfileField[];
  infoBlocks: { title: string; text: string }[];
}

// ── Câu hỏi ──

/** Bắt buộc (chỉ số cơ bản C — quyết định mức sẵn sàng) / Nâng cao (A — giá trị cộng thêm). */
export type CsiKind = 'core' | 'advanced';

/**
 * Nhãn của lựa chọn khoảng trong câu số liệu (không gắn nhãn = "Đã có"):
 * missing = còn thiếu · fix = cần khắc phục ngay (tính là còn thiếu) ·
 * attention = cần lưu ý (tính là đã có) · na = không áp dụng (không tính).
 */
export type CsiTag = 'missing' | 'fix' | 'attention' | 'na';

export interface CsiRangeOption {
  label: string;
  tag?: CsiTag;
}

export interface CsiQuestion {
  /** STT hiển thị ("1.1"…"4.61") — cũng là khoá persist. */
  num: string;
  text: string;
  kind: CsiKind;
  /** Giấy tờ cần có để chọn "Có". */
  evidence: string;
  /** Việc cần làm (sheet Khoảng cách cần lấp). */
  action: string;
  /** Mã chỉ số CSI nguyên văn (vd "I 1", "G 19", "S 3"). */
  code: string;
  /** Nội dung gốc trong Bộ chỉ số CSI 2026. */
  csiText: string;
  answer: 'yesno' | 'range';
  /** Chỉ có với câu số liệu (answer = 'range'). */
  options?: CsiRangeOption[];
}

export interface CsiQuestionGroup {
  title: string;
  questions: CsiQuestion[];
}

export interface CsiPart {
  /** 1 = Số liệu · 2 = Quản trị · 3 = Môi trường · 4 = Lao động, xã hội. */
  no: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  note: string;
  groups: CsiQuestionGroup[];
}

// ── Kết quả / Khoảng cách / Hồ sơ ──

export interface CsiResultsText {
  title: string;
  subtitle: string;
  note: string;
  overallLabel: string;
  overallNote: string;
  areasTitle: string;
  areasHeaders: string[];
  howTitle: string;
  how: CsiPair[];
  thresholdLabel: string;
  thresholdNote: string;
  thresholdDefault: number;
  groupsTitle: string;
  groupsHeaders: string[];
  firstTitle: string;
  firstNote: string;
  firstHeaders: string[];
}

export interface CsiGapText {
  title: string;
  subtitle: string;
  note: string;
  headers: string[];
}

export interface CsiDocItem {
  id: string;
  title: string;
  /** STT câu hỏi liên quan (vd "2.6, 3.13"). */
  refs: string;
  note: string;
}

export interface CsiDocGroup {
  title: string;
  items: CsiDocItem[];
}

export interface CsiDocuments {
  title: string;
  subtitle: string;
  note: string;
  headers: string[];
  groups: CsiDocGroup[];
}

export interface CsiToolkitConfig {
  id: string;
  guide: CsiGuide;
  profile: CsiProfile;
  parts: CsiPart[];
  /** Tên 4 lĩnh vực (theo thứ tự Phần 1–4). */
  areaTitles: string[];
  results: CsiResultsText;
  gap: CsiGapText;
  documents: CsiDocuments;
  glossary: CsiGlossary;
  about: CsiAbout;
}

// ── Trạng thái & mức sẵn sàng ──

export type CsiYesNo = 'yes' | 'no' | 'na';

/** Tình trạng một câu sau khi trả lời (giống cột "Tình trạng" của file). */
export type CsiStatus = 'unanswered' | 'have' | 'attention' | 'fix' | 'missing' | 'na';

/** Mức ưu tiên ở trang Khoảng cách cần lấp ('' = đã có hoặc không áp dụng). */
export type CsiPriority = 'fix' | 'missing' | 'advanced' | 'attention' | 'unanswered' | '';

/** Mức sẵn sàng; 'nodata' = chưa có dữ liệu, 'partial' = chưa đủ dữ liệu (chỉ ở mức chung). */
export type CsiLevel = 'ready' | 'near' | 'not' | 'nodata' | 'partial';

export const CSI_PROGRESS_VALUES = ['todo', 'doing', 'done'] as const;

/** Câu trả lời đã lưu → tình trạng. Câu yes/no lưu 'yes'|'no'|'na'; câu khoảng lưu chỉ số lựa chọn. */
export function statusOf(q: CsiQuestion, value: string | undefined): CsiStatus {
  if (value === undefined || value === '') return 'unanswered';
  if (q.answer === 'yesno') {
    if (value === 'yes') return 'have';
    if (value === 'na') return 'na';
    return 'missing';
  }
  const tag = q.options?.[Number(value)]?.tag;
  return tag ?? 'have';
}

/** Tình trạng → mức ưu tiên (giống cột "Ưu tiên" của sheet Khoảng cách cần lấp). */
export function priorityFor(kind: CsiKind, status: CsiStatus): CsiPriority {
  if (status === 'fix') return 'fix';
  if (status === 'missing') return kind === 'core' ? 'missing' : 'advanced';
  if (status === 'attention') return 'attention';
  if (status === 'unanswered') return 'unanswered';
  return '';
}

export const CSI_YES_NO_VALUES: CsiYesNo[] = ['yes', 'no', 'na'];
