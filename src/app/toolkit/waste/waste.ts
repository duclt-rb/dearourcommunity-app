import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucideRotateCcw, LucideTriangleAlert } from '@lucide/angular';
import { intlLocale, localePick } from '../../core/i18n/locale';
import LogoComponent from '../../shared/logo/logo';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { NumberFieldComponent } from '../shared/number-field/number-field';
import { PieSlice, ScorePieComponent } from '../shared/score-pie/score-pie';
import { SegmentedFieldComponent } from '../shared/segmented-field/segmented-field';
import { SelectFieldComponent } from '../shared/select-field/select-field';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { TextareaFieldComponent } from '../shared/textarea-field/textarea-field';
import { WasteStore, WEEKS } from './waste.store';
import {
  ACTION_STATUS_OPTIONS,
  ASSESSMENT_OPTIONS,
  COMPLIANT_OPTIONS,
  CONTRACTOR_SCALE,
  DISPOSAL_OPTIONS,
  PRIORITY_OPTIONS,
  WasteToolkitConfig,
  YES_NO_OPTIONS,
} from './waste.types';

interface Step {
  kind: 'mapping' | 'assessment' | 'contractor' | 'food' | 'dashboard' | 'plan' | 'results';
  label: string;
}

@Component({
  selector: 'app-waste-toolkit',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    LogoComponent,
    LucideTriangleAlert,
    LucideRotateCcw,
    TextFieldComponent,
    DateFieldComponent,
    NumberFieldComponent,
    SegmentedFieldComponent,
    SelectFieldComponent,
    TextareaFieldComponent,
    MeterComponent,
    ScorePieComponent,
  ],
  providers: [WasteStore],
  templateUrl: './waste.html',
  styleUrl: './waste.css',
  encapsulation: ViewEncapsulation.None,
})
export default class WasteToolkitComponent implements OnInit {
  readonly store = inject(WasteStore);
  private readonly transloco = inject(TranslocoService);
  @Input({ required: true }) config!: WasteToolkitConfig;

  ngOnInit(): void {
    this.store.init(this.config);
    // The weekly tracker step is labelled per sector (food waste vs. scrap).
    this.steps = this.steps.map((s) =>
      s.kind === 'food' ? { ...s, label: this.config.tracker.stepLabel } : s,
    );
  }

  readonly assessmentOptions = ASSESSMENT_OPTIONS;
  readonly yesNoOptions = YES_NO_OPTIONS;
  readonly disposalOptions = DISPOSAL_OPTIONS;
  readonly compliantOptions = COMPLIANT_OPTIONS;
  readonly contractorScale = CONTRACTOR_SCALE;
  readonly actionStatusOptions = ACTION_STATUS_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;

  readonly weeks = Array.from({ length: WEEKS }, (_, i) => i);
  readonly monthFullLabels = localePick({
    vi: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  });

  readonly priorityLabels: Record<string, string> = localePick({
    vi: { critical: 'Quan trọng nhất', important: 'Quan trọng', quickwin: 'Dễ làm ngay' },
    en: { critical: 'Top priority', important: 'Important', quickwin: 'Quick win' },
  });
  readonly checklistPriorityLabels: Record<string, string> = localePick({
    vi: { critical: 'Bắt buộc', important: 'Quan trọng', standard: 'Tiêu chuẩn' },
    en: { critical: 'Required', important: 'Important', standard: 'Standard' },
  });

  steps: Step[] = [
    { kind: 'mapping', label: this.transloco.translate('toolkit.waste.steps.mapping') },
    { kind: 'assessment', label: this.transloco.translate('toolkit.common.stepAssessment') },
    { kind: 'contractor', label: this.transloco.translate('toolkit.waste.steps.contractor') },
    { kind: 'food', label: this.transloco.translate('toolkit.waste.steps.food') },
    { kind: 'dashboard', label: this.transloco.translate('toolkit.waste.steps.dashboard') },
    { kind: 'plan', label: this.transloco.translate('toolkit.common.stepPlan90') },
    { kind: 'results', label: this.transloco.translate('toolkit.steps.results') },
  ];

  /** Light pastel color per assessment section. */
  readonly sectionColors: Record<string, string> = {
    separation: '#a7f3d0',
    contractor: '#bfdbfe',
    storage: '#fde68a',
    staff: '#ddd6fe',
    food: '#fbcfe8',
    pollution: '#99f6e4',
    hazardous: '#fecaca',
    reduction: '#bbf7d0',
    foodwaste: '#fbcfe8',
    plastic: '#a5f3fc',
    hygiene: '#fde68a',
  };

  /** Assessment achieved points per section, mapped to pie slices. */
  pieSlices = computed<PieSlice[]>(() =>
    this.store.assessmentResults().map((r) => ({
      label: r.topic,
      value: r.full + r.partial * 0.5,
      color: this.sectionColors[r.id] ?? 'var(--color-primary-300)',
    })),
  );

  totalSteps = this.steps.length;
  currentStepData = computed<Step>(() => this.steps[this.store.currentStep()]);
  isFirstStep = computed(() => this.store.currentStep() === 0);

  /** Completion percentage (0–100) based on how many tabs have been finished. */
  progressPercent = computed(() => {
    const last = this.totalSteps - 1;
    return last > 0 ? Math.round((this.store.currentStep() / last) * 100) : 0;
  });
  isLastStep = computed(() => this.store.currentStep() === this.totalSteps - 1);

  goToStep(index: number): void {
    this.store.goToStep(index, this.totalSteps);
  }
  nextStep(): void {
    this.goToStep(this.store.currentStep() + 1);
  }
  prevStep(): void {
    this.goToStep(this.store.currentStep() - 1);
  }

  resetScan(): void {
    if (typeof window !== 'undefined') {
      const ok = window.confirm(this.transloco.translate('toolkit.common.confirmReset'));
      if (!ok) return;
    }
    this.store.reset();
  }

  /** Format a number with locale-aware thousands separators. */
  vnd(value: number): string {
    return Math.round(value).toLocaleString(intlLocale());
  }
  num(value: number): string {
    return Number(value.toFixed(1)).toLocaleString(intlLocale());
  }
}
