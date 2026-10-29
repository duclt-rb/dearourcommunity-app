import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CSI_TOOLKITS_VI } from './data/csi.data.vi';
import { CsiStore } from './csi.store';

const config = CSI_TOOLKITS_VI['csi-2026-sme'];
const KEY = 'doc:csi-toolkit:csi-2026-sme';

describe('CSI 2026 toolkit store', () => {
  let store: InstanceType<typeof CsiStore>;

  function create(): InstanceType<typeof CsiStore> {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [CsiStore] });
    const s = TestBed.inject(CsiStore);
    s.init(config);
    return s;
  }

  beforeEach(() => {
    localStorage.clear();
    store = create();
  });

  it('computes readiness from answers and keeps the default threshold', () => {
    expect(store.threshold()).toBe(0.8);
    expect(store.readiness().overall).toBe('nodata');
    store.setAnswer('2.1', 'yes');
    expect(store.readiness().areas[1].have).toBe(1);
    expect(store.answeredCount()).toBe(1);
    expect(store.totalQuestions()).toBe(105);
  });

  it('clamps the threshold to 0–100%', () => {
    store.setThreshold(1.5);
    expect(store.threshold()).toBe(1);
    store.setThreshold(-1);
    expect(store.threshold()).toBe(0);
    store.setThreshold(Number.NaN);
    expect(store.threshold()).toBe(0);
  });

  it('summarises documents as yes / (total − not applicable)', () => {
    const ids = config.documents.groups.flatMap((g) => g.items.map((i) => i.id));
    expect(ids).toHaveLength(33);
    store.setDoc(ids[0], 'status', 'yes');
    store.setDoc(ids[1], 'status', 'na');
    expect(store.docsSummary()).toEqual({ yes: 1, total: 32 });
  });

  it('persists to localStorage (v3) and rehydrates', async () => {
    store.setAnswer('1.1', '2');
    store.setNote('1.1', 'ghi chú');
    store.setPlan('2.1', 'owner', 'Lan');
    TestBed.tick();
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    expect(saved.version).toBe(3);
    expect(saved.answers['1.1']).toBe('2');

    const again = create();
    expect(again.answerOf('1.1')).toBe('2');
    expect(again.noteOf('1.1')).toBe('ghi chú');
    expect(again.planOf('2.1', 'owner')).toBe('Lan');
  });

  it('ignores a persisted payload from the retired scoring design (v2)', () => {
    localStorage.setItem(KEY, JSON.stringify({ version: 2, answers: { 'I 1': 'yes' } }));
    const fresh = create();
    expect(fresh.answerOf('I 1')).toBe('');
    expect(Object.keys(fresh.answers())).toHaveLength(0);
  });

  it('resets everything', () => {
    store.setAnswer('1.1', '0');
    store.setThreshold(0.5);
    store.reset();
    expect(store.answerOf('1.1')).toBe('');
    expect(store.threshold()).toBe(0.8);
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
