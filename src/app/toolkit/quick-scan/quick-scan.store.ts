import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { maturityFor, PillarKey, PillarSection, QuickScanConfig } from './quick-scan.types';

/** Persisted slice of the scan, keyed per toolkit id in localStorage. */
interface PersistedScan {
  scores: Record<string, number>;
  profile: Record<string, string>;
  currentStep: number;
}

const STORAGE_PREFIX = 'doc:quick-scan:';

function storageKey(configId: string): string {
  return `${STORAGE_PREFIX}${configId}`;
}

function loadPersisted(configId: string): PersistedScan | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey(configId));
    return raw ? (JSON.parse(raw) as PersistedScan) : null;
  } catch {
    return null;
  }
}

function savePersisted(configId: string, data: PersistedScan): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(storageKey(configId), JSON.stringify(data));
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
  currentStep: number;
}

const initialState: QuickScanState = {
  config: null,
  scores: {},
  profile: {},
  currentStep: 0,
};

export const QuickScanStore = signalStore(
  withState(initialState),

  // ── Base derivations (state only) ──
  withComputed((store) => ({
    results: computed<PillarResult[]>(() => {
      const config = store.config();
      const scores = store.scores();
      if (!config) return [];
      return config.pillars.map((pillar) => {
        const score = pillar.groups
          .flatMap((g) => g.questions)
          .reduce((sum, q) => sum + (scores[q.id] ?? 0), 0);
        const percent = pillar.maxScore > 0 ? Math.round((score / pillar.maxScore) * 100) : 0;
        return {
          key: pillar.key,
          label: pillar.label,
          score,
          max: pillar.maxScore,
          percent,
          maturity: maturityFor(percent),
        };
      });
    }),

    steps: computed<Step[]>(() => {
      const config = store.config();
      if (!config) return [];
      return [
        { kind: 'profile', label: 'Thông tin' },
        ...config.pillars.map((p, i) => ({
          kind: 'pillar' as const,
          label: p.label,
          pillarIndex: i,
        })),
        { kind: 'results', label: 'Kết quả' },
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
  withComputed((store) => ({
    totalMaturity: computed(() => maturityFor(store.totalPercent())),
  })),

  withMethods((store) => ({
    setConfig(config: QuickScanConfig): void {
      // Avoid re-hydrating when the same config is re-applied (e.g. effect re-run).
      if (store.config()?.id === config.id) {
        patchState(store, { config });
        return;
      }
      const saved = loadPersisted(config.id);
      const totalSteps = config.pillars.length + 2;
      patchState(store, {
        config,
        scores: saved?.scores ?? {},
        profile: saved?.profile ?? {},
        currentStep: Math.max(0, Math.min(totalSteps - 1, saved?.currentStep ?? 0)),
      });
    },

    reset(): void {
      const config = store.config();
      if (config) clearPersisted(config.id);
      patchState(store, { scores: {}, profile: {}, currentStep: 0 });
    },

    scoreOf(id: string): number | undefined {
      return store.scores()[id];
    },
    setScore(id: string, value: number | undefined): void {
      patchState(store, (state) => ({ scores: { ...state.scores, [id]: value ?? 0 } }));
    },

    profileOf(label: string): string {
      return store.profile()[label] ?? '';
    },
    setProfile(label: string, value: string): void {
      patchState(store, (state) => ({ profile: { ...state.profile, [label]: value } }));
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
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
