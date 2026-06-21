import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { getWasteToolkit } from './waste.data';
import { contractorVerdict, MaturityBand, readinessFor, WasteToolkitConfig } from './waste.types';

export const WEEKS = 4;
export const MONTHS = 12;

const STORAGE_PREFIX = 'doc:waste-toolkit:';
/** Fallback config used before the component calls `init()`. */
const DEFAULT_CONFIG = getWasteToolkit('waste-toolkit') as WasteToolkitConfig;

interface StreamRow {
  produce: string;
  volume: number | null;
  /** Per-stream estimated cost (VNĐ/tháng) — matches the source mapping table. */
  cost: number | null;
  method: string;
  collector: string;
  compliant: string;
  notes: string;
}
interface ActionRow {
  owner: string;
  start: string;
  target: string;
  status: string;
}
interface MilestoneRow {
  meetDate: string;
  note: string;
}
const EMPTY_MILESTONE: MilestoneRow = { meetDate: '', note: '' };

interface WasteState {
  /** Active toolkit config (set via init); not persisted. */
  config: WasteToolkitConfig;
  /** localStorage key for the active toolkit; null until init. Not persisted. */
  storageKey: string | null;
  mappingInfo: Record<string, string>;
  streams: Record<string, StreamRow>;
  assessment: Record<string, string>;
  assessmentPriority: Record<string, string>;
  contractorInfo: Record<string, string>;
  contractorScores: Record<string, string>;
  contractorChecklist: Record<string, boolean>;
  foodCostPerKg: number | null;
  foodLog: Record<string, (number | null)[]>;
  /** Monthly totals (length 12) — direct entry, like the source monthly tab. */
  dashMonthlyVol: (number | null)[];
  dashMonthlyCost: (number | null)[];
  planInfo: Record<string, string>;
  actions: Record<string, ActionRow>;
  milestones: Record<string, MilestoneRow>;
  currentStep: number;
}

const initialState: WasteState = {
  config: DEFAULT_CONFIG,
  storageKey: null,
  mappingInfo: {},
  streams: {},
  assessment: {},
  assessmentPriority: {},
  contractorInfo: {},
  contractorScores: {},
  contractorChecklist: {},
  foodCostPerKg: null,
  foodLog: {},
  dashMonthlyVol: [],
  dashMonthlyCost: [],
  planInfo: {},
  actions: {},
  milestones: {},
  currentStep: 0,
};

const EMPTY_ROW: StreamRow = {
  produce: '',
  volume: null,
  cost: null,
  method: '',
  collector: '',
  compliant: '',
  notes: '',
};
const EMPTY_ACTION: ActionRow = { owner: '', start: '', target: '', status: '' };

function loadPersisted(key: string): Partial<WasteState> | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<WasteState>) : null;
  } catch {
    return null;
  }
}
function savePersisted(key: string, state: Omit<WasteState, 'config' | 'storageKey'>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // ignore
  }
}
function setCell(arr: (number | null)[] | undefined, idx: number, val: number | null, len: number) {
  const a = arr ? [...arr] : Array<number | null>(len).fill(null);
  a[idx] = val;
  return a;
}
function sumArr(arr: (number | null)[] | undefined): number {
  return (arr ?? []).reduce<number>((a, b) => a + (b ?? 0), 0);
}

export interface AssessmentResult {
  id: string;
  topic: string;
  full: number;
  partial: number;
  none: number;
  na: number;
  answered: number;
  percent: number;
  band: MaturityBand;
}

