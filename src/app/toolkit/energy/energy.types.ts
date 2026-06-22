// Energy toolkit type model. Generic scoring primitives are shared with the
// Waste toolkit (same Đầy đủ/Một phần/Chưa có/N/A scale & readiness bands) and re-exported here
// so the Energy feature has a single import surface.
export {
  ASSESSMENT_OPTIONS,
  ASSESSMENT_WEIGHTS,
  ACTION_STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  READINESS_BANDS,
  readinessFor,
} from '../waste/waste.types';
export type {
  MaturityTone,
  MaturityBand,
  SegmentOptionLite,
  FieldDef,
  AssessmentQuestion,
  AssessmentGroup,
  ActionPriority,
  ActionItem,
  ReviewMilestone,
} from '../waste/waste.types';

import type { FieldDef, AssessmentGroup, ActionItem, ReviewMilestone } from '../waste/waste.types';

/** A system/area row used by the cost-allocation table (Bản đồ — Phần B). */
export interface AllocationSystem {
  id: string;
  label: string;
}

/** A pre-listed equipment row in the inventory calculator (Kiểm kê Thiết bị). */
export interface EquipmentRow {
  id: string;
  label: string;
}

/** A pre-listed solution row in the ROI finder (Cơ hội Tiết kiệm). */
export interface SavingsSolution {
  id: string;
  label: string;
  /** Mức đầu tư: Thấp / Trung bình / Cao. */
  invest: string;
}

export interface EnergyToolkitConfig {
  id: string;
  name: string;
  sector: string;
  /** Output unit for the monthly tracker (e.g. "suất ăn / lượt khách"). */
  outputLabel: string;
  /** Default electricity tariff (VNĐ/kWh) for the equipment inventory. */
  defaultRate: number;
  /** Systems for the energy-cost allocation table (Phần B). */
  allocationSystems: AllocationSystem[];
  /** 6 groups / 40 questions practice assessment. */
  assessmentGroups: AssessmentGroup[];
  /** Pre-listed equipment rows for the kWh calculator. */
  equipmentRows: EquipmentRow[];
  /** Pre-listed solutions for the ROI finder. */
  savingsSolutions: SavingsSolution[];
  /** Plan metadata fields. */
  planFields: FieldDef[];
  /** 9 suggested 90-day actions. */
  actions: ActionItem[];
  /** 30/60/90 review milestones. */
  reviewMilestones: ReviewMilestone[];
}
