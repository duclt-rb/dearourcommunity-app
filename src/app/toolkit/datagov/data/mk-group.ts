import { AssessmentGroup } from '../datagov.types';

/** Tạo một nhóm câu hỏi từ các bộ ba [text, risk, ref] — id câu hỏi sinh theo THỨ TỰ tuple. */
export function mkGroup(
  id: string,
  topic: string,
  rows: [string, string, string][],
): AssessmentGroup {
  return {
    id,
    topic,
    questions: rows.map(([text, risk, ref], i) => ({ id: `${id}-${i + 1}`, text, risk, ref })),
  };
}
