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
import { LucideFileText, LucideRotateCcw } from '@lucide/angular';
import { intlLocale } from '../../core/i18n/locale';
import LogoComponent from '../../shared/logo/logo';
import { DateFieldComponent } from '../shared/date-field/date-field';
import { MeterComponent } from '../shared/meter/meter';
import { SegmentedFieldComponent } from '../shared/segmented-field/segmented-field';
import { SelectFieldComponent, SelectOption } from '../shared/select-field/select-field';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { GapItem } from './csi.logic';
import { CsiStore } from './csi.store';
import {
  CSI_PROGRESS_VALUES,
  CSI_YES_NO_VALUES,
  CsiLevel,
  CsiPart,
  CsiPriority,
  CsiQuestion,
  CsiStatus,
  CsiToolkitConfig,
  SegmentOptionLite,
} from './csi.types';

type StepKind =
  | 'guide'
  | 'profile'
  | 'part'
  | 'results'
  | 'gap'
  | 'documents'
  | 'glossary'
  | 'about';

interface Step {
  kind: StepKind;
  label: string;
  /** Bước câu hỏi: Phần 1–4. */
  partNo?: 1 | 2 | 3 | 4;
}

/** Màu chip — tái dùng tone critical/important/quickwin/neutral của các toolkit khác. */
const STATUS_TONE: Record<CsiStatus, string> = {
  have: 'is-quickwin',
  attention: 'is-important',
  fix: 'is-critical',
  missing: 'is-critical',
  na: 'is-neutral',
  unanswered: 'is-neutral',
};
const PRIORITY_TONE: Record<Exclude<CsiPriority, ''>, string> = {
  fix: 'is-critical',
  missing: 'is-important',
  advanced: 'is-neutral',
  attention: 'is-important',
  unanswered: 'is-neutral',
};
const LEVEL_TONE: Record<CsiLevel, string> = {
  ready: 'is-ready',
  near: 'is-near',
  not: 'is-not',
  nodata: 'is-nodata',
  partial: 'is-nodata',
};

