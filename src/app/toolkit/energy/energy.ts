import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
import { EnergyStore } from './energy.store';
import {
  ACTION_STATUS_OPTIONS,
  ASSESSMENT_OPTIONS,
  EnergyToolkitConfig,
  PRIORITY_OPTIONS,
} from './energy.types';

interface Step {
  kind: 'map' | 'assessment' | 'equipment' | 'savings' | 'tracking' | 'plan' | 'results';
  label: string;
}

@Component({
  selector: 'app-energy-toolkit',
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
  providers: [EnergyStore],
  templateUrl: './energy.html',
  styleUrl: './energy.css',
  encapsulation: ViewEncapsulation.None,
})
export default class EnergyToolkitComponent implements OnInit {
  readonly store = inject(EnergyStore);
  @Input({ required: true }) config!: EnergyToolkitConfig;

  ngOnInit(): void {
    this.store.init(this.config);
  }

  readonly assessmentOptions = ASSESSMENT_OPTIONS;
  readonly actionStatusOptions = ACTION_STATUS_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;

  readonly monthFullLabels = [
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
  ];
  readonly months = Array.from({ length: 12 }, (_, i) => i);

  readonly priorityLabels: Record<string, string> = {
    critical: 'Quan trọng',
    important: 'Cần làm',
    quickwin: 'Làm ngay',
  };

  steps: Step[] = [
    { kind: 'map', label: 'Bản đồ NL' },
    { kind: 'assessment', label: 'Đánh giá' },
    { kind: 'savings', label: 'Cơ hội' },
    { kind: 'equipment', label: 'Kiểm kê' },
    { kind: 'tracking', label: 'Theo dõi' },
    { kind: 'plan', label: 'Kế hoạch 90 ngày' },
    { kind: 'results', label: 'Kết quả' },
  ];

  /** Light pastel color per assessment section. */
  readonly sectionColors: Record<string, string> = {
    monitor: '#bfdbfe',
    production: '#c7d2fe',
    hvac: '#a5f3fc',
    kitchen: '#fed7aa',
    lighting: '#fde68a',
    renewable: '#bbf7d0',
    governance: '#ddd6fe',
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
      const ok = window.confirm('Làm lại từ đầu? Toàn bộ dữ liệu bạn đã nhập sẽ bị xóa.');
      if (!ok) return;
    }
    this.store.reset();
  }

  /** Format a number with VN thousands separators. */
  vnd(value: number): string {
    return Math.round(value).toLocaleString('vi-VN');
  }
  num(value: number, digits = 1): string {
    return Number(value.toFixed(digits)).toLocaleString('vi-VN');
  }

  /** Parse a raw text input to number | null. */
  toNum(value: string): number | null {
    return value === '' ? null : +value;
  }
}
