import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { getEnergyToolkit } from './energy.data';
import { EnergyToolkitConfig, MaturityBand, readinessFor } from './energy.types';

export const MONTHS = 12;

const STORAGE_PREFIX = 'doc:energy-toolkit:';
/** Fallback config used before the component calls `init()`. */
const DEFAULT_CONFIG = getEnergyToolkit('energy-toolkit-fnb') as EnergyToolkitConfig;

/** Numeric inputs for one equipment inventory row. */
interface EquipmentInput {
  qty: number | null;
  kw: number | null;
  hours: number | null;
  days: number | null;
}
const EMPTY_EQUIP: EquipmentInput = { qty: null, kw: null, hours: null, days: null };

/** Numeric inputs for one ROI solution row. */
interface SavingsInput {
  invest: number | null;
  saving: number | null;
}
const EMPTY_SAVING: SavingsInput = { invest: null, saving: null };

interface ActionRow {
  owner: string;
  start: string;
  status: string;
}
const EMPTY_ACTION: ActionRow = { owner: '', start: '', status: '' };

interface MilestoneRow {
  meetDate: string;
  note: string;
}
const EMPTY_MILESTONE: MilestoneRow = { meetDate: '', note: '' };

interface EnergyState {
  /** Active toolkit config (set via init); not persisted. */
  config: EnergyToolkitConfig;
  /** localStorage key for the active toolkit; null until init. Not persisted. */
  storageKey: string | null;
  // ── Bản đồ Năng lượng (Phần A: 12-month electricity & water) ──
  mapKwh: (number | null)[];
  mapElecCost: (number | null)[];
  mapWater: (number | null)[];
  mapWaterCost: (number | null)[];
  // ── Bản đồ Năng lượng (Phần B: cost allocation %) ──
  allocation: Record<string, number | null>;
  // ── Đánh giá Thực hành ──
  assessment: Record<string, string>;
  assessmentPriority: Record<string, string>;
  // ── Kiểm kê Thiết bị ──
  /** Electricity tariff (VNĐ/kWh); null falls back to config.defaultRate. */
  rate: number | null;
  equipment: Record<string, EquipmentInput>;
  // ── Cơ hội Tiết kiệm (ROI) ──
  savings: Record<string, SavingsInput>;
  // ── Theo dõi Hàng tháng (12 months) ──
  trackKwh: (number | null)[];
  trackCost: (number | null)[];
  trackOutput: (number | null)[];
  // ── Kế hoạch 90 ngày ──
  planInfo: Record<string, string>;
  actions: Record<string, ActionRow>;
  milestones: Record<string, MilestoneRow>;
  currentStep: number;
}

const initialState: EnergyState = {
  config: DEFAULT_CONFIG,
  storageKey: null,
  mapKwh: [],
  mapElecCost: [],
  mapWater: [],
  mapWaterCost: [],
  allocation: {},
  assessment: {},
  assessmentPriority: {},
  rate: null,
  equipment: {},
  savings: {},
  trackKwh: [],
  trackCost: [],
  trackOutput: [],
  planInfo: {},
  actions: {},
  milestones: {},
  currentStep: 0,
};