@Component({
  selector: 'app-csi-toolkit',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoPipe,
    LogoComponent,
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

  readonly statusTone = STATUS_TONE;
  readonly levelTone = LEVEL_TONE;

  /** Danh sách lựa chọn dựng 1 lần (select-field nhận input mảng → tránh tạo mới mỗi lần render). */
  private rangeOptions = new Map<string, SelectOption[]>();
  private profileOptions = new Map<string, SelectOption[]>();

  ngOnInit(): void {
    this.store.init(this.config);
    for (const part of this.config.parts) {
      for (const g of part.groups) {
        for (const q of g.questions) {
          if (q.options) {
            this.rangeOptions.set(
              q.num,
              q.options.map((o, i) => ({ value: String(i), label: o.label })),
            );
          }
        }
      }
    }
    for (const f of this.config.profile.fields) {
      if (f.options) {
        this.profileOptions.set(
          f.id,
          f.options.map((o, i) => ({ value: String(i), label: o.label })),
        );
      }
    }
    // Payload localStorage sai (bước ngoài phạm vi) → kẹp về bước hợp lệ để stepper, % và nội dung khớp nhau.
    const step = this.store.currentStep();
    if (!Number.isInteger(step) || step < 0 || step >= this.totalSteps) {
      this.store.goToStep(Number.isInteger(step) ? step : 0, this.totalSteps);
    }
  }

  private t(key: string): string {
    return this.transloco.translate(`toolkit.csi.${key}`);
  }

  /** Trả lời có/không: Có · Chưa có · Không áp dụng. */
  readonly yesNoOptions: SegmentOptionLite[] = CSI_YES_NO_VALUES.map((value) => ({
    value,
    label: this.t(`answer.${value}`),
  }));
  readonly progressOptions: SegmentOptionLite[] = CSI_PROGRESS_VALUES.map((value) => ({
    value,
    label: this.t(`progress.${value}`),
  }));
  /** Bộ lọc ưu tiên của trang Khoảng cách cần lấp ('' = tất cả). */
  readonly priorityFilters: SegmentOptionLite[] = [
    { value: '', label: this.t('priority.all') },
    ...(['fix', 'missing', 'advanced', 'attention', 'unanswered'] as const).map((value) => ({
      value,
      label: this.t(`priority.${value}`),
    })),
  ];
  /** Tình trạng hồ sơ: Có · Chưa có · Không áp dụng (cùng nhãn với câu trả lời). */
  readonly docOptions = this.yesNoOptions;

  steps: Step[] = [
    { kind: 'guide', label: this.t('steps.guide') },
    { kind: 'profile', label: this.t('steps.profile') },
    { kind: 'part', partNo: 1, label: this.t('steps.part1') },
    { kind: 'part', partNo: 2, label: this.t('steps.part2') },
    { kind: 'part', partNo: 3, label: this.t('steps.part3') },
    { kind: 'part', partNo: 4, label: this.t('steps.part4') },
    { kind: 'results', label: this.t('steps.results') },
    { kind: 'gap', label: this.t('steps.gap') },
    { kind: 'documents', label: this.t('steps.documents') },
    { kind: 'glossary', label: this.t('steps.glossary') },
    { kind: 'about', label: this.t('steps.about') },
  ];

  totalSteps = this.steps.length;
  currentStepData = computed<Step>(() => this.steps[this.store.currentStep()]);
  isFirstStep = computed(() => this.store.currentStep() === 0);
  isLastStep = computed(() => this.store.currentStep() === this.totalSteps - 1);

  /** Completion percentage (0–100) based on how many tabs have been finished. */
  progressPercent = computed(() => {
    const last = this.totalSteps - 1;
    return last > 0 ? Math.round((this.store.currentStep() / last) * 100) : 0;
  });

  currentPart = computed<CsiPart | null>(() => {
    const no = this.currentStepData().partNo;
    return no ? (this.config.parts.find((p) => p.no === no) ?? null) : null;
  });

  /** "22 câu hỏi: 18 việc bắt buộc, 4 việc nâng cao" — đếm từ dữ liệu, không chép tay. */
  partCounts(part: CsiPart): string {
    const qs = part.groups.flatMap((g) => g.questions);
    const core = qs.filter((q) => q.kind === 'core').length;
    return this.transloco.translate('toolkit.csi.partCounts', {
      total: qs.length,
      core,
      advanced: qs.length - core,
    });
  }

  rangeOptionsOf(q: CsiQuestion): SelectOption[] {
    return this.rangeOptions.get(q.num) ?? [];
  }
  profileOptionsOf(fieldId: string): SelectOption[] {
    return this.profileOptions.get(fieldId) ?? [];
  }
  statusOf(q: CsiQuestion): CsiStatus {
    return this.store.readiness().statuses.get(q.num) ?? 'unanswered';
  }

  // ── Kết quả ──
  readonly levelLabel = (level: CsiLevel): string => this.t(`level.${level}`);
  /** "75%" hoặc "—" khi chưa có dữ liệu. */
  progressLabel(progress: number | null): string {
    if (progress === null) return this.t('noValue');
    return `${(progress * 100).toLocaleString(intlLocale(), { maximumFractionDigits: 0 })}%`;
  }
  meter(progress: number | null): number {
    return progress === null ? 0 : Math.round(progress * 100);
  }
  advLabel(done: number, total: number): string {
    return `${done} / ${total}`;
  }
  /** Nhóm không có việc nâng cao nào trả lời được → "-" như file. */
  groupAdvLabel(done: number, total: number): string {
    return total === 0 ? '-' : this.advLabel(done, total);
  }
  thresholdPercent = computed(() => Math.round(this.store.threshold() * 100));
  setThresholdPercent(raw: string): void {
    const n = Number(raw);
    if (raw !== '' && Number.isFinite(n)) this.store.setThreshold(n / 100);
  }

  readonly statusLine = computed(() => {
    const r = this.store.readiness();
    return r.unanswered > 0
      ? this.transloco.translate('toolkit.csi.statusProvisional', { count: r.unanswered })
      : this.transloco.translate('toolkit.csi.statusComplete', { count: r.coreMissing });
  });

  // ── Khoảng cách cần lấp ──
  planFilter = signal('');
  filteredGaps = computed<GapItem[]>(() => {
    const filter = this.planFilter();
    const all = this.store.readiness().gaps;
    // Mặc định (Tất cả) chỉ bỏ các việc đã có / không áp dụng — không còn khoảng cách nào để lấp.
    return filter ? all.filter((g) => g.priority === filter) : all.filter((g) => g.priority !== '');
  });
  priorityToneOf(priority: CsiPriority): string {
    return priority ? PRIORITY_TONE[priority] : 'is-neutral';
  }
  priorityLabel(priority: CsiPriority): string {
    return priority ? this.t(`priority.${priority}`) : '';
  }
  /** Câu trả lời hiện tại của một việc, dạng chữ (để hiện ở danh sách khoảng cách). */
  answerLabel(q: CsiQuestion): string {
    const v = this.store.answerOf(q.num);
    if (v === '') return this.t('status.unanswered');
    if (q.answer === 'yesno') return this.t(`answer.${v}`);
    return q.options?.[Number(v)]?.label ?? this.t('status.unanswered');
  }

  // ── Hồ sơ cần có ──
  readonly docsSummary = computed(() =>
    this.transloco.translate('toolkit.csi.docsSummary', this.store.docsSummary()),
  );

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
