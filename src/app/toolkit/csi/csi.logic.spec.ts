import { describe, expect, it } from 'vitest';
import { CSI_TOOLKITS_VI } from './data/csi.data.vi';
import { computeReadiness, flattenQuestions, levelFor, overallLevel } from './csi.logic';
import { priorityFor, statusOf } from './csi.types';

// Chốt chặn: con số của file Excel nguồn (105 chỉ số = 86 bắt buộc + 19 nâng cao, 4 phần,
// 22 nhóm) và công thức sẵn sàng của sheet "Kết quả sẵn sàng" / "Khoảng cách cần lấp".
const config = CSI_TOOLKITS_VI['csi-2026-sme'];
const flat = flattenQuestions(config);

/** Trả lời "tốt nhất" cho một câu: có/không → 'yes'; câu khoảng → lựa chọn không gắn nhãn. */
function goodAnswer(i: number): string {
  const q = flat[i].q;
  if (q.answer === 'yesno') return 'yes';
  return String(q.options!.findIndex((o) => !o.tag));
}
function allGood(): Record<string, string> {
  return Object.fromEntries(flat.map((f, i) => [f.q.num, goodAnswer(i)]));
}

describe('CSI 2026 readiness data', () => {
  it('matches the question counts of the source file', () => {
    expect(flat).toHaveLength(105);
    expect(flat.filter((f) => f.q.kind === 'core')).toHaveLength(86);
    expect(flat.filter((f) => f.q.kind === 'advanced')).toHaveLength(19);
    expect(new Set(flat.map((f) => f.q.num)).size).toBe(105);
    expect(new Set(flat.map((f) => f.q.code)).size).toBe(105);
    expect(config.parts.map((p) => p.groups.flatMap((g) => g.questions).length)).toEqual([
      22, 8, 14, 61,
    ]);
    expect(config.parts.flatMap((p) => p.groups)).toHaveLength(22);
  });

  it('restores G 19 as question 2.6 and keeps E 24 mandatory (source-file defects, CR-023)', () => {
    expect(flat.find((f) => f.q.code === 'G 19')?.q.num).toBe('2.6');
    expect(flat.find((f) => f.q.code === 'E 24')?.q.kind).toBe('core');
  });

  it('has 22 range questions whose last option is "no data" (missing)', () => {
    const range = flat.filter((f) => f.q.answer === 'range');
    expect(range).toHaveLength(22);
    for (const { q } of range) {
      expect(q.options!.at(-1)?.tag).toBe('missing');
      expect(q.options!.some((o) => !o.tag)).toBe(true);
    }
  });
});

describe('statusOf / priorityFor', () => {
  const yesNo = flat.find((f) => f.q.answer === 'yesno')!.q;
  const compulsory = flat.find((f) => f.q.code === 'I 16')!.q; // BHXH: 100% / các mức < 100% = fix
  const loss = flat.find((f) => f.q.code === 'I 3')!.q; // lãi/lỗ: "Lỗ" = attention

  it('maps yes/no answers', () => {
    expect(statusOf(yesNo, undefined)).toBe('unanswered');
    expect(statusOf(yesNo, 'yes')).toBe('have');
    expect(statusOf(yesNo, 'no')).toBe('missing');
    expect(statusOf(yesNo, 'na')).toBe('na');
  });

  it('maps range answers by option tag', () => {
    expect(statusOf(compulsory, '0')).toBe('have'); // 100%
    expect(statusOf(compulsory, '1')).toBe('fix');
    expect(statusOf(compulsory, String(compulsory.options!.length - 1))).toBe('missing');
    expect(statusOf(loss, '0')).toBe('attention'); // Lỗ
    expect(statusOf(loss, '1')).toBe('have');
  });

  it('derives the priority column of the gap sheet', () => {
    expect(priorityFor('core', 'fix')).toBe('fix');
    expect(priorityFor('core', 'missing')).toBe('missing');
    expect(priorityFor('advanced', 'missing')).toBe('advanced');
    expect(priorityFor('advanced', 'fix')).toBe('fix');
    expect(priorityFor('core', 'attention')).toBe('attention');
    expect(priorityFor('core', 'unanswered')).toBe('unanswered');
    expect(priorityFor('core', 'have')).toBe('');
    expect(priorityFor('core', 'na')).toBe('');
  });
});