function loadPersisted(key: string): Partial<EnergyState> | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<EnergyState>) : null;
  } catch {
    return null;
  }
}
function savePersisted(key: string, state: Omit<EnergyState, 'config' | 'storageKey'>): void {
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

export const EnergyStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    // ── Bản đồ — Phần A: annual totals & average tariff ──
    mapTotals: computed(() => {
      const annualKwh = sumArr(store.mapKwh());
      const annualElecCost = sumArr(store.mapElecCost());
      const annualWater = sumArr(store.mapWater());
      const annualWaterCost = sumArr(store.mapWaterCost());
      return {
        annualKwh,
        annualElecCost,
        annualWater,
        annualWaterCost,
        avgPricePerKwh: annualKwh > 0 ? annualElecCost / annualKwh : 0,
        avgMonthlyCost: annualElecCost / MONTHS,
      };
    }),

    // ── Đánh giá Thực hành — per group ──
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

    // ── Kiểm kê Thiết bị — kWh & cost per row ──
    equipmentRows: computed(() => {
      const data = store.equipment();
      const rate = store.rate() ?? store.config().defaultRate;
      const rows = store.config().equipmentRows.map((e) => {
        const v = data[e.id] ?? EMPTY_EQUIP;
        const qty = v.qty ?? 0;
        const kw = v.kw ?? 0;
        const hours = v.hours ?? 0;
        const days = v.days ?? 0;
        const kwh = (qty * kw * hours * days) / 1000;
        return { id: e.id, label: e.label, kwh, cost: kwh * rate };
      });
      return {
        rows,
        rate,
        totalKwh: rows.reduce((a, r) => a + r.kwh, 0),
        totalCost: rows.reduce((a, r) => a + r.cost, 0),
      };
    }),

    // ── Cơ hội Tiết kiệm — payback per solution ──
    savingsRows: computed(() => {
      const data = store.savings();
      const rows = store.config().savingsSolutions.map((s) => {
        const v = data[s.id] ?? EMPTY_SAVING;
        const invest = v.invest ?? 0;
        const saving = v.saving ?? 0;
        // Hoàn vốn (năm) = đầu tư / tiết kiệm/năm. Null khi chưa nhập đủ.
        const payback = invest > 0 && saving > 0 ? invest / saving : null;
        // Ưu tiên theo hoàn vốn: <1 năm → Làm ngay, 1–3 năm → Ưu tiên, >3 năm → Dài hạn.
        const priority =
          payback === null
            ? null
            : payback < 1
              ? { label: 'Làm ngay (<1 năm)', tone: 'success' }
              : payback <= 3
                ? { label: 'Ưu tiên (1–3 năm)', tone: 'warning' }
                : { label: 'Dài hạn (>3 năm)', tone: 'info' };
        return {
          id: s.id,
          label: s.label,
          invest: s.invest,
          payback,
          annualSaving: saving,
          priority,
        };
      });
      return { rows, totalSaving: rows.reduce((a, r) => a + r.annualSaving, 0) };
    }),

    // ── Theo dõi Hàng tháng — energy intensity & month-on-month change ──
    trackRows: computed(() => {
      const kwhs = store.trackKwh();
      const costs = store.trackCost();
      const outs = store.trackOutput();
      let prevIntensity: number | null = null;
      const rows = Array.from({ length: MONTHS }, (_, m) => {
        const kwh = kwhs[m] ?? null;
        const cost = costs[m] ?? null;
        const output = outs[m] ?? null;
        const intensity = output && output > 0 ? (kwh ?? 0) / output : 0;
        const hasIntensity = output != null && output > 0 && kwh != null;
        const pctChange =
          hasIntensity && prevIntensity != null && prevIntensity > 0
            ? ((intensity - prevIntensity) / prevIntensity) * 100
            : null;
        if (hasIntensity) prevIntensity = intensity;
        return { index: m, kwh, cost, output, intensity, hasIntensity, pctChange };
      });
      return rows;
    }),
  })),

  withComputed((store) => ({
    // ── Bản đồ — Phần B: estimated cost per system from allocation % ──
    allocationRows: computed(() => {
      const alloc = store.allocation();
      const avgMonthly = store.mapTotals().avgMonthlyCost;
      const rows = store.config().allocationSystems.map((s) => {
        const pct = alloc[s.id] ?? null;
        return { id: s.id, label: s.label, pct, estCost: avgMonthly * ((pct ?? 0) / 100) };
      });
      return { rows, totalPct: rows.reduce((a, r) => a + (r.pct ?? 0), 0) };
    }),

    assessmentOverall: computed(() => {
      const results = store.assessmentResults();
      const full = results.reduce((a, r) => a + r.full, 0);
      const partial = results.reduce((a, r) => a + r.partial, 0);
      const answered = results.reduce((a, r) => a + r.answered, 0);
      return answered > 0 ? Math.round(((full * 1 + partial * 0.5) / answered) * 100) : 0;
    }),
    assessmentTotals: computed(() => {
      const r = store.assessmentResults();
      return {
        full: r.reduce((a, x) => a + x.full, 0),
        partial: r.reduce((a, x) => a + x.partial, 0),
        none: r.reduce((a, x) => a + x.none, 0),
        na: r.reduce((a, x) => a + x.na, 0),
      };
    }),

    trackTotals: computed(() => {
      const totalKwh = sumArr(store.trackKwh());
      const totalCost = sumArr(store.trackCost());
      const totalOutput = sumArr(store.trackOutput());
      return {
        totalKwh,
        totalCost,
        totalOutput,
        avgIntensity: totalOutput > 0 ? totalKwh / totalOutput : 0,
      };
    }),
  })),

  withComputed((store) => ({
    assessmentOverallBand: computed(() => readinessFor(store.assessmentOverall())),
  })),

  withMethods((store) => ({
    // ── setters ──
    setMapKwh(month: number, value: number | null) {
      patchState(store, (s) => ({ mapKwh: setCell(s.mapKwh, month, value, MONTHS) }));
    },
    setMapElecCost(month: number, value: number | null) {
      patchState(store, (s) => ({ mapElecCost: setCell(s.mapElecCost, month, value, MONTHS) }));
    },
    setMapWater(month: number, value: number | null) {
      patchState(store, (s) => ({ mapWater: setCell(s.mapWater, month, value, MONTHS) }));
    },
    setMapWaterCost(month: number, value: number | null) {
      patchState(store, (s) => ({ mapWaterCost: setCell(s.mapWaterCost, month, value, MONTHS) }));
    },
    setAllocation(id: string, value: number | null) {
      patchState(store, (s) => ({ allocation: { ...s.allocation, [id]: value } }));
    },
    setAssessment(id: string, value: string) {
      patchState(store, (s) => ({ assessment: { ...s.assessment, [id]: value } }));
    },
    setAssessmentPriority(id: string, value: string) {
      patchState(store, (s) => ({ assessmentPriority: { ...s.assessmentPriority, [id]: value } }));
    },
    setRate(value: number | null) {
      patchState(store, { rate: value });
    },
    setEquipment(id: string, field: keyof EquipmentInput, value: number | null) {
      patchState(store, (s) => ({
        equipment: {
          ...s.equipment,
          [id]: { ...(s.equipment[id] ?? EMPTY_EQUIP), [field]: value },
        },
      }));
    },
    setSavings(id: string, field: keyof SavingsInput, value: number | null) {
      patchState(store, (s) => ({
        savings: { ...s.savings, [id]: { ...(s.savings[id] ?? EMPTY_SAVING), [field]: value } },
      }));
    },
    setTrackKwh(month: number, value: number | null) {
      patchState(store, (s) => ({ trackKwh: setCell(s.trackKwh, month, value, MONTHS) }));
    },
    setTrackCost(month: number, value: number | null) {
      patchState(store, (s) => ({ trackCost: setCell(s.trackCost, month, value, MONTHS) }));
    },
    setTrackOutput(month: number, value: number | null) {
      patchState(store, (s) => ({ trackOutput: setCell(s.trackOutput, month, value, MONTHS) }));
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
    mapKwhOf: (month: number) => store.mapKwh()[month] ?? null,
    mapElecCostOf: (month: number) => store.mapElecCost()[month] ?? null,
    mapWaterOf: (month: number) => store.mapWater()[month] ?? null,
    mapWaterCostOf: (month: number) => store.mapWaterCost()[month] ?? null,
    allocationOf: (id: string) => store.allocation()[id] ?? null,
    assessmentOf: (id: string) => store.assessment()[id] ?? '',
    assessmentPriorityOf: (id: string) => store.assessmentPriority()[id] ?? '',
    rateValue: () => store.rate() ?? store.config().defaultRate,
    equipmentOf: (id: string, field: keyof EquipmentInput) =>
      store.equipment()[id]?.[field] ?? null,
    savingsOf: (id: string, field: keyof SavingsInput) => store.savings()[id]?.[field] ?? null,
    trackKwhOf: (month: number) => store.trackKwh()[month] ?? null,
    trackCostOf: (month: number) => store.trackCost()[month] ?? null,
    trackOutputOf: (month: number) => store.trackOutput()[month] ?? null,
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
    init(config: EnergyToolkitConfig) {
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
          mapKwh: store.mapKwh(),
          mapElecCost: store.mapElecCost(),
          mapWater: store.mapWater(),
          mapWaterCost: store.mapWaterCost(),
          allocation: store.allocation(),
          assessment: store.assessment(),
          assessmentPriority: store.assessmentPriority(),
          rate: store.rate(),
          equipment: store.equipment(),
          savings: store.savings(),
          trackKwh: store.trackKwh(),
          trackCost: store.trackCost(),
          trackOutput: store.trackOutput(),
          planInfo: store.planInfo(),
          actions: store.actions(),
          milestones: store.milestones(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
