export type PillarKey = 'environment' | 'social' | 'governance';

export interface ProfileField {
  label: string;
  hint?: string;
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

export interface MaturityLevel {
  label: string;
  /** Inclusive lower bound, as a percentage 0–100. */
  min: number;
}

/** Shared 3-band maturity scale derived from the Results Dashboard. */
export const MATURITY_LEVELS: MaturityLevel[] = [
  { label: 'Đã dẫn dắt', min: 70 },
  { label: 'Đang phát triển', min: 40 },
  { label: 'Giai đoạn đầu', min: 0 },
];

export function maturityFor(percent: number): string {
  const level =
    MATURITY_LEVELS.find((l) => percent >= l.min) ?? MATURITY_LEVELS[MATURITY_LEVELS.length - 1];
  return level.label;
}
