import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computeReadiness } from './csi.logic';
import { getCsiToolkit } from './csi.data';
import { CsiToolkitConfig } from './csi.types';

const STORAGE_PREFIX = 'doc:csi-toolkit:';
/**
 * v3 = thiết kế "mức độ sẵn sàng" (CR-023). Payload cũ (v2: chấm điểm 545/551, khoá theo mã chỉ số)
 * khác hẳn về cấu trúc nên KHÔNG migrate — bị bỏ qua và ghi đè ở lần lưu đầu tiên.
 */
const PERSIST_VERSION = 3;
/** Fallback config used before the component calls `init()`. */
const DEFAULT_CONFIG = getCsiToolkit('csi-2026-sme') as CsiToolkitConfig;

/** Ba cột nhập tay của danh mục hồ sơ. */
export interface DocRow {
  /** 'yes' | 'no' | 'na'. */
  status: string;
  where: string;
  owner: string;
}
/** Ba cột nhập tay của trang Khoảng cách cần lấp. */
export interface PlanRow {
  owner: string;
  due: string;
  /** 'todo' | 'doing' | 'done'. */
  progress: string;
}
const EMPTY_DOC: DocRow = { status: '', where: '', owner: '' };
const EMPTY_PLAN: PlanRow = { owner: '', due: '', progress: '' };

interface CsiState {
  /** Active toolkit config (set via init); not persisted. */
  config: CsiToolkitConfig;
  /** localStorage key for the active toolkit; null until init. Not persisted. */
  storageKey: string | null;
  /** Thông tin doanh nghiệp: field id → giá trị (lựa chọn lưu theo chỉ số option). */
  profile: Record<string, string>;
  /** STT câu hỏi → 'yes' | 'no' | 'na' (câu có/không) hoặc chỉ số lựa chọn (câu khoảng). */
  answers: Record<string, string>;
  /** STT câu hỏi → ghi chú của doanh nghiệp. */
  notes: Record<string, string>;
  docs: Record<string, DocRow>;
  plan: Record<string, PlanRow>;
  /** Ngưỡng "Gần sẵn sàng" 0–1. */
  threshold: number;
  currentStep: number;
}

const initialState: CsiState = {
  config: DEFAULT_CONFIG,
  storageKey: null,
  profile: {},
  answers: {},
  notes: {},
  docs: {},
  plan: {},
  threshold: DEFAULT_CONFIG.results.thresholdDefault,
  currentStep: 0,
};

/** Persisted slice of the toolkit, keyed per toolkit id in localStorage. */
interface PersistedCsi extends Partial<Omit<CsiState, 'config' | 'storageKey'>> {
  version?: number;
}

function loadPersisted(config: CsiToolkitConfig): PersistedCsi | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + config.id);
    const saved = raw ? (JSON.parse(raw) as PersistedCsi) : null;
    return saved && saved.version === PERSIST_VERSION ? saved : null;
  } catch {
    return null;
  }
}
function savePersisted(key: string, state: PersistedCsi): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify({ ...state, version: PERSIST_VERSION }));
  } catch {
    // ignore
  }
}

export const CsiStore = signalStore(
  withState<CsiState>(initialState),

  withComputed((store) => {
    const readiness = computed(() =>
      computeReadiness(store.config(), store.answers(), store.threshold()),
    );
    return {
      readiness,
      /** Số câu đã trả lời / tổng số câu. */
      answeredCount: computed(() => {
        const r = readiness();
        return r.gaps.length - r.unanswered;
      }),
      totalQuestions: computed(() => readiness().gaps.length),
      /** Hồ sơ: số "Có" / (tổng − "Không áp dụng"). */
      docsSummary: computed(() => {
        const docs = store.docs();
        const ids = store.config().documents.groups.flatMap((g) => g.items.map((i) => i.id));
        const na = ids.filter((id) => docs[id]?.status === 'na').length;
        const yes = ids.filter((id) => docs[id]?.status === 'yes').length;
        return { yes, total: ids.length - na };
      }),
    };
  }),

  withMethods((store) => ({
    // ── Thông tin doanh nghiệp ──
    setProfile(id: string, value: string) {
      patchState(store, (s) => ({ profile: { ...s.profile, [id]: value } }));
    },

    // ── Câu hỏi ──
    setAnswer(num: string, value: string) {
      patchState(store, (s) => ({ answers: { ...s.answers, [num]: value } }));
    },
    setNote(num: string, value: string) {
      patchState(store, (s) => ({ notes: { ...s.notes, [num]: value } }));
    },

    // ── Hồ sơ cần có / Khoảng cách cần lấp ──
    setDoc(id: string, field: keyof DocRow, value: string) {
      patchState(store, (s) => ({
        docs: { ...s.docs, [id]: { ...(s.docs[id] ?? EMPTY_DOC), [field]: value } },
      }));
    },
    setPlan(num: string, field: keyof PlanRow, value: string) {
      patchState(store, (s) => ({
        plan: { ...s.plan, [num]: { ...(s.plan[num] ?? EMPTY_PLAN), [field]: value } },
      }));
    },
    setThreshold(value: number) {
      if (!Number.isFinite(value)) return;
      patchState(store, { threshold: Math.min(1, Math.max(0, value)) });
    },

    // ── getters ──
    profileOf: (id: string) => store.profile()[id] ?? '',
    answerOf: (num: string) => store.answers()[num] ?? '',
    noteOf: (num: string) => store.notes()[num] ?? '',
    docOf: (id: string, field: keyof DocRow) => store.docs()[id]?.[field] ?? '',
    planOf: (num: string, field: keyof PlanRow) => store.plan()[num]?.[field] ?? '',

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
        profile: saved?.profile ?? {},
        answers: saved?.answers ?? {},
        notes: saved?.notes ?? {},
        docs: saved?.docs ?? {},
        plan: saved?.plan ?? {},
        threshold:
          typeof saved?.threshold === 'number' ? saved.threshold : config.results.thresholdDefault,
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
      patchState(store, {
        ...initialState,
        config: store.config(),
        storageKey: key,
        threshold: store.config().results.thresholdDefault,
      });
    },
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        const key = store.storageKey();
        if (!key) return; // not initialised yet — nothing to persist
        savePersisted(key, {
          profile: store.profile(),
          answers: store.answers(),
          notes: store.notes(),
          docs: store.docs(),
          plan: store.plan(),
          threshold: store.threshold(),
          currentStep: store.currentStep(),
        });
      });
    },
  }),
);
