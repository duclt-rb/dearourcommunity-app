import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { WASTE_TOOLKIT } from './waste.data';
import { contractorVerdict, MaturityBand, readinessFor } from './waste.types';

export const WEEKS = 6;
export const MONTHS = 12;

const STORAGE_KEY = 'doc:waste-toolkit';

interface StreamRow {
  produce: string;
  volume: number | null;
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

interface WasteState {
  mappingInfo: Record<string, string>;
  streams: Record<string, StreamRow>;
  mappingCosts: Record<string, number | null>;
  assessment: Record<string, string>;
  assessmentPriority: Record<string, string>;
  contractorInfo: Record<string, string>;
  contractorScores: Record<string, string>;
  foodCostPerKg: number | null;
  foodLog: Record<string, (number | null)[]>;
  dashVolumes: Record<string, (number | null)[]>;
  dashCosts: Record<string, (number | null)[]>;
  planInfo: Record<string, string>;
  actions: Record<string, ActionRow>;
  currentStep: number;
}

const initialState: WasteState = {
  mappingInfo: {},
  streams: {},
  mappingCosts: {},
  assessment: {},
  assessmentPriority: {},
  contractorInfo: {},
  contractorScores: {},
  foodCostPerKg: null,
  foodLog: {},
  dashVolumes: {},
  dashCosts: {},
  planInfo: {},
  actions: {},
  currentStep: 0,
};

const EMPTY_ROW: StreamRow = {
  produce: '',
  volume: null,
  method: '',
  collector: '',
  compliant: '',
  notes: '',
};
const EMPTY_ACTION: ActionRow = { owner: '', start: '', target: '', status: '' };

function loadPersisted(): Partial<WasteState> | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<WasteState>) : null;
  } catch {
    return null;
  }
}
function savePersisted(state: WasteState): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      return WASTE_TOOLKIT.assessmentGroups.map((g) => {
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

    mappingCostMonthly: computed(() => {
      const costs = store.mappingCosts();
      return WASTE_TOOLKIT.mappingCostItems.reduce((sum, i) => sum + (costs[i.id] ?? 0), 0);
    }),
    mappingCostAnnual: computed(() => {
      const costs = store.mappingCosts();
      return WASTE_TOOLKIT.mappingCostItems.reduce((sum, i) => sum + (costs[i.id] ?? 0), 0) * 12;
    }),

    contractorTotal: computed(() => {
      const s = store.contractorScores();
      return WASTE_TOOLKIT.contractorCriteria.reduce((sum, c) => {
        const v = Number(s[c.id]);
        return sum + (v ? (v * c.weight) / 100 : 0);
      }, 0);
    }),

    foodResults: computed(() => {
      const log = store.foodLog();
      const cost = store.foodCostPerKg() ?? 0;
      const rows = WASTE_TOOLKIT.foodSources.map((src) => {
        const weeks = (log[src.id] ?? []).filter((v): v is number => v != null);
        const avg = weeks.length ? weeks.reduce((a, b) => a + b, 0) / weeks.length : 0;
        return { id: src.id, label: src.label, avg, weeklyCost: avg * cost };
      });
      const totalAvg = rows.reduce((a, r) => a + r.avg, 0);
      const weeklyCost = totalAvg * cost;
      return { rows, totalAvg, weeklyCost, annualCost: weeklyCost * 52 };
    }),

    dashResults: computed(() => {
      const vols = store.dashVolumes();
      const costs = store.dashCosts();
      const volRows = WASTE_TOOLKIT.dashboardVolumeCategories.map((c) => ({
        ...c,
        total: sumArr(vols[c.id]),
      }));
      const costRows = WASTE_TOOLKIT.dashboardCostCategories.map((c) => ({
        ...c,
        total: sumArr(costs[c.id]),
      }));
      const totalVol = volRows.reduce((a, r) => a + r.total, 0);
      const totalCost = costRows.reduce((a, r) => a + r.total, 0);
      return {
        volRows,
        costRows,
        totalVol,
        totalCost,
        costPerKg: totalVol > 0 ? totalCost / totalVol : 0,
      };
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
    setMappingCost(id: string, value: number | null) {
      patchState(store, (s) => ({ mappingCosts: { ...s.mappingCosts, [id]: value } }));
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
    setFoodCost(value: number | null) {
      patchState(store, { foodCostPerKg: value });
    },
    setFoodLog(id: string, week: number, value: number | null) {
      patchState(store, (s) => ({
        foodLog: { ...s.foodLog, [id]: setCell(s.foodLog[id], week, value, WEEKS) },
      }));
    },
    setDashVolume(id: string, month: number, value: number | null) {
      patchState(store, (s) => ({
        dashVolumes: { ...s.dashVolumes, [id]: setCell(s.dashVolumes[id], month, value, MONTHS) },
      }));
    },
    setDashCost(id: string, month: number, value: number | null) {
      patchState(store, (s) => ({
        dashCosts: { ...s.dashCosts, [id]: setCell(s.dashCosts[id], month, value, MONTHS) },
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

    // ── getters ──
    mappingInfoOf: (key: string) => store.mappingInfo()[key] ?? '',
    streamField: (id: string, field: keyof StreamRow) =>
      store.streams()[id]?.[field] ?? (field === 'volume' ? null : ''),
    mappingCostOf: (id: string) => store.mappingCosts()[id] ?? null,
    assessmentOf: (id: string) => store.assessment()[id] ?? '',
    assessmentPriorityOf: (id: string) => store.assessmentPriority()[id] ?? '',
    contractorInfoOf: (key: string) => store.contractorInfo()[key] ?? '',
    contractorScoreOf: (id: string) => store.contractorScores()[id] ?? '',
    foodLogOf: (id: string, week: number) => store.foodLog()[id]?.[week] ?? null,
    dashVolumeOf: (id: string, month: number) => store.dashVolumes()[id]?.[month] ?? null,
    dashCostOf: (id: string, month: number) => store.dashCosts()[id]?.[month] ?? null,
    planInfoOf: (key: string) => store.planInfo()[key] ?? '',
    actionOf: (id: string, field: keyof ActionRow) => store.actions()[id]?.[field] ?? '',

    // ── stepper ──
    goToStep(index: number, total: number) {
      const clamped = Math.max(0, Math.min(total - 1, index));
      patchState(store, { currentStep: clamped });
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    reset() {
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      }
      patchState(store, { ...initialState });
    },
  })),

  withHooks({
    onInit(store) {
      const saved = loadPersisted();
      if (saved) patchState(store, saved);
      effect(() => {
        savePersisted({
          mappingInfo: store.mappingInfo(),
          streams: store.streams(),
          mappingCosts: store.mappingCosts(),
          assessment: store.assessment(),
          assessmentPriority: store.assessmentPriority(),
          contractorInfo: store.contractorInfo(),
          contractorScores: store.contractorScores(),
          foodCostPerKg: store.foodCostPerKg(),
          foodLog: store.foodLog(),
          dashVolumes: store.dashVolumes(),
          dashCosts: store.dashCosts(),
          planInfo: store.planInfo(),
          actions: store.actions(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
