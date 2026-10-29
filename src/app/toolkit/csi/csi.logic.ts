// Logic thuần của toolkit CSI (không phụ thuộc Angular) — dịch từ công thức của file Excel nguồn
// (sheet "Kết quả sẵn sàng" + "Khoảng cách cần lấp"), tách riêng để unit test.
import {
  CsiLevel,
  CsiPart,
  CsiPriority,
  CsiQuestion,
  CsiQuestionGroup,
  CsiStatus,
  CsiToolkitConfig,
  priorityFor,
  statusOf,
} from './csi.types';

export interface FlatQuestion {
  q: CsiQuestion;
  part: CsiPart;
  group: CsiQuestionGroup;
}

export function flattenQuestions(config: CsiToolkitConfig): FlatQuestion[] {
  return config.parts.flatMap((part) =>
    part.groups.flatMap((group) => group.questions.map((q) => ({ q, part, group }))),
  );
}

/** Số liệu đếm việc bắt buộc (core) / nâng cao (advanced) của một lĩnh vực hoặc một nhóm. */
export interface Tally {
  /** Bắt buộc đã có = Đã có + Cần lưu ý. */
  have: number;
  /** Bắt buộc còn thiếu = Còn thiếu + Cần khắc phục. */
  missing: number;
  /** Trong đó cần khắc phục ngay. */
  fix: number;
  /** Tiến độ việc bắt buộc 0–1; null khi chưa có câu nào đủ dữ liệu. */
  progress: number | null;
  /** Nâng cao đã làm / tổng số nâng cao đã trả lời và áp dụng được. */
  advDone: number;
  advTotal: number;
  unanswered: number;
}

export interface AreaResult extends Tally {
  no: number;
  title: string;
  level: CsiLevel;
}

export interface GroupResult extends Tally {
  title: string;
  areaTitle: string;
}

export interface GapItem {
  q: CsiQuestion;
  part: CsiPart;
  group: CsiQuestionGroup;
  status: CsiStatus;
  priority: CsiPriority;
}

export interface Readiness {
  statuses: Map<string, CsiStatus>;
  areas: AreaResult[];
  groups: GroupResult[];
  overall: CsiLevel;
  unanswered: number;
  /** Tổng số việc bắt buộc còn thiếu (gồm cần khắc phục). */
  coreMissing: number;
  gaps: GapItem[];
  /** 10 việc bắt buộc nên làm trước: khắc phục ngay trước, rồi bắt buộc còn thiếu. */
  firstTasks: GapItem[];
}

function emptyTally(): Tally {
  return { have: 0, missing: 0, fix: 0, progress: null, advDone: 0, advTotal: 0, unanswered: 0 };
}

function add(t: Tally, kind: 'core' | 'advanced', status: CsiStatus): void {
  if (status === 'unanswered') t.unanswered++;
  const done = status === 'have' || status === 'attention';
  const gap = status === 'missing' || status === 'fix';
  if (kind === 'core') {
    if (done) t.have++;
    if (gap) t.missing++;
    if (status === 'fix') t.fix++;
  } else {
    if (done) t.advDone++;
    if (done || gap) t.advTotal++;
  }
}

function finish(t: Tally): void {
  const total = t.have + t.missing;
  t.progress = total === 0 ? null : t.have / total;
}

/** Mức một lĩnh vực: đủ toàn bộ việc bắt buộc → SẴN SÀNG; từ ngưỡng → GẦN SẴN SÀNG; còn lại CHƯA SẴN SÀNG. */
export function levelFor(t: Tally, threshold: number): CsiLevel {
  if (t.have + t.missing === 0) return 'nodata';
  if (t.missing === 0) return 'ready';
  return (t.progress ?? 0) >= threshold ? 'near' : 'not';
}

/** Mức chung = mức thấp nhất của 4 lĩnh vực. */
export function overallLevel(levels: CsiLevel[]): CsiLevel {
  if (levels.every((l) => l === 'nodata')) return 'nodata';
  if (levels.includes('not')) return 'not';
  if (levels.includes('near')) return 'near';
  if (levels.includes('nodata')) return 'partial';
  return 'ready';
}

export function computeReadiness(
  config: CsiToolkitConfig,
  answers: Record<string, string>,
  threshold: number,
): Readiness {
  const flat = flattenQuestions(config);
  const statuses = new Map<string, CsiStatus>();
  const areaTallies = config.parts.map(() => emptyTally());
  const groupMap = new Map<string, GroupResult>();
  const gaps: GapItem[] = [];

  for (const { q, part, group } of flat) {
    const status = statusOf(q, answers[q.num]);
    statuses.set(q.num, status);
    add(areaTallies[part.no - 1], q.kind, status);

    const gk = `${part.no}|${group.title}`;
    let g = groupMap.get(gk);
    if (!g) {
      g = { ...emptyTally(), title: group.title, areaTitle: config.areaTitles[part.no - 1] };
      groupMap.set(gk, g);
    }
    add(g, q.kind, status);
    gaps.push({ q, part, group, status, priority: priorityFor(q.kind, status) });
  }

  areaTallies.forEach(finish);
  groupMap.forEach(finish);
  const areas: AreaResult[] = areaTallies.map((t, i) => ({
    ...t,
    no: i + 1,
    title: config.areaTitles[i],
    level: levelFor(t, threshold),
  }));

  const fixFirst = gaps.filter((g) => g.priority === 'fix');
  const missingNext = gaps.filter((g) => g.priority === 'missing');

  return {
    statuses,
    areas,
    groups: [...groupMap.values()],
    overall: overallLevel(areas.map((a) => a.level)),
    unanswered: areas.reduce((n, a) => n + a.unanswered, 0),
    coreMissing: areas.reduce((n, a) => n + a.missing, 0),
    gaps,
    firstTasks: [...fixFirst, ...missingNext].slice(0, 10),
  };
}
