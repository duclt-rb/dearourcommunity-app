export type MaturityTone = 'error' | 'warning' | 'success';

export interface SegmentOptionLite {
  value: string;
  label: string;
}

/** Tuân thủ scoring options (Đầy đủ / Một phần / Chưa có / N/A). */
export const ASSESSMENT_OPTIONS: SegmentOptionLite[] = [
  { value: 'full', label: 'Đầy đủ' },
  { value: 'partial', label: 'Một phần' },
  { value: 'none', label: 'Chưa có' },
  { value: 'na', label: 'N/A' },
];

/** Scored full=1, partial=0.5, none=0, N/A excluded. */
export const ASSESSMENT_WEIGHTS: Record<string, number> = {
  full: 1,
  partial: 0.5,
  none: 0,
};

/** Có / Không — dùng cho cột "Nhạy cảm?" của bản đồ dữ liệu. */
export const SENSITIVE_OPTIONS: SegmentOptionLite[] = [
  { value: 'yes', label: 'Có' },
  { value: 'no', label: 'Không' },
];

/** Cơ sở pháp lý xử lý dữ liệu — dropdown cột "Cơ sở pháp lý" của bản đồ dữ liệu. */
export const LEGAL_BASIS_OPTIONS: SegmentOptionLite[] = [
  { value: 'Đồng ý', label: 'Đồng ý' },
  { value: 'Hợp đồng', label: 'Hợp đồng' },
  { value: 'Nghĩa vụ pháp lý', label: 'Nghĩa vụ pháp lý' },
  { value: 'Lợi ích hợp pháp', label: 'Lợi ích hợp pháp' },
  { value: 'Lợi ích sống còn', label: 'Lợi ích sống còn' },
  { value: 'Khác', label: 'Khác' },
];

/** Dropdown cột "Chuyển ra nước ngoài?" của bản đồ dữ liệu. */
export const TRANSFER_OPTIONS: SegmentOptionLite[] = [
  { value: 'Có', label: 'Có' },
  { value: 'Không', label: 'Không' },
  { value: 'Không chắc', label: 'Không chắc' },
];

/** Trạng thái chung cho nghĩa vụ pháp lý & hành động 90 ngày. */
export const STATUS_OPTIONS: SegmentOptionLite[] = [
  { value: 'todo', label: 'Chưa bắt đầu' },
  { value: 'doing', label: 'Đang làm' },
  { value: 'done', label: 'Hoàn thành' },
];

/** Mức độ nghiêm trọng của một sự cố dữ liệu. */
export const SEVERITY_OPTIONS: SegmentOptionLite[] = [
  { value: 'low', label: 'Thấp' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'high', label: 'Cao' },
];

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
  /** Tiêu đề các cột (trừ cột "Loại dữ liệu cá nhân"). */
  dataMapColumns: string[];
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
export const READINESS_BANDS: MaturityBand[] = [
  { label: 'Tốt', min: 70, tone: 'success' },
  { label: 'Cần cải thiện', min: 40, tone: 'warning' },
  { label: 'Rủi ro cao', min: 0, tone: 'error' },
];

export function readinessFor(percent: number): MaturityBand {
  return (
    READINESS_BANDS.find((b) => percent >= b.min) ?? READINESS_BANDS[READINESS_BANDS.length - 1]
  );
}
