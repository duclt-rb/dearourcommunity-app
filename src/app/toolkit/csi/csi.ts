import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LucideFileText, LucideLightbulb, LucideRotateCcw } from '@lucide/angular';
import { intlLocale } from '../../core/i18n/locale';
import LogoComponent from '../../shared/logo/logo';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { SegmentedFieldComponent } from '../shared/segmented-field/segmented-field';
import { SelectFieldComponent } from '../shared/select-field/select-field';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { CsiStore, GroupResult, PlanItem } from './csi.store';
import {
  ACTION_STATUS_OPTIONS,
  CSI_ANSWER_OPTIONS,
  CSI_PRIORITY_FILTERS,
  CSI_PRIORITY_LABELS,
  CSI_YES_NO_OPTIONS,
  CsiDocPage,
  CsiPriority,
  CsiSection,
  CsiSectionId,
  CsiIndicator,
  CsiToolkitConfig,
  priorityFor,
} from './csi.types';

type StepKind = 'guide' | 'intro' | 'glossary' | 'profile' | 'section' | 'dashboard' | 'plan';

interface Step {
  kind: StepKind;
  label: string;
  /** Bước chỉ số: phần I / G / E / LS. */
  sectionId?: CsiSectionId;
}

/** Màu chip mức ưu tiên — tái dùng tone critical/important/quickwin của các toolkit khác. */
const PRIORITY_TONE: Record<CsiPriority, string> = {
  high: 'is-critical',
  medium: 'is-important',
  done: 'is-quickwin',
  unrated: 'is-neutral',
  na: 'is-neutral',
};

@Component({
  selector: 'app-csi-toolkit',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    LogoComponent,
    LucideLightbulb,
    LucideFileText,
    LucideRotateCcw,
    TextFieldComponent,
    DateFieldComponent,
    SegmentedFieldComponent,
    SelectFieldComponent,
    MeterComponent,
  ],
  providers: [CsiStore],
  templateUrl: './csi.html',
  styleUrl: './csi.css',
  encapsulation: ViewEncapsulation.None,
})
export default class CsiToolkitComponent implements OnInit {
  readonly store = inject(CsiStore);
  private readonly transloco = inject(TranslocoService);
  @Input({ required: true }) config!: CsiToolkitConfig;

  ngOnInit(): void {
    this.store.init(this.config);
    // Payload localStorage cũ/sai (bước ngoài phạm vi) → kẹp về bước hợp lệ để stepper, % và
    // nội dung luôn khớp nhau.
    const step = this.store.currentStep();
    if (!Number.isInteger(step) || step < 0 || step >= this.totalSteps) {
      this.store.goToStep(Number.isInteger(step) ? step : 0, this.totalSteps);
    }
  }

  readonly answerOptions = CSI_ANSWER_OPTIONS;
  readonly yesNoOptions = CSI_YES_NO_OPTIONS;
  readonly statusOptions = ACTION_STATUS_OPTIONS;
  readonly priorityFilters = CSI_PRIORITY_FILTERS;
  readonly priorityLabels = CSI_PRIORITY_LABELS;
  readonly priorityTone = PRIORITY_TONE;
  readonly years = ['y2023', 'y2024', 'y2025'] as const;

  steps: Step[] = [
    { kind: 'guide', label: this.transloco.translate('toolkit.csi.steps.guide') },
    { kind: 'intro', label: this.transloco.translate('toolkit.csi.steps.intro') },
    { kind: 'glossary', label: this.transloco.translate('toolkit.csi.steps.glossary') },
    { kind: 'profile', label: this.transloco.translate('toolkit.csi.steps.profile') },
    { kind: 'section', sectionId: 'I', label: this.transloco.translate('toolkit.csi.steps.I') },
    { kind: 'section', sectionId: 'G', label: this.transloco.translate('toolkit.csi.steps.G') },
    { kind: 'section', sectionId: 'E', label: this.transloco.translate('toolkit.csi.steps.E') },
    { kind: 'section', sectionId: 'LS', label: this.transloco.translate('toolkit.csi.steps.LS') },
    { kind: 'dashboard', label: this.transloco.translate('toolkit.csi.steps.dashboard') },
    { kind: 'plan', label: this.transloco.translate('toolkit.csi.steps.plan') },
  ];

  totalSteps = this.steps.length;
  currentStepData = computed<Step>(() => this.steps[this.store.currentStep()]);
  isFirstStep = computed(() => this.store.currentStep() === 0);

  /** Completion percentage (0–100) based on how many tabs have been finished. */
  progressPercent = computed(() => {
    const last = this.totalSteps - 1;
    return last > 0 ? Math.round((this.store.currentStep() / last) * 100) : 0;
  });

  /** Trang đọc của bước hiện tại (Hướng dẫn / Giới thiệu CSI / Thuật ngữ). */
  currentDoc = computed<CsiDocPage | null>(() => {
    const kind = this.currentStepData().kind;
    if (kind === 'guide') return this.config.guide;
    if (kind === 'intro') return this.config.intro;
    if (kind === 'glossary') return this.config.glossary;
    return null;
  });

  currentSection = computed<CsiSection | null>(() => {
    const id = this.currentStepData().sectionId;
    return id ? (this.config.sections.find((s) => s.id === id) ?? null) : null;
  });

  private groupById = computed(
    () => new Map(this.store.groupResults().map((g) => [g.id, g] as const)),
  );
  groupResult(id: string): GroupResult | undefined {
    return this.groupById().get(id);
  }

  /** Tổng của phần đang mở (dòng TỔNG CỘNG cuối sheet chỉ số). */
  sectionTotal = computed(() => {
    const id = this.currentStepData().sectionId;
    return id ? this.store.partResults().find((p) => p.id === id) : undefined;
  });

  // ── Kế hoạch hành động ──
  planFilter = signal('');
  filteredPlan = computed<PlanItem[]>(() => {
    const filter = this.planFilter();
    const items = this.store.planItems();
    return filter ? items.filter((p) => p.priority === filter) : items;
  });

  /** Mức ưu tiên của một chỉ số theo câu trả lời hiện tại. */
  priorityOf(ind: CsiIndicator): CsiPriority {
    return priorityFor(ind.level, this.store.answerOf(ind.id));
  }

  /** "Mức độ hiện tại" = câu trả lời hiện tại, hoặc "Chưa đánh giá". */
  answerLabel(answer: string): string {
    return this.answerOptions.find((o) => o.value === answer)?.label ?? this.priorityLabels.unrated;
  }

  /** Số cột của bảng trang đọc khi xếp chồng trên mobile: ô nội dung dài → 1 cột. */
  docCols(block: { rows: string[][] }): 1 | 2 {
    return block.rows.some((row) => row.slice(1).some((c) => c.length > 40)) ? 1 : 2;
  }

  /** Dòng con trong bảng gốc được thụt đầu dòng bằng khoảng trắng (vd "    Phần I: …"). */
  isIndented(cell: string): boolean {
    return /^\s+/.test(cell);
  }

  /** Tỷ lệ sẵn sàng hiển thị 1 chữ số thập phân như file (vd "0.0%"). */
  percent(rate: number): string {
    return (rate * 100).toLocaleString(intlLocale(), {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }
  /** Tỷ lệ 0–1 → 0–100 cho `app-meter`. */
  meter(rate: number): number {
    return Math.round(rate * 1000) / 10;
  }
  score(value: number): string {
    return Math.round(value).toLocaleString(intlLocale());
  }

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
