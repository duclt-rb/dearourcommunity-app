import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { getCsiToolkit } from './csi.data';
import {
  CsiAnswer,
  CsiIndicator,
  CsiLevel,
  CsiPriority,
  CsiSectionId,
  CsiToolkitConfig,
  priorityFor,
} from './csi.types';
import { TOOLKIT_PERSIST_VERSION } from '../shared/persist-migration';

const STORAGE_PREFIX = 'doc:csi-toolkit:';
/** Fallback config used before the component calls `init()`. */
const DEFAULT_CONFIG = getCsiToolkit('csi-2026-sme') as CsiToolkitConfig;

/** Ô nhập của bảng số liệu 3 năm (hồ sơ DN + chỉ số I). */
export interface YearRow {
  y2023: string;
  y2024: string;
  y2025: string;
  note: string;
}
export interface ViolationRow {
  violated: string;
  fixed: string;
  agency: string;
  evidence: string;
}
/** Cột nhập tay theo từng chỉ số (sheet 4–7). */
export interface IndicatorMeta {
  note: string;
  owner: string;
  deadline: string;
}
/** Hai cột nhập tay cuối của sheet Kế hoạch hành động. */
export interface PlanRow {
  status: string;
  progress: string;
}
const EMPTY_YEAR: YearRow = { y2023: '', y2024: '', y2025: '', note: '' };
const EMPTY_VIOLATION: ViolationRow = { violated: '', fixed: '', agency: '', evidence: '' };
const EMPTY_META: IndicatorMeta = { note: '', owner: '', deadline: '' };
const EMPTY_PLAN: PlanRow = { status: '', progress: '' };

interface CsiState {
  /** Active toolkit config (set via init); not persisted. */
  config: CsiToolkitConfig;
  /** localStorage key for the active toolkit; null until init. Not persisted. */
  storageKey: string | null;
  // ── Hồ sơ doanh nghiệp ──
  general: Record<string, string>;
  profileYears: Record<string, YearRow>;
  standards: Record<string, string>;
  violations: Record<string, ViolationRow>;
  /** Tự đánh giá Mục A: rowId → 'yes' | 'no'. */
  sectionA: Record<string, string>;
  // ── Chỉ số I / G / E / L&S (khoá = mã chỉ số) ──
  answers: Record<string, CsiAnswer>;
  indicatorYears: Record<string, YearRow>;
  meta: Record<string, IndicatorMeta>;
  // ── Kế hoạch hành động ──
  plan: Record<string, PlanRow>;
  currentStep: number;
}

const initialState: CsiState = {
  config: DEFAULT_CONFIG,
  storageKey: null,
  general: {},
  profileYears: {},
  standards: {},
  violations: {},
  sectionA: {},
  answers: {},
  indicatorYears: {},
  meta: {},
  plan: {},
  currentStep: 0,
};

/** Persisted slice of the toolkit, keyed per toolkit id in localStorage. */
interface PersistedCsi extends Partial<Omit<CsiState, 'config' | 'storageKey'>> {
  /** Toolkit mới ra đời sau i18n → khởi đầu ở V2, không có dữ liệu V1 cần migrate. */
  version?: number;
}

function loadPersisted(config: CsiToolkitConfig): PersistedCsi | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + config.id);
    return raw ? (JSON.parse(raw) as PersistedCsi) : null;
  } catch {
    return null;
  }
}
function savePersisted(key: string, state: PersistedCsi): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify({ ...state, version: TOOLKIT_PERSIST_VERSION }));
  } catch {
    // ignore
  }
}

/** Một dòng tổng hợp điểm: điểm khả dụng loại chỉ số N/A khỏi cả tử số và mẫu số. */
export interface ScoreTotals {
  /** Tổng điểm các chỉ số thành phần. */
  component: number;
  /** Điểm khả dụng (sau khi loại chỉ số không áp dụng). */
  available: number;
  /** Điểm tự đánh giá. */
  self: number;
  /** Tỷ lệ sẵn sàng 0–1. */
  rate: number;
}

export interface GroupResult extends ScoreTotals {
  id: string;
  title: string;
  sectionId: CsiSectionId;
  shortLabel: string;
}

export interface PartResult extends ScoreTotals {
  id: string;
  label: string;
  /** Điểm tối đa CSI công bố. */
  published: number;
  /** Điểm quy đổi thang CSI = tỷ lệ sẵn sàng × điểm công bố. */
  converted: number;
}

