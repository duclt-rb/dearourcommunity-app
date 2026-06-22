import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { getDataGov } from './datagov.data';
import { DataGovToolkitConfig, MaturityBand, readinessFor } from './datagov.types';

const STORAGE_PREFIX = 'doc:datagov-toolkit:';
/** Fallback config used before the component calls `init()`. */
const DEFAULT_CONFIG = getDataGov('datagov-toolkit-san-xuat') as DataGovToolkitConfig;

interface LegalRow {
  last: string;
  next: string;
  owner: string;
  status: string;
}
interface ActionRow {
  owner: string;
  status: string;
}
interface MilestoneRow {
  meetDate: string;
  note: string;
}
export interface IncidentLogRow {
  date: string;
  desc: string;
  severity: string;
}
const EMPTY_LEGAL: LegalRow = { last: '', next: '', owner: '', status: '' };
const EMPTY_ACTION: ActionRow = { owner: '', status: '' };
const EMPTY_MILESTONE: MilestoneRow = { meetDate: '', note: '' };
const EMPTY_INCIDENT: IncidentLogRow = { date: '', desc: '', severity: '' };

interface DataGovState {
  /** Active toolkit config (set via init); not persisted. */
  config: DataGovToolkitConfig;
  /** localStorage key for the active toolkit; null until init. Not persisted. */
  storageKey: string | null;
  /** Bản đồ dữ liệu: rowId -> (cột -> giá trị). */
  dataMap: Record<string, Record<string, string>>;
  assessment: Record<string, string>;
  incidentChecks: Record<string, boolean>;
  incidentLog: IncidentLogRow[];
  legal: Record<string, LegalRow>;
  actions: Record<string, ActionRow>;
  milestones: Record<string, MilestoneRow>;
  currentStep: number;
}

const initialState: DataGovState = {
  config: DEFAULT_CONFIG,
  storageKey: null,
  dataMap: {},
  assessment: {},
  incidentChecks: {},
  incidentLog: [],
  legal: {},
  actions: {},
  milestones: {},
  currentStep: 0,
};

function loadPersisted(key: string): Partial<DataGovState> | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<DataGovState>) : null;
  } catch {
    return null;
  }
}
function savePersisted(key: string, state: Omit<DataGovState, 'config' | 'storageKey'>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // ignore
  }
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

export interface RiskRow {
  id: string;
  topic: string;
  percent: number;
  band: MaturityBand;
  suggestion: string;
}

export const DataGovStore = signalStore(
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
  })),

  withComputed((store) => ({
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
    /** Bảng Rủi ro — ghép điểm % từng nhóm với gợi ý tĩnh trong config. */
    riskRows: computed<RiskRow[]>(() => {
      const suggestions = store.config().riskSuggestions;
      return store.assessmentResults().map((r) => ({
        id: r.id,
        topic: r.topic,
        percent: r.percent,
        band: r.band,
        suggestion: suggestions[r.id] ?? '',
      }));
    }),
  })),

  withComputed((store) => ({
    assessmentOverallBand: computed(() => readinessFor(store.assessmentOverall())),
  })),

  withMethods((store) => ({
    setDataMap(rowId: string, col: string, value: string) {
      patchState(store, (s) => ({
        dataMap: { ...s.dataMap, [rowId]: { ...(s.dataMap[rowId] ?? {}), [col]: value } },
      }));
    },
    setAssessment(id: string, value: string) {
      patchState(store, (s) => ({ assessment: { ...s.assessment, [id]: value } }));
    },
    toggleIncidentCheck(id: string, checked: boolean) {
      patchState(store, (s) => ({ incidentChecks: { ...s.incidentChecks, [id]: checked } }));
    },
    addIncidentRow() {
      patchState(store, (s) => ({ incidentLog: [...s.incidentLog, { ...EMPTY_INCIDENT }] }));
    },
    setIncidentRow(index: number, field: keyof IncidentLogRow, value: string) {
      patchState(store, (s) => ({
        incidentLog: s.incidentLog.map((row, i) =>
          i === index ? { ...row, [field]: value } : row,
        ),
      }));
    },
    removeIncidentRow(index: number) {
      patchState(store, (s) => ({ incidentLog: s.incidentLog.filter((_, i) => i !== index) }));
    },
    setLegal(id: string, field: keyof LegalRow, value: string) {
      patchState(store, (s) => ({
        legal: { ...s.legal, [id]: { ...(s.legal[id] ?? EMPTY_LEGAL), [field]: value } },
      }));
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
    dataMapOf: (rowId: string, col: string) => store.dataMap()[rowId]?.[col] ?? '',
    assessmentOf: (id: string) => store.assessment()[id] ?? '',
    incidentCheckOf: (id: string) => store.incidentChecks()[id] ?? false,
    legalOf: (id: string, field: keyof LegalRow) => store.legal()[id]?.[field] ?? '',
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
    init(config: DataGovToolkitConfig) {
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
          dataMap: store.dataMap(),
          assessment: store.assessment(),
          incidentChecks: store.incidentChecks(),
          incidentLog: store.incidentLog(),
          legal: store.legal(),
          actions: store.actions(),
          milestones: store.milestones(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
