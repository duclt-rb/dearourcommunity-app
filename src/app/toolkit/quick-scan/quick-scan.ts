import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import {
  LucideLandmark,
  LucideLeaf,
  LucideRotateCcw,
  LucideTriangleAlert,
  LucideUsers,
} from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';
import { BoolFieldComponent } from '../shared/bool-field/bool-field';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { PriorityBadgeComponent } from '../shared/priority-badge/priority-badge';
import { PieSlice, ScorePieComponent } from '../shared/score-pie/score-pie';
import { SCORE_SCALE_OPTIONS, ScoreScaleComponent } from '../shared/score-scale/score-scale';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { QuickScanStore, Step } from './quick-scan.store';
import { PillarKey, QuickScanConfig } from './quick-scan.types';

/** A distinct, lighter hue per pillar (E = green, S = blue, G = brand purple). */
const PILLAR_COLORS: Record<PillarKey, string> = {
  environment: 'var(--color-success-300)',
  social: 'var(--color-info-300)',
  governance: 'var(--color-warning-300)',
};

@Component({
  selector: 'app-quick-scan',
  standalone: true,
  imports: [
    CommonModule,
    LucideLeaf,
    LucideUsers,
    LucideLandmark,
    LucideTriangleAlert,
    LucideRotateCcw,
    LogoComponent,
    ScoreScaleComponent,
    TextFieldComponent,
    DateFieldComponent,
    BoolFieldComponent,
    MeterComponent,
    PriorityBadgeComponent,
    ScorePieComponent,
  ],
  providers: [QuickScanStore], // Feature-scoped store: a fresh instance per quick-scan
  templateUrl: './quick-scan.html',
  styleUrl: './quick-scan.css',
  encapsulation: ViewEncapsulation.None,
})
export class QuickScanComponent {
  config = input.required<QuickScanConfig>();

  readonly store = inject(QuickScanStore);
  readonly scaleOptions = SCORE_SCALE_OPTIONS;

  /** Pillar scores mapped to pie slices for the results chart. */
  pieSlices = computed<PieSlice[]>(() =>
    this.store.results().map((r) => ({
      label: r.label,
      value: r.score,
      color: PILLAR_COLORS[r.key],
    })),
  );

  colorFor(key: PillarKey): string {
    return PILLAR_COLORS[key];
  }

  /** Section color for a stepper segment (pillars colored, others use brand purple). */
  stepColor(step: Step): string {
    if (step.kind === 'pillar' && step.pillarIndex != null) {
      const pillar = this.config().pillars[step.pillarIndex];
      if (pillar) return PILLAR_COLORS[pillar.key];
    }
    return 'var(--color-primary)';
  }

  constructor() {
    // Keep the store's config in sync with the input.
    effect(() => this.store.setConfig(this.config()));
  }

  /** Clear all answers and progress after confirmation. */
  resetScan(): void {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Làm lại bài test? Toàn bộ câu trả lời và tiến độ sẽ bị xóa.');
      if (!ok) return;
    }
    this.store.reset();
  }
}
