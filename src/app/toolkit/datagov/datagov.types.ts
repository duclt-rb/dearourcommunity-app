import { localePick } from '../../core/i18n/locale';

export type MaturityTone = 'error' | 'warning' | 'success';

export interface SegmentOptionLite {
  value: string;
  label: string;
}

/** Tuân thủ scoring options (Đầy đủ / Một phần / Chưa có / N/A). */
export const ASSESSMENT_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'full', label: 'Đầy đủ' },
    { value: 'partial', label: 'Một phần' },
    { value: 'none', label: 'Chưa có' },
    { value: 'na', label: 'N/A' },
  ],
  en: [
    { value: 'full', label: 'In place' },
    { value: 'partial', label: 'Partial' },
    { value: 'none', label: 'Not yet' },
    { value: 'na', label: 'N/A' },
  ],
});

/** Scored full=1, partial=0.5, none=0, N/A excluded. */
export const ASSESSMENT_WEIGHTS: Record<string, number> = {
  full: 1,
  partial: 0.5,
  none: 0,
};

/** Có / Không — dùng cho cột "Nhạy cảm?" của bản đồ dữ liệu. */
export const SENSITIVE_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'yes', label: 'Có' },
    { value: 'no', label: 'Không' },
  ],
  en: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
});

/** Cơ sở pháp lý xử lý dữ liệu — dropdown cột "Cơ sở pháp lý" của bản đồ dữ liệu. */
export const LEGAL_BASIS_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'consent', label: 'Đồng ý' },
    { value: 'contract', label: 'Hợp đồng' },
    { value: 'legal_obligation', label: 'Nghĩa vụ pháp lý' },
    { value: 'legitimate_interest', label: 'Lợi ích hợp pháp' },
    { value: 'vital_interest', label: 'Lợi ích sống còn' },
    { value: 'other', label: 'Khác' },
  ],
  en: [
    { value: 'consent', label: 'Consent' },
    { value: 'contract', label: 'Contract' },
    { value: 'legal_obligation', label: 'Legal obligation' },
    { value: 'legitimate_interest', label: 'Legitimate interest' },
    { value: 'vital_interest', label: 'Vital interest' },
    { value: 'other', label: 'Other' },
  ],
});

/** Dropdown cột "Chuyển ra nước ngoài?" của bản đồ dữ liệu. */
export const TRANSFER_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'yes', label: 'Có' },
    { value: 'no', label: 'Không' },
    { value: 'unsure', label: 'Không chắc' },
  ],
  en: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'unsure', label: 'Unsure' },
  ],
});

/** Trạng thái chung cho nghĩa vụ pháp lý & hành động 90 ngày. */
export const STATUS_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'todo', label: 'Chưa bắt đầu' },
    { value: 'doing', label: 'Đang làm' },
    { value: 'done', label: 'Hoàn thành' },
  ],
  en: [
    { value: 'todo', label: 'Not started' },
    { value: 'doing', label: 'In progress' },
    { value: 'done', label: 'Done' },
  ],
});

/** Mức độ nghiêm trọng của một sự cố dữ liệu. */
export const SEVERITY_OPTIONS: SegmentOptionLite[] = localePick({
  vi: [
    { value: 'low', label: 'Thấp' },
    { value: 'medium', label: 'Trung bình' },
    { value: 'high', label: 'Cao' },
  ],
  en: [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ],
});

export interface AssessmentQuestion {
  id: string;
  /** Câu hỏi / thực hành. */
  text: string;
  /** Rủi ro nếu chưa làm. */
  risk: string;
  /** Tham chiếu pháp lý / ghi chú. */
  ref?: string;
}
export interface AssessmentGroup {
  id: string;
  topic: string;
  questions: AssessmentQuestion[];
}

/** Một cột của Bản đồ Dữ liệu: `key` ổn định để persist, `label` là tiêu đề hiển thị. */
export interface DataMapColumn {
  /** Key kebab-case ổn định — dùng làm inner key của `dataMap` trong localStorage. */
  key: string;
  /** Tiêu đề cột hiển thị (tiếng Việt). */
  label: string;
}

/** Một dòng định nghĩa sẵn của Bản đồ Dữ liệu. */
export interface DataMapRow {
  id: string;
  label: string;
  /** Đánh dấu sẵn là dữ liệu nhạy cảm (theo file nguồn). */
  sensitive?: boolean;
}

/** Một bước trong quy trình ứng phó sự cố. */
export interface IncidentStep {
  id: string;
  title: string;
  desc: string;
}

/** Một nghĩa vụ pháp lý/dữ liệu cần theo dõi định kỳ. */
export interface LegalItem {
  id: string;
  label: string;
  /** Tần suất / hạn (vd "Hằng năm"). */
  frequency: string;
}

export type ActionPriority = 'critical' | 'important' | 'quickwin';
export interface ActionItem {
  id: string;
  priority: ActionPriority;
  /** Lĩnh vực. */
  area: string;
  /** Hành động cụ thể. */
  action: string;
  /** Thời hạn (vd "Ngày 30"). */
  deadline: string;
  /** Tiêu chí hoàn thành. */
  measure: string;
}

/** Mốc rà soát 30/60/90 cùng chuyên gia. */
export interface ReviewMilestone {
  id: string;
  title: string;
  /** Trọng tâm của buổi rà soát. */
  focus: string;
}

export interface DataGovToolkitConfig {
  id: string;
  name: string;
  sector: string;
  /** Intro paragraph shown on the first step. */
  introLead: string;
  /** Các cột (trừ cột "Loại dữ liệu cá nhân") — key ổn định + nhãn hiển thị. */
  dataMapColumns: DataMapColumn[];
  dataMapRows: DataMapRow[];
  /** Ghi chú cuối bảng bản đồ dữ liệu. */
  dataMapNote: string;
  assessmentGroups: AssessmentGroup[];
  /** Gợi ý tĩnh ở Bảng Rủi ro, theo id nhóm đánh giá. */
  riskSuggestions: Record<string, string>;
  /** Lưu ý SME ở Bảng Rủi ro. */
  riskNote: string;
  incidentSteps: IncidentStep[];
  legalItems: LegalItem[];
  actions: ActionItem[];
  milestones: ReviewMilestone[];
}

export interface MaturityBand {
  label: string;
  min: number;
  tone: MaturityTone;
}

/** Thang sẵn sàng tuân thủ (theo %). */
export const READINESS_BANDS: MaturityBand[] = localePick({
  vi: [
    { label: 'Tốt', min: 70, tone: 'success' },
    { label: 'Cần cải thiện', min: 40, tone: 'warning' },
    { label: 'Rủi ro cao', min: 0, tone: 'error' },
  ],
  en: [
    { label: 'Good', min: 70, tone: 'success' },
    { label: 'Needs improvement', min: 40, tone: 'warning' },
    { label: 'High risk', min: 0, tone: 'error' },
  ],
});

export function readinessFor(percent: number): MaturityBand {
  return (
    READINESS_BANDS.find((b) => percent >= b.min) ?? READINESS_BANDS[READINESS_BANDS.length - 1]
  );
}
