import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CSI_TOOLKITS_VI } from './data/csi.data.vi';
import { CsiStore } from './csi.store';
import { priorityFor } from './csi.types';

// Chốt chặn: con số của bộ file gốc (105 chỉ số · 86 C · 19 A · 545 điểm công bố ·
// 551 điểm thành phần) và cách chấm Có / Không / Không thuộc đối tượng áp dụng.
describe('CSI 2026 toolkit store', () => {
  const config = CSI_TOOLKITS_VI['csi-2026-sme'];
  const indicators = config.sections.flatMap((s) =>
    s.groups.flatMap((g) => g.blocks.flatMap((b) => b.indicators)),
  );
  let store: InstanceType<typeof CsiStore>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [CsiStore] });
    store = TestBed.inject(CsiStore);
    store.init(config);
  });

  it('matches the indicator counts of the source file', () => {
    expect(indicators).toHaveLength(105);
    expect(indicators.filter((i) => i.level === 'C')).toHaveLength(86);
    expect(indicators.filter((i) => i.level === 'A')).toHaveLength(19);
    expect(new Set(indicators.map((i) => i.id)).size).toBe(105);
    // 22 nhóm chỉ số — đúng danh sách "Mức độ sẵn sàng theo từng nhóm" của Bảng điểm
    expect(store.groupResults()).toHaveLength(22);
  });

  it('starts at 0% with the published / component totals of the scorecard', () => {
    const total = store.grandTotal();
    expect(total.published).toBe(545);
    expect(total.component).toBe(551);
    expect(total.available).toBe(551);
    expect(total.self).toBe(0);
    expect(total.rate).toBe(0);
    expect(store.partResults().map((p) => [p.published, p.component])).toEqual([
      [14, 14],
      [4, 4],
      [178, 184],
      [70, 70],
      [138, 138],
      [141, 141],
    ]);
    expect(store.compliance()).toEqual([86, 0, 0, 0, 19, 0, 105]);
  });

  it('scores Có as full points and drops N/A from both numerator and denominator', () => {
    store.setAnswer('I 1', 'yes'); // C, 20 điểm
    store.setAnswer('E 6', 'na'); // C, 6 điểm
    store.setAnswer('G 22', 'no'); // A, 6 điểm

    const [, , partI, partG, partE] = store.partResults();
    expect(partI.self).toBe(20);
    expect(partI.available).toBe(184);
    expect(partE.available).toBe(132);
    expect(partG.self).toBe(0);
    expect(store.compliance()).toEqual([86, 1, 0, 1, 19, 0, 102]);

    const plan = new Map(store.planItems().map((p) => [p.indicator.id, p]));
    expect(plan.get('I 1')?.priority).toBe('done');
    expect(plan.get('I 1')?.missing).toBe(0);
    expect(plan.get('E 6')?.priority).toBe('na');
    expect(plan.get('E 6')?.missing).toBe(0);
    expect(plan.get('G 22')?.priority).toBe('medium');
    expect(plan.get('G 22')?.missing).toBe(6);
  });

  it('converts readiness to the published CSI scale', () => {
    for (const ind of config.sections[0].groups.flatMap((g) =>
      g.blocks.flatMap((b) => b.indicators),
    )) {
      store.setAnswer(ind.id, 'yes');
    }
    store.setSectionA('part-1', 'yes');

    const [part1, part2, partI] = store.partResults();
    expect(part1.self).toBe(14);
    expect(part2.self).toBe(0);
    expect(partI.rate).toBe(1);
    expect(partI.converted).toBe(178);
  });

  it('maps answers to the agreed priority levels', () => {
    expect(priorityFor('C', 'no')).toBe('high');
    expect(priorityFor('A', 'no')).toBe('medium');
    expect(priorityFor('C', 'yes')).toBe('done');
    expect(priorityFor('A', 'na')).toBe('na');
    expect(priorityFor('C', '')).toBe('unrated');
  });
});
