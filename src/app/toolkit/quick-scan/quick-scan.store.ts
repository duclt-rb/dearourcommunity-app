import { computed, effect, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ActionPlanField,
  ActionPlanRow,
  maturityFor,
  maturityLevelFor,
  MaturityTone,
  PillarKey,
  PillarSection,
  QuickScanConfig,
} from './quick-scan.types';
import {
  mapValue,
  needsMigration,
  rekeyRecord,
  TOOLKIT_PERSIST_VERSION,
} from '../shared/persist-migration';
import { QUICK_SCANS_VI } from './quick-scan.data';

/** Persisted slice of the scan, keyed per toolkit id in localStorage. */
interface PersistedScan {
  /** V2: profile key theo ProfileField.id, actionPlan key theo PriorityFocus.id. */
  version?: number;
  scores: Record<string, number>;
  profile: Record<string, string>;
  /** Action plan rows keyed by priority-focus id. Optional for back-compat. */
  actionPlan?: Record<string, ActionPlanRow>;
  currentStep: number;
}

const STORAGE_PREFIX = 'doc:quick-scan:';

function storageKey(configId: string): string {
  return `${STORAGE_PREFIX}${configId}`;
}

/**
 * V1 persist theo nhãn VN; map nhãn→id build từ chính config VI (không drift).
 * `config` PHẢI là edition TIẾNG VIỆT (`QUICK_SCANS_VI`) — edition EN dịch nhãn
 * nên map build từ nó sẽ không khớp payload v1.
 */
export function migrateV1toV2(raw: PersistedScan, config: QuickScanConfig): PersistedScan {
  const profileMap = Object.fromEntries(config.profileFields.map((f) => [f.label, f.id]));
  const focusMap = Object.fromEntries(config.priorityFocus.map((f) => [f.area, f.id]));
  const profile = rekeyRecord(raw.profile, profileMap);
  // Field boolean v1 lưu NHÃN 'Có'/'Không' làm value — chuyển sang 'yes'/'no' ổn định
  for (const field of config.profileFields) {
    if (field.type === 'boolean' && field.id in profile) {
      profile[field.id] = mapValue(profile[field.id], { Có: 'yes', Không: 'no' });
    }
  }
  return {
    ...raw,
    version: TOOLKIT_PERSIST_VERSION,
    profile,
    actionPlan: rekeyRecord(raw.actionPlan, focusMap),
  };
}

function loadPersisted(config: QuickScanConfig): PersistedScan | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey(config.id));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedScan;
    if (!needsMigration(parsed)) return parsed;
    // Migrate bằng config TIẾNG VIỆT cùng id (v1 persist nhãn VN) — không phụ
    // thuộc locale đang chạy; fallback config hiện hành cho id ngoài registry.
    const migrated = migrateV1toV2(parsed, QUICK_SCANS_VI[config.id] ?? config);
    // Ghi lại ngay để lần sau không migrate nữa (idempotent nhờ version check)
    savePersisted(config.id, migrated);
    return migrated;
  } catch {
    return null;
  }
}

function savePersisted(configId: string, data: PersistedScan): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(
      storageKey(configId),
      JSON.stringify({ ...data, version: TOOLKIT_PERSIST_VERSION }),
    );
  } catch {
    // storage full / unavailable (e.g. private mode) — ignore
  }
}

function clearPersisted(configId: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(storageKey(configId));
  } catch {
    // ignore
  }
}

interface PillarResult {
  key: PillarKey;
  label: string;
  score: number;
  max: number;
  percent: number;
  maturity: string;
  maturityTone: MaturityTone;
}

type StepKind = 'profile' | 'pillar' | 'results';

export interface Step {
  kind: StepKind;
  label: string;
  /** Index into config.pillars when kind === 'pillar'. */
  pillarIndex?: number;
}

interface QuickScanState {
  config: QuickScanConfig | null;
  /** question id -> score (0 | 1 | 2). */
  scores: Record<string, number>;
  /** business profile field label -> value. */
  profile: Record<string, string>;
  /** priority-focus area -> action plan row. */
  actionPlan: Record<string, ActionPlanRow>;
  currentStep: number;
}

const initialState: QuickScanState = {
  config: null,
  scores: {},
  profile: {},
  actionPlan: {},
  currentStep: 0,
};

