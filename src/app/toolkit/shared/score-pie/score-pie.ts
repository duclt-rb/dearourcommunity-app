import { Component, computed, input } from '@angular/core';

export interface PieSlice {
  label: string;
  value: number;
  /** Any CSS color, e.g. 'var(--color-primary-500)'. */
  color: string;
}

interface PieSegment extends PieSlice {
  dasharray: string;
  dashoffset: number;
  percent: number;
}

@Component({
  selector: 'app-score-pie',
  standalone: true,
  templateUrl: './score-pie.html',
  styleUrl: './score-pie.css',
})
export class ScorePieComponent {
  slices = input.required<PieSlice[]>();
  centerLabel = input<string>('');
  centerSub = input<string>('');

  readonly radius = 42;
  readonly circumference = 2 * Math.PI * 42;

  total = computed(() => this.slices().reduce((sum, s) => sum + s.value, 0));

  segments = computed<PieSegment[]>(() => {
    const total = this.total();
    const c = this.circumference;
    let acc = 0;
    return this.slices().map((s) => {
      const frac = total > 0 ? s.value / total : 0;
      const len = frac * c;
      const seg: PieSegment = {
        ...s,
        dasharray: `${len} ${c - len}`,
        dashoffset: -acc,
        percent: Math.round(frac * 100),
      };
      acc += len;
      return seg;
    });
  });
}