export const WasteStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    assessmentResults: computed<AssessmentResult[]>(() => {
      const a = store.assessment();
      return store.config().assessmentGroups.map((g) => {
        let full = 0,
          partial = 0,
          none = 0,
          na = 0;
        for (const q of g.questions) {
          const v = a[q.id];
          if (v === 'full') full++;
          else if (v === 'partial') partial++;
          else if (v === 'none') none++;
          else if (v === 'na') na++;
        }
        const answered = full + partial + none;
        const percent =
          answered > 0 ? Math.round(((full * 1 + partial * 0.5) / answered) * 100) : 0;
        return {
          id: g.id,
          topic: g.topic,
          full,
          partial,
          none,
          na,
          answered,
          percent,
          band: readinessFor(percent),
        };
      });
    }),

    // Total mapping cost = sum of per-stream cost (VNĐ/tháng), matching the source table.
    mappingCostMonthly: computed(() =>
      Object.values(store.streams()).reduce((sum, r) => sum + (r.cost ?? 0), 0),
    ),
    mappingCostAnnual: computed(
      () => Object.values(store.streams()).reduce((sum, r) => sum + (r.cost ?? 0), 0) * 12,
    ),

    // Weighted total on 0–100, like the source: điểm(0–5)/5 × trọng số(%), cộng dồn.
    contractorTotal: computed(() => {
      const s = store.contractorScores();
      return store.config().contractorCriteria.reduce((sum, c) => {
        const v = Number(s[c.id]);
        return sum + (v ? (v / 5) * c.weight : 0);
      }, 0);
    }),

    foodResults: computed(() => {
      // Like the source tracker: TỔNG (kg/tháng) = tổng 4 tuần; chi phí/tháng = tổng × đơn giá;
      // ước tính/năm = chi phí/tháng × 12.
      const log = store.foodLog();
      const cost = store.foodCostPerKg() ?? 0;
      const rows = store.config().foodSources.map((src) => {
        const total = sumArr(log[src.id]);
        return { id: src.id, label: src.label, total, monthlyCost: total * cost };
      });
      const totalMonthly = rows.reduce((a, r) => a + r.total, 0);
      const monthlyCost = totalMonthly * cost;
      return { rows, totalMonthly, monthlyCost, annualCost: monthlyCost * 12 };
    }),

    // 📊 Theo dõi Hàng tháng — direct monthly totals (no category breakdown), like the source tab.
    dashRows: computed(() => {
      const vols = store.dashMonthlyVol();
      const costs = store.dashMonthlyCost();
      let prev: number | null = null;
      return Array.from({ length: MONTHS }, (_, m) => {
        const vol = vols[m] ?? null;
        const cost = costs[m] ?? null;
        const costPerKg = vol && vol > 0 ? (cost ?? 0) / vol : 0;
        const volChange =
          prev != null && prev > 0 && vol != null ? ((vol - prev) / prev) * 100 : null;
        if (vol != null) prev = vol;
        return { index: m, vol, cost, costPerKg, volChange };
      });
    }),

    dashTotals: computed(() => {
      const totalVol = sumArr(store.dashMonthlyVol());
      const totalCost = sumArr(store.dashMonthlyCost());
      return { totalVol, totalCost, costPerKg: totalVol > 0 ? totalCost / totalVol : 0 };
    }),
  })),

  withComputed((store) => ({
    assessmentOverall: computed(() => {
      const results = store.assessmentResults();
      const full = results.reduce((a, r) => a + r.full, 0);
      const partial = results.reduce((a, r) => a + r.partial, 0);
      const answered = results.reduce((a, r) => a + r.answered, 0);
      return answered > 0 ? Math.round(((full * 1 + partial * 0.5) / answered) * 100) : 0;
    }),
    // Tổng số mục theo từng mức (✓/△/✗/N/A) trên toàn bộ đánh giá — như dòng tổng hợp của file.
    assessmentTotals: computed(() => {
      const r = store.assessmentResults();
      return {
        full: r.reduce((a, x) => a + x.full, 0),
        partial: r.reduce((a, x) => a + x.partial, 0),
        none: r.reduce((a, x) => a + x.none, 0),
        na: r.reduce((a, x) => a + x.na, 0),
      };
    }),
    contractorVerdictBand: computed(() => contractorVerdict(store.contractorTotal())),
  })),

  withComputed((store) => ({
    assessmentOverallBand: computed(() => readinessFor(store.assessmentOverall())),
  })),

  withMethods((store) => ({
    setMappingInfo(key: string, value: string) {
      patchState(store, (s) => ({ mappingInfo: { ...s.mappingInfo, [key]: value } }));
    },
    setStreamField(id: string, field: keyof StreamRow, value: string | number | null) {
      patchState(store, (s) => ({
        streams: { ...s.streams, [id]: { ...(s.streams[id] ?? EMPTY_ROW), [field]: value } },
      }));
    },
    setAssessment(id: string, value: string) {
      patchState(store, (s) => ({ assessment: { ...s.assessment, [id]: value } }));
    },
    setAssessmentPriority(id: string, value: string) {
      patchState(store, (s) => ({ assessmentPriority: { ...s.assessmentPriority, [id]: value } }));
    },
    setContractorInfo(key: string, value: string) {
      patchState(store, (s) => ({ contractorInfo: { ...s.contractorInfo, [key]: value } }));
    },
    setContractorScore(id: string, value: string) {
      patchState(store, (s) => ({ contractorScores: { ...s.contractorScores, [id]: value } }));
    },
    toggleContractorCheck(id: string, checked: boolean) {
      patchState(store, (s) => ({
        contractorChecklist: { ...s.contractorChecklist, [id]: checked },
      }));
    },
    setFoodCost(value: number | null) {
      patchState(store, { foodCostPerKg: value });
    },
    setFoodLog(id: string, week: number, value: number | null) {
      patchState(store, (s) => ({
        foodLog: { ...s.foodLog, [id]: setCell(s.foodLog[id], week, value, WEEKS) },
      }));
    },
    setDashVol(month: number, value: number | null) {
      patchState(store, (s) => ({
        dashMonthlyVol: setCell(s.dashMonthlyVol, month, value, MONTHS),
      }));
    },
    setDashCost(month: number, value: number | null) {
      patchState(store, (s) => ({
        dashMonthlyCost: setCell(s.dashMonthlyCost, month, value, MONTHS),
      }));
    },
    setPlanInfo(key: string, value: string) {
      patchState(store, (s) => ({ planInfo: { ...s.planInfo, [key]: value } }));
    },
    setAction(id: string, field: keyof ActionRow, value: string) {
      patchState(store, (s) => ({
        actions: { ...s.actions, [id]: { ...(s.actions[id] ?? EMPTY_ACTION), [field]: value } },
      }));
    },
    setMilestone(id: string, field: keyof MilestoneRow, value: string) {
      patchState(store, (s) => ({
        milestones: {
          ...s.milestones,
          [id]: { ...(s.milestones[id] ?? EMPTY_MILESTONE), [field]: value },
        },
      }));
    },

    // ── getters ──
    mappingInfoOf: (key: string) => store.mappingInfo()[key] ?? '',
    streamField: (id: string, field: keyof StreamRow) =>
      store.streams()[id]?.[field] ?? (field === 'volume' || field === 'cost' ? null : ''),
    assessmentOf: (id: string) => store.assessment()[id] ?? '',
    assessmentPriorityOf: (id: string) => store.assessmentPriority()[id] ?? '',
    contractorInfoOf: (key: string) => store.contractorInfo()[key] ?? '',
    contractorScoreOf: (id: string) => store.contractorScores()[id] ?? '',
    contractorCheckOf: (id: string) => store.contractorChecklist()[id] ?? false,
    foodLogOf: (id: string, week: number) => store.foodLog()[id]?.[week] ?? null,
    dashVolOf: (month: number) => store.dashMonthlyVol()[month] ?? null,
    dashCostOf: (month: number) => store.dashMonthlyCost()[month] ?? null,
    planInfoOf: (key: string) => store.planInfo()[key] ?? '',
    actionOf: (id: string, field: keyof ActionRow) => store.actions()[id]?.[field] ?? '',
    milestoneOf: (id: string, field: keyof MilestoneRow) => store.milestones()[id]?.[field] ?? '',

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
    init(config: WasteToolkitConfig) {
      if (store.storageKey()) return; // already initialised
      const key = STORAGE_PREFIX + config.id;
      const saved = loadPersisted(key);
      patchState(store, { ...(saved ?? {}), config, storageKey: key });
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
          mappingInfo: store.mappingInfo(),
          streams: store.streams(),
          assessment: store.assessment(),
          assessmentPriority: store.assessmentPriority(),
          contractorInfo: store.contractorInfo(),
          contractorScores: store.contractorScores(),
          contractorChecklist: store.contractorChecklist(),
          foodCostPerKg: store.foodCostPerKg(),
          foodLog: store.foodLog(),
          dashMonthlyVol: store.dashMonthlyVol(),
          dashMonthlyCost: store.dashMonthlyCost(),
          planInfo: store.planInfo(),
          actions: store.actions(),
          milestones: store.milestones(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
