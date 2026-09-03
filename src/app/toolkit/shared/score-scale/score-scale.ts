import { Component, inject, input, model } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export interface ScoreOption {
  value: number;
  label: string;
}

/** Default 0–2 scale shared across Quick Scan questions (nhãn dịch theo locale). */
export function defaultScoreOptions(transloco: TranslocoService): ScoreOption[] {
  return [
    { value: 0, label: transloco.translate('toolkit.fields.scoreNone') },
    { value: 1, label: transloco.translate('toolkit.fields.scorePartial') },
    { value: 2, label: transloco.translate('toolkit.fields.scoreFull') },
  ];
}

@Component({
  selector: 'app-score-scale',
  standalone: true,
  templateUrl: './score-scale.html',
  styleUrl: './score-scale.css',
})
export class ScoreScaleComponent {
  /** Two-way bindable selected score. */
  value = model<number | undefined>(undefined);
  options = input<ScoreOption[]>(defaultScoreOptions(inject(TranslocoService)));
  ariaLabel = input<string>('');

  select(value: number): void {
    this.value.set(value);
  }
}