export interface PlanItem {
  indicator: CsiIndicator;
  sectionId: CsiSectionId;
  shortLabel: string;
  groupTitle: string;
  answer: CsiAnswer | '';
  priority: CsiPriority;
  /** Điểm còn thiếu = điểm khả dụng − điểm tự đánh giá. */
  missing: number;
}

function scoreOf(indicator: CsiIndicator, answer: CsiAnswer | undefined) {
  if (answer === 'na') return { available: 0, self: 0 };
  return { available: indicator.maxScore, self: answer === 'yes' ? indicator.maxScore : 0 };
}

function totals(component: number, available: number, self: number): ScoreTotals {
  return { component, available, self, rate: available > 0 ? self / available : 0 };
}

export const CsiStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    groupResults: computed<GroupResult[]>(() => {
      const answers = store.answers();
      return store.config().sections.flatMap((section) =>
        section.groups.map((group) => {
          let component = 0,
            available = 0,
            self = 0;
          for (const block of group.blocks) {
            for (const ind of block.indicators) {
              const s = scoreOf(ind, answers[ind.id]);
              component += ind.maxScore;
              available += s.available;
              self += s.self;
            }
          }
          return {
            id: group.id,
            title: group.title,
            sectionId: section.id,
            shortLabel: section.shortLabel,
            ...totals(component, available, self),
          };
        }),
      );
    }),

    planItems: computed<PlanItem[]>(() => {
      const answers = store.answers();
      return store.config().sections.flatMap((section) =>
        section.groups.flatMap((group) =>
          group.blocks.flatMap((block) =>
            block.indicators.map((indicator) => {
              const answer = answers[indicator.id] ?? '';
              const s = scoreOf(indicator, answers[indicator.id]);
              return {
                indicator,
                sectionId: section.id,
                shortLabel: section.shortLabel,
                groupTitle: group.title,
                answer,
                priority: priorityFor(indicator.level, answer),
                missing: s.available - s.self,
              };
            }),
          ),
        ),
      );
    }),
  })),

  withComputed((store) => ({
    /** Dòng Phần I–II (Mục A) + 4 phần chỉ số, theo thứ tự Bảng điểm tổng hợp. */
    partResults: computed<PartResult[]>(() => {
      const config = store.config();
      const sectionA = store.sectionA();
      const partA = config.profile.sectionA.rows.map((row, i) => {
        const self = sectionA[row.id] === 'yes' ? row.maxScore : 0;
        const t = totals(row.maxScore, row.maxScore, self);
        return {
          id: row.id,
          label: config.dashboard.partARows[i],
          published: row.maxScore,
          ...t,
          converted: t.rate * row.maxScore,
        };
      });
      const groups = store.groupResults();
      const sections = config.sections.map((section) => {
        const own = groups.filter((g) => g.sectionId === section.id);
        const t = totals(
          own.reduce((a, g) => a + g.component, 0),
          own.reduce((a, g) => a + g.available, 0),
          own.reduce((a, g) => a + g.self, 0),
        );
        return {
          id: section.id,
          label: section.dashboardLabel,
          published: section.publishedMax,
          ...t,
          converted: t.rate * section.publishedMax,
        };
      });
      return [...partA, ...sections];
    }),

    /** Tình trạng tuân thủ — 7 chỉ tiêu theo đúng thứ tự file. */
    compliance: computed<number[]>(() => {
      const items = store.planItems();
      const count = (level: CsiLevel, fn: (p: PlanItem) => boolean) =>
        items.filter((p) => p.indicator.level === level && fn(p)).length;
      return [
        count('C', () => true),
        count('C', (p) => p.answer === 'yes'),
        count('C', (p) => p.priority === 'high'),
        count('C', (p) => p.answer === 'na'),
        count('A', () => true),
        count('A', (p) => p.answer === 'yes'),
        items.filter((p) => p.answer === '').length,
      ];
    }),
  })),

  withComputed((store) => ({
    grandTotal: computed<PartResult>(() => {
      const parts = store.partResults();
      const sum = (fn: (p: PartResult) => number) => parts.reduce((a, p) => a + fn(p), 0);
      return {
        id: 'total',
        label: store.config().dashboard.totalLabel,
        published: sum((p) => p.published),
        ...totals(
          sum((p) => p.component),
          sum((p) => p.available),
          sum((p) => p.self),
        ),
        converted: sum((p) => p.converted),
      };
    }),
  })),

  withMethods((store) => ({
    // ── Hồ sơ doanh nghiệp ──
    setGeneral(id: string, value: string) {
      patchState(store, (s) => ({ general: { ...s.general, [id]: value } }));
    },
    setProfileYear(id: string, field: keyof YearRow, value: string) {
      patchState(store, (s) => ({
        profileYears: {
          ...s.profileYears,
          [id]: { ...(s.profileYears[id] ?? EMPTY_YEAR), [field]: value },
        },
      }));
    },
    setStandard(id: string, value: string) {
      patchState(store, (s) => ({ standards: { ...s.standards, [id]: value } }));
    },
    setViolation(id: string, field: keyof ViolationRow, value: string) {
      patchState(store, (s) => ({
        violations: {
          ...s.violations,
          [id]: { ...(s.violations[id] ?? EMPTY_VIOLATION), [field]: value },
        },
      }));
    },
    setSectionA(id: string, value: string) {
      patchState(store, (s) => ({ sectionA: { ...s.sectionA, [id]: value } }));
    },

    // ── Chỉ số ──
    setAnswer(id: string, value: string) {
      patchState(store, (s) => ({ answers: { ...s.answers, [id]: value as CsiAnswer } }));
    },
    setIndicatorYear(id: string, field: keyof YearRow, value: string) {
      patchState(store, (s) => ({
        indicatorYears: {
          ...s.indicatorYears,
          [id]: { ...(s.indicatorYears[id] ?? EMPTY_YEAR), [field]: value },
        },
      }));
    },
    setMeta(id: string, field: keyof IndicatorMeta, value: string) {
      patchState(store, (s) => ({
        meta: { ...s.meta, [id]: { ...(s.meta[id] ?? EMPTY_META), [field]: value } },
      }));
    },
    setPlan(id: string, field: keyof PlanRow, value: string) {
      patchState(store, (s) => ({
        plan: { ...s.plan, [id]: { ...(s.plan[id] ?? EMPTY_PLAN), [field]: value } },
      }));
    },

    // ── getters ──
    generalOf: (id: string) => store.general()[id] ?? '',
    profileYearOf: (id: string, field: keyof YearRow) => store.profileYears()[id]?.[field] ?? '',
    standardOf: (id: string) => store.standards()[id] ?? '',
    violationOf: (id: string, field: keyof ViolationRow) => store.violations()[id]?.[field] ?? '',
    sectionAOf: (id: string) => store.sectionA()[id] ?? '',
    answerOf: (id: string) => store.answers()[id] ?? '',
    indicatorYearOf: (id: string, field: keyof YearRow) =>
      store.indicatorYears()[id]?.[field] ?? '',
    metaOf: (id: string, field: keyof IndicatorMeta) => store.meta()[id]?.[field] ?? '',
    planOf: (id: string, field: keyof PlanRow) => store.plan()[id]?.[field] ?? '',

    // ── stepper ──
    goToStep(index: number, total: number) {
      const clamped = Math.max(0, Math.min(total - 1, index));
      patchState(store, { currentStep: clamped });
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    /**
     * Bind the store to a toolkit config and rehydrate its persisted state.
     * Each toolkit variant persists under its own key so they don't collide.
     */
    init(config: CsiToolkitConfig) {
      if (store.storageKey()) return; // already initialised
      const saved = loadPersisted(config);
      patchState(store, {
        config,
        storageKey: STORAGE_PREFIX + config.id,
        general: saved?.general ?? {},
        profileYears: saved?.profileYears ?? {},
        standards: saved?.standards ?? {},
        violations: saved?.violations ?? {},
        sectionA: saved?.sectionA ?? {},
        answers: saved?.answers ?? {},
        indicatorYears: saved?.indicatorYears ?? {},
        meta: saved?.meta ?? {},
        plan: saved?.plan ?? {},
        currentStep: saved?.currentStep ?? 0,
      });
    },
    reset() {
      const key = store.storageKey();
      if (key && typeof localStorage !== 'undefined') {
        try {
          localStorage.removeItem(key);
        } catch {
          // ignore
        }
      }
      patchState(store, { ...initialState, config: store.config(), storageKey: key });
    },
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        const key = store.storageKey();
        if (!key) return; // not initialised yet — nothing to persist
        savePersisted(key, {
          general: store.general(),
          profileYears: store.profileYears(),
          standards: store.standards(),
          violations: store.violations(),
          sectionA: store.sectionA(),
          answers: store.answers(),
          indicatorYears: store.indicatorYears(),
          meta: store.meta(),
          plan: store.plan(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