describe('readiness levels', () => {
  const t = (have: number, missing: number) => ({
    have,
    missing,
    fix: 0,
    progress: have + missing ? have / (have + missing) : null,
    advDone: 0,
    advTotal: 0,
    unanswered: 0,
  });

  it('levels a single area', () => {
    expect(levelFor(t(0, 0), 0.8)).toBe('nodata');
    expect(levelFor(t(10, 0), 0.8)).toBe('ready');
    expect(levelFor(t(8, 2), 0.8)).toBe('near'); // đúng ngưỡng 80%
    expect(levelFor(t(7, 3), 0.8)).toBe('not');
    expect(levelFor(t(7, 3), 0.7)).toBe('near'); // đổi ngưỡng
  });

  it('takes the lowest area level for the whole business', () => {
    expect(overallLevel(['nodata', 'nodata', 'nodata', 'nodata'])).toBe('nodata');
    expect(overallLevel(['ready', 'ready', 'ready', 'ready'])).toBe('ready');
    expect(overallLevel(['ready', 'near', 'ready', 'ready'])).toBe('near');
    expect(overallLevel(['ready', 'near', 'not', 'ready'])).toBe('not');
    expect(overallLevel(['ready', 'ready', 'nodata', 'ready'])).toBe('partial');
  });
});

describe('computeReadiness', () => {
  it('starts with no data and every question unanswered', () => {
    const r = computeReadiness(config, {}, 0.8);
    expect(r.overall).toBe('nodata');
    expect(r.unanswered).toBe(105);
    expect(r.areas.map((a) => a.unanswered)).toEqual([22, 8, 14, 61]);
    expect(r.groups).toHaveLength(22);
    expect(r.firstTasks).toEqual([]);
  });

  it('is READY when every mandatory item is in place', () => {
    const r = computeReadiness(config, allGood(), 0.8);
    expect(r.overall).toBe('ready');
    expect(r.unanswered).toBe(0);
    expect(r.coreMissing).toBe(0);
    expect(r.gaps.every((g) => g.priority === '')).toBe(true);
  });

  it('counts "attention" as in place and "fix" as missing', () => {
    const answers = allGood();
    const i3 = flat.findIndex((f) => f.q.code === 'I 3');
    const i16 = flat.findIndex((f) => f.q.code === 'I 16');
    answers[flat[i3].q.num] = '0'; // Lỗ → cần lưu ý, vẫn tính đã có
    answers[flat[i16].q.num] = '1'; // < 100% → cần khắc phục, tính là thiếu
    const r = computeReadiness(config, answers, 0.8);
    const data = r.areas[0];
    expect(data.missing).toBe(1);
    expect(data.fix).toBe(1);
    expect(data.level).toBe('near'); // 17/18 mandatory ≥ 80%
    expect(r.overall).toBe('near');
    expect(r.firstTasks.map((g) => g.q.code)).toEqual(['I 16']);
  });

  it('puts "fix now" tasks ahead of other missing mandatory tasks', () => {
    const answers = allGood();
    const first = flat.find((f) => f.q.answer === 'yesno' && f.q.kind === 'core')!;
    answers[first.q.num] = 'no';
    const i16 = flat.find((f) => f.q.code === 'I 16')!;
    answers[i16.q.num] = '1';
    const r = computeReadiness(config, answers, 0.8);
    expect(r.firstTasks.map((g) => g.priority)).toEqual(['fix', 'missing']);
  });

  it('excludes "not applicable" answers and ignores advanced items for the level', () => {
    const answers = allGood();
    const adv = flat.find((f) => f.q.kind === 'advanced' && f.q.answer === 'yesno')!;
    answers[adv.q.num] = 'no';
    const core = flat.find((f) => f.q.kind === 'core' && f.q.answer === 'yesno')!;
    answers[core.q.num] = 'na';
    const r = computeReadiness(config, answers, 0.8);
    expect(r.overall).toBe('ready'); // advanced thiếu và core N/A không làm tụt mức
    const area = r.areas[adv.part.no - 1];
    expect(area.advTotal - area.advDone).toBe(1);
  });

  it('caps the first-task list at 10', () => {
    const answers: Record<string, string> = {};
    flat.forEach((f) => {
      if (f.q.answer === 'yesno') answers[f.q.num] = f.q.kind === 'core' ? 'no' : 'yes';
    });
    const r = computeReadiness(config, answers, 0.8);
    expect(r.firstTasks).toHaveLength(10);
  });
});
