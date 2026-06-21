export type MaturityTone = 'error' | 'warning' | 'success';

export interface FieldDef {
  label: string;
  hint?: string;
  type?: 'text' | 'date';
}

/** Assessment scoring options (✓ / △ / ✗ / N/A). */
export interface AssessmentQuestion {
  id: string;
  text: string;
  risk: string;
  ref?: string;
}
export interface AssessmentGroup {
  id: string;
  topic: string;
  questions: AssessmentQuestion[];
}

export interface WasteStream {
  id: string;
  label: string;
  unit: string;
}
export interface WasteStreamGroup {
  label: string;
  streams: WasteStream[];
}

export interface NamedItem {
  id: string;
  label: string;
}

export interface ContractorCriterion {
  id: string;
  label: string;
  desc: string;
  /** Weight as a percentage (0–100). */
  weight: number;
  verify: string;
}

export type ActionPriority = 'critical' | 'important' | 'quickwin';
export interface ActionItem {
  id: string;
  priority: ActionPriority;
  action: string;
  targetDay: string;
  measure: string;
}

export type ChecklistPriority = 'critical' | 'important' | 'standard';
export interface ChecklistItem {
  id: string;
  priority: ChecklistPriority;
  text: string;
}

export interface ReviewMilestone {
  id: string;
  /** Mốc (e.g. "30 ngày"). */
  title: string;
  /** Trọng tâm của buổi rà soát. */
  focus: string;
}

/** Sector-specific copy for the weekly tracker step (food waste vs. scrap). */
export interface TrackerLabels {
  /** Stepper label. */
  stepLabel: string;
  /** Section title + note. */
  title: string;
  note: string;
  /** Cost-per-kg input. */
  costLabel: string;
  costPlaceholder: string;
  /** First column header of the weekly table. */
  sourceHeader: string;
  /** Annual cost callout. */
  annualLabel: string;
  /** Label of the matching card on the results step. */
  resultCardLabel: string;
  /** Ghi chú/mẹo hiển thị cuối bảng tracker (như dòng cuối tab nguồn). */
  tip: string;
}

export interface WasteToolkitConfig {
  id: string;
  name: string;
  sector: string;
  /** Intro paragraph shown on the first step. */
  introLead: string;
  /** Copy for the weekly tracker step. */
  tracker: TrackerLabels;
  mappingFields: FieldDef[];
  wasteStreamGroups: WasteStreamGroup[];
  assessmentGroups: AssessmentGroup[];
  contractorFields: FieldDef[];
  contractorCriteria: ContractorCriterion[];
  contractorChecklist: ChecklistItem[];
  foodSources: NamedItem[];
  planFields: FieldDef[];
  actions: ActionItem[];
  reviewMilestones: ReviewMilestone[];
}

export interface SegmentOptionLite {
  value: string;
  label: string;
}

/** Practice assessment scale; scored full=1, partial=0.5, none=0, N/A excluded. */
export const ASSESSMENT_OPTIONS: SegmentOptionLite[] = [
  { value: 'full', label: 'Đầy đủ' },
  { value: 'partial', label: 'Một phần' },
  { value: 'none', label: 'Chưa có' },
  { value: 'na', label: 'N/A' },
];

export const ASSESSMENT_WEIGHTS: Record<string, number> = {
  full: 1,
  partial: 0.5,
  none: 0,
};

export const YES_NO_OPTIONS: SegmentOptionLite[] = [
  { value: 'yes', label: 'Có' },
  { value: 'no', label: 'Không' },
];

/** Current disposal method for a waste stream. */
export const DISPOSAL_OPTIONS: SegmentOptionLite[] = [
  { value: 'licensed', label: 'Nhà thầu được cấp phép' },
  { value: 'self', label: 'Tự xử lý' },
  { value: 'municipality', label: 'Đơn vị thu gom địa phương' },
  { value: 'mixed', label: 'Trộn lẫn / không rõ' },
  { value: 'none', label: 'Không xử lý' },
];

export const COMPLIANT_OPTIONS: SegmentOptionLite[] = [
  { value: 'yes', label: 'Có' },
  { value: 'no', label: 'Không' },
  { value: 'unsure', label: 'Không rõ' },
];

export const ACTION_STATUS_OPTIONS: SegmentOptionLite[] = [
  { value: 'todo', label: 'Chưa bắt đầu' },
  { value: 'doing', label: 'Đang làm' },
  { value: 'done', label: 'Hoàn thành' },
];

export const PRIORITY_OPTIONS: SegmentOptionLite[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'important', label: 'Important' },
  { value: 'optional', label: 'Optional' },
];

export const CONTRACTOR_SCALE: SegmentOptionLite[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

export interface MaturityBand {
  label: string;
  min: number;
  tone: MaturityTone;
}

/** Shared readiness scale (percentage based). */
export const READINESS_BANDS: MaturityBand[] = [
  { label: 'Tốt', min: 70, tone: 'success' },
  { label: 'Cần cải thiện', min: 40, tone: 'warning' },
  { label: 'Giai đoạn đầu', min: 0, tone: 'error' },
];

export function readinessFor(percent: number): MaturityBand {
  return (
    READINESS_BANDS.find((b) => percent >= b.min) ?? READINESS_BANDS[READINESS_BANDS.length - 1]
  );
}

/** Contractor verdict from a 0–100 weighted score (Giữ lại / Có điều kiện / Thay thế). */
export function contractorVerdict(score: number): MaturityBand {
  if (score >= 80) return { label: 'Giữ lại', min: 80, tone: 'success' };
  if (score >= 50) return { label: 'Có điều kiện', min: 50, tone: 'warning' };
  return { label: 'Thay thế', min: 0, tone: 'error' };
}
