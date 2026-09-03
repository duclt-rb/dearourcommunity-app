import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
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
import { defaultScoreOptions, ScoreScaleComponent } from '../shared/score-scale/score-scale';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { QuickScanStore, Step } from './quick-scan.store';
import { ActionPlanField, PillarKey, QuickScanConfig } from './quick-scan.types';
import { localePick } from '../../core/i18n/locale';

/** A distinct, lighter hue per pillar (E = green, S = blue, G = brand purple). */
const PILLAR_COLORS: Record<PillarKey, string> = {
  environment: 'var(--color-success-300)',
  social: 'var(--color-info-300)',
  governance: 'var(--color-warning-300)',
};

/**
 * Action-plan status choices. `value` giữ nguyên chuỗi TIẾNG VIỆT vì đó là giá trị
 * đã persist trong localStorage của người dùng cũ — chỉ `label` được dịch theo locale.
 */
const PLAN_STATUS_VALUES = ['Chưa bắt đầu', 'Đang làm', 'Hoàn thành'] as const;
const PLAN_STATUS_OPTIONS: { value: string; label: string }[] = PLAN_STATUS_VALUES.map(
  (value, i) => ({
    value,
    label: localePick<readonly string[]>({
      vi: PLAN_STATUS_VALUES,
      en: ['Not started', 'In progress', 'Done'],
    })[i],
  }),
);

@Component({
  selector: 'app-quick-scan',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
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
  private readonly transloco = inject(TranslocoService);
  readonly scaleOptions = defaultScoreOptions(this.transloco);

  /** Status choices for the action-plan rows (values stay stable, labels localized). */
  readonly statusOptions = PLAN_STATUS_OPTIONS;

  /** Persist an action-plan cell edit from a native input/select event. */
  onPlanInput(area: string, field: ActionPlanField, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    this.store.setActionPlan(area, field, target.value);
  }

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
      const ok = window.confirm(this.transloco.translate('toolkit.quickScan.confirmReset'));
      if (!ok) return;
    }
    this.store.reset();
  }
}
