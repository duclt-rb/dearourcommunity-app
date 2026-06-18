import { CommonModule } from '@angular/common';
import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { LucideRotateCcw, LucideTriangleAlert } from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { NumberFieldComponent } from '../shared/number-field/number-field';
import { PieSlice, ScorePieComponent } from '../shared/score-pie/score-pie';
import { SegmentedFieldComponent } from '../shared/segmented-field/segmented-field';
import { SelectFieldComponent } from '../shared/select-field/select-field';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { TextareaFieldComponent } from '../shared/textarea-field/textarea-field';
import { WASTE_TOOLKIT } from './waste.data';
import { MONTHS, WasteStore, WEEKS } from './waste.store';
import {
  ACTION_STATUS_OPTIONS,
  ASSESSMENT_OPTIONS,
  COMPLIANT_OPTIONS,
  CONTRACTOR_SCALE,
  DISPOSAL_OPTIONS,
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
export default class WasteToolkitComponent {
  readonly store = inject(WasteStore);
  readonly config = WASTE_TOOLKIT;

  readonly assessmentOptions = ASSESSMENT_OPTIONS;
  readonly yesNoOptions = YES_NO_OPTIONS;
  readonly disposalOptions = DISPOSAL_OPTIONS;
  readonly compliantOptions = COMPLIANT_OPTIONS;
  readonly contractorScale = CONTRACTOR_SCALE;
  readonly actionStatusOptions = ACTION_STATUS_OPTIONS;

  readonly weeks = Array.from({ length: WEEKS }, (_, i) => i);
  readonly months = Array.from({ length: MONTHS }, (_, i) => i);
  readonly monthLabels = [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
  ];

  readonly priorityLabels: Record<string, string> = {
    critical: 'Quan trọng nhất',
    important: 'Quan trọng',
    quickwin: 'Dễ làm ngay',
  };

  readonly steps: Step[] = [
    { kind: 'mapping', label: 'Bản đồ' },
    { kind: 'assessment', label: 'Đánh giá' },
    { kind: 'contractor', label: 'Nhà thầu' },
    { kind: 'food', label: 'Rác thực phẩm' },
    { kind: 'dashboard', label: 'Dashboard' },
    { kind: 'plan', label: 'Kế hoạch 90 ngày' },
    { kind: 'results', label: 'Kết quả' },
  ];

  /** Light pastel color per assessment section. */
  readonly sectionColors: Record<string, string> = {
    separation: '#a7f3d0',
    contractor: '#bfdbfe',
    storage: '#fde68a',
    staff: '#ddd6fe',
    food: '#fbcfe8',
    pollution: '#99f6e4',
  };

  /** Assessment achieved points per section, mapped to pie slices. */
  pieSlices = computed<PieSlice[]>(() =>
    this.store.assessmentResults().map((r) => ({
      label: r.topic,
      value: r.full + r.partial * 0.5,
      color: this.sectionColors[r.id] ?? 'var(--color-primary-300)',
    })),
  );

  /** Light pastel color per wizard step (used by the progress bar). */
  private readonly stepColors: Record<Step['kind'], string> = {
    mapping: '#a7f3d0',
    assessment: '#bfdbfe',
    contractor: '#fde68a',
    food: '#ddd6fe',
    dashboard: '#fbcfe8',
    plan: '#99f6e4',
    results: '#fdba74',
  };

  stepColor(step: Step): string {
    return this.stepColors[step.kind];
  }

  totalSteps = this.steps.length;
  currentStepData = computed<Step>(() => this.steps[this.store.currentStep()]);
  isFirstStep = computed(() => this.store.currentStep() === 0);
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
      const ok = window.confirm('Làm lại từ đầu? Toàn bộ dữ liệu bạn đã nhập sẽ bị xóa.');
      if (!ok) return;
    }
    this.store.reset();
  }

  /** Format a number with VN thousands separators. */
  vnd(value: number): string {
    return Math.round(value).toLocaleString('vi-VN');
  }
  num(value: number): string {
    return Number(value.toFixed(1)).toLocaleString('vi-VN');
  }
}
