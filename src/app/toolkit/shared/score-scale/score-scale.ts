import { Component, input, model } from '@angular/core';

export interface ScoreOption {
  value: number;
  label: string;
}

/** Default 0–2 scale shared across Quick Scan questions. */
export const SCORE_SCALE_OPTIONS: ScoreOption[] = [
  { value: 0, label: 'Chưa có' },
  { value: 1, label: 'Một phần' },
  { value: 2, label: 'Đầy đủ' },
];

@Component({
  selector: 'app-score-scale',
  standalone: true,
  templateUrl: './score-scale.html',
  styleUrl: './score-scale.css',
})
export class ScoreScaleComponent {
  /** Two-way bindable selected score. */
  value = model<number | undefined>(undefined);
  options = input<ScoreOption[]>(SCORE_SCALE_OPTIONS);
  ariaLabel = input<string>('');

  select(value: number): void {
    this.value.set(value);
  }
}
