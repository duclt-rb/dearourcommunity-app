export type PillarKey = 'environment' | 'social' | 'governance';

export type ProfileFieldType = 'text' | 'date' | 'boolean';

export interface ProfileField {
  label: string;
  hint?: string;
  /** Control to render; defaults to 'text'. */
  type?: ProfileFieldType;
}

export interface ScanQuestion {
  /** Unique within a config; used as the scoring state key. */
  id: string;
  text: string;
  /** "Business risk if not done" — shown as supporting context. */
  risk: string;
}

export interface TopicGroup {
  topic: string;
  priority?: boolean;
  questions: ScanQuestion[];
}

export interface PillarSection {
  key: PillarKey;
  /** Short label, e.g. "Môi trường". */
  label: string;
  /** Full sheet title, e.g. "Environment — Service & F&B SMEs". */
  title: string;
  maxScore: number;
  groups: TopicGroup[];
}

export interface PriorityFocus {
  area: string;
  pillar: string;
  benefit: string;
}

/** Editable columns of the 3–6 month action plan, one row per priority area. */
export type ActionPlanField = 'action' | 'owner' | 'deadline' | 'status';
export type ActionPlanRow = Partial<Record<ActionPlanField, string>>;

export interface QuickScanConfig {
  id: string;
  /** Tool name shown in the header. */
  name: string;
  /** Sector tagline, e.g. "Service & F&B SMEs". */
  sector: string;
  profileFields: ProfileField[];
  pillars: PillarSection[];
  priorityFocus: PriorityFocus[];
}

export type MaturityTone = 'error' | 'warning' | 'success';

export interface MaturityLevel {
  label: string;
  /** Inclusive lower bound, as a percentage 0–100. */
  min: number;
  tone: MaturityTone;
}

/**
 * Maturity scale from the Results Dashboard formula:
 * < 40% → Early Stage, < 70% → Developing, else Established.
 */
export const MATURITY_LEVELS: MaturityLevel[] = [
  { label: 'Đã thiết lập', min: 70, tone: 'success' },
  { label: 'Đang phát triển', min: 40, tone: 'warning' },
  { label: 'Giai đoạn đầu', min: 0, tone: 'error' },
];

export function maturityLevelFor(percent: number): MaturityLevel {
  return (
    MATURITY_LEVELS.find((l) => percent >= l.min) ?? MATURITY_LEVELS[MATURITY_LEVELS.length - 1]
  );
}

export function maturityFor(percent: number): string {
  return maturityLevelFor(percent).label;
}