export const QuickScanStore = signalStore(
  withState(initialState),

  // ── Base derivations (state only) ──
  // (transloco sync — file dịch preload trước routing; locale cố định mỗi page load)
  withComputed((store, transloco = inject(TranslocoService)) => ({
    results: computed<PillarResult[]>(() => {
      const config = store.config();
      const scores = store.scores();
      if (!config) return [];
      return config.pillars.map((pillar) => {
        const score = pillar.groups
          .flatMap((g) => g.questions)
          .reduce((sum, q) => sum + (scores[q.id] ?? 0), 0);
        const percent = pillar.maxScore > 0 ? Math.round((score / pillar.maxScore) * 100) : 0;
        const level = maturityLevelFor(percent);
        return {
          key: pillar.key,
          label: pillar.label,
          score,
          max: pillar.maxScore,
          percent,
          maturity: transloco.translate(level.label),
          maturityTone: level.tone,
        };
      });
    }),

    steps: computed<Step[]>(() => {
      const config = store.config();
      if (!config) return [];
      return [
        { kind: 'profile', label: transloco.translate('toolkit.steps.profile') },
        ...config.pillars.map((p, i) => ({
          kind: 'pillar' as const,
          label: p.label,
          pillarIndex: i,
        })),
        { kind: 'results', label: transloco.translate('toolkit.steps.results') },
      ];
    }),
  })),

  // ── Derived from base computeds ──
  withComputed((store) => ({
    totalScore: computed(() => store.results().reduce((s, r) => s + r.score, 0)),
    totalMax: computed(() => store.results().reduce((s, r) => s + r.max, 0)),
    totalPercent: computed(() => {
      const max = store.results().reduce((s, r) => s + r.max, 0);
      const score = store.results().reduce((s, r) => s + r.score, 0);
      return max > 0 ? Math.round((score / max) * 100) : 0;
    }),

    totalSteps: computed(() => store.steps().length),
    currentStepData: computed<Step | undefined>(() => store.steps()[store.currentStep()]),
    currentPillar: computed<PillarSection | undefined>(() => {
      const step = store.steps()[store.currentStep()];
      const config = store.config();
      return step?.kind === 'pillar' && config ? config.pillars[step.pillarIndex ?? 0] : undefined;
    }),
    isFirstStep: computed(() => store.currentStep() === 0),
    isLastStep: computed(() => store.currentStep() === Math.max(0, store.steps().length - 1)),
    progressPercent: computed(() => {
      const last = store.steps().length - 1;
      return last > 0 ? Math.round((store.currentStep() / last) * 100) : 0;
    }),
  })),

  // ── Maturity label needs totalPercent ──
  withComputed((store, transloco = inject(TranslocoService)) => ({
    totalMaturity: computed(() => transloco.translate(maturityFor(store.totalPercent()))),
    totalMaturityTone: computed<MaturityTone>(() => maturityLevelFor(store.totalPercent()).tone),
  })),

  withMethods((store) => ({
    setConfig(config: QuickScanConfig): void {
      // Avoid re-hydrating when the same config is re-applied (e.g. effect re-run).
      if (store.config()?.id === config.id) {
        patchState(store, { config });
        return;
      }
      const saved = loadPersisted(config);
      const totalSteps = config.pillars.length + 2;
      patchState(store, {
        config,
        scores: saved?.scores ?? {},
        profile: saved?.profile ?? {},
        actionPlan: saved?.actionPlan ?? {},
        currentStep: Math.max(0, Math.min(totalSteps - 1, saved?.currentStep ?? 0)),
      });
    },

    reset(): void {
      const config = store.config();
      if (config) clearPersisted(config.id);
      patchState(store, { scores: {}, profile: {}, actionPlan: {}, currentStep: 0 });
    },

    scoreOf(id: string): number | undefined {
      return store.scores()[id];
    },
    setScore(id: string, value: number | undefined): void {
      patchState(store, (state) => ({ scores: { ...state.scores, [id]: value ?? 0 } }));
    },

    profileOf(fieldId: string): string {
      return store.profile()[fieldId] ?? '';
    },
    setProfile(fieldId: string, value: string): void {
      patchState(store, (state) => ({ profile: { ...state.profile, [fieldId]: value } }));
    },

    actionPlanOf(focusId: string, field: ActionPlanField): string {
      return store.actionPlan()[focusId]?.[field] ?? '';
    },
    setActionPlan(focusId: string, field: ActionPlanField, value: string): void {
      patchState(store, (state) => ({
        actionPlan: {
          ...state.actionPlan,
          [focusId]: { ...state.actionPlan[focusId], [field]: value },
        },
      }));
    },

    pillarAnswered(pillar: PillarSection): number {
      const scores = store.scores();
      return pillar.groups.flatMap((g) => g.questions).filter((q) => q.id in scores).length;
    },
    pillarQuestionCount(pillar: PillarSection): number {
      return pillar.groups.reduce((s, g) => s + g.questions.length, 0);
    },

    goToStep(index: number): void {
      const clamped = Math.max(0, Math.min(store.steps().length - 1, index));
      patchState(store, { currentStep: clamped });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    nextStep(): void {
      this.goToStep(store.currentStep() + 1);
    },
    prevStep(): void {
      this.goToStep(store.currentStep() - 1);
    },
  })),

  withHooks({
    onInit(store) {
      // Auto-persist any change to localStorage, keyed by the active toolkit id.
      effect(() => {
        const config = store.config();
        if (!config) return;
        savePersisted(config.id, {
          scores: store.scores(),
          profile: store.profile(),
          actionPlan: store.actionPlan(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
