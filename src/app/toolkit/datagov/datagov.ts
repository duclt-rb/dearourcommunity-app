import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucidePlus, LucideRotateCcw, LucideTrash2, LucideTriangleAlert } from '@lucide/angular';
import { localePick } from '../../core/i18n/locale';
import LogoComponent from '../../shared/logo/logo';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { PieSlice, ScorePieComponent } from '../shared/score-pie/score-pie';
import { SegmentedFieldComponent } from '../shared/segmented-field/segmented-field';
import { SelectFieldComponent } from '../shared/select-field/select-field';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { TextareaFieldComponent } from '../shared/textarea-field/textarea-field';
import { DataGovStore } from './datagov.store';
import {
  ASSESSMENT_OPTIONS,
  DataGovToolkitConfig,
  LEGAL_BASIS_OPTIONS,
  SENSITIVE_OPTIONS,
  SEVERITY_OPTIONS,
  STATUS_OPTIONS,
  TRANSFER_OPTIONS,
} from './datagov.types';

interface Step {
  kind: 'datamap' | 'assessment' | 'incident' | 'legal' | 'plan' | 'results';
  label: string;
}

@Component({
  selector: 'app-data-gov-toolkit',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    LogoComponent,
    LucideTriangleAlert,
    LucideRotateCcw,
    LucidePlus,
    LucideTrash2,
    TextFieldComponent,
    TextareaFieldComponent,
    DateFieldComponent,
    SegmentedFieldComponent,
    SelectFieldComponent,
    MeterComponent,
    ScorePieComponent,
  ],
  providers: [DataGovStore],
  templateUrl: './datagov.html',
  styleUrl: './datagov.css',
  encapsulation: ViewEncapsulation.None,
})
export default class DataGovToolkitComponent implements OnInit {
  readonly store = inject(DataGovStore);
  private readonly transloco = inject(TranslocoService);
  @Input({ required: true }) config!: DataGovToolkitConfig;

  ngOnInit(): void {
    this.store.init(this.config);
  }

  readonly assessmentOptions = ASSESSMENT_OPTIONS;
  readonly sensitiveOptions = SENSITIVE_OPTIONS;
  readonly legalBasisOptions = LEGAL_BASIS_OPTIONS;
  readonly transferOptions = TRANSFER_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;
  readonly severityOptions = SEVERITY_OPTIONS;

  readonly priorityLabels: Record<string, string> = localePick({
    vi: { critical: 'Quan trọng', important: 'Cần làm', quickwin: 'Làm ngay' },
    en: { critical: 'Critical', important: 'Important', quickwin: 'Quick win' },
  });

  steps: Step[] = [
    { kind: 'datamap', label: this.transloco.translate('toolkit.datagov.steps.datamap') },
    { kind: 'assessment', label: this.transloco.translate('toolkit.datagov.steps.assessment') },
    { kind: 'incident', label: this.transloco.translate('toolkit.datagov.steps.incident') },
    { kind: 'legal', label: this.transloco.translate('toolkit.datagov.steps.legal') },
    { kind: 'plan', label: this.transloco.translate('toolkit.common.stepPlan90') },
    { kind: 'results', label: this.transloco.translate('toolkit.datagov.steps.results') },
  ];

  /** Light pastel color per assessment group. */
  readonly sectionColors: Record<string, string> = {
    collect: '#a7f3d0',
    transparency: '#bfdbfe',
    security: '#fde68a',
    rights: '#ddd6fe',
    thirdparty: '#fbcfe8',
    governance: '#99f6e4',
  };

  /** Achieved points per group, mapped to pie slices. */
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
}
