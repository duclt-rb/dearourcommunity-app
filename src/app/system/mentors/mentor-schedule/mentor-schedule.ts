import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import {
  LucideAlertCircle,
  LucideCalendarClock,
  LucideCheck,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideLock,
  LucidePlus,
  LucidePower,
  LucideTrash2,
  LucideX,
} from '@lucide/angular';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import type { MentorAvailabilitySlot } from '@dearourcommunity/client';
import type { MonthDayCell } from './mentor-schedule.store';
import { MentorScheduleStore, nowNaiveMinute, todayStr } from './mentor-schedule.store';

/** Số chip giờ tối đa hiển thị trong 1 ô ngày của grid tháng — dư ra hiện "+N nữa". */
const MONTH_CELL_MAX_CHIPS = 3;

/** Key i18n nhãn thứ đầy đủ theo getDay() (0 = CN) — heading panel chi tiết ngày. */
const WEEKDAY_FULL_KEYS = [
  'system.mentorSchedule.weekdayFull.sun',
  'system.mentorSchedule.weekdayFull.mon',
  'system.mentorSchedule.weekdayFull.tue',
  'system.mentorSchedule.weekdayFull.wed',
  'system.mentorSchedule.weekdayFull.thu',
  'system.mentorSchedule.weekdayFull.fri',
  'system.mentorSchedule.weekdayFull.sat',
];

/** Key i18n nhãn thứ ngắn theo thứ tự grid (index 0 = T2 … 6 = CN). */
const WEEKDAY_SHORT_KEYS = [
  'system.mentorSchedule.weekdayShort.mon',
  'system.mentorSchedule.weekdayShort.tue',
  'system.mentorSchedule.weekdayShort.wed',
  'system.mentorSchedule.weekdayShort.thu',
  'system.mentorSchedule.weekdayShort.fri',
  'system.mentorSchedule.weekdayShort.sat',
  'system.mentorSchedule.weekdayShort.sun',
];

/** Trạng thái hiển thị của một slot (AMENDMENT 1). */
type SlotStatus = 'booked' | 'past' | 'inactive' | 'available';

/** Key i18n nhãn ngắn cho badge trong panel ngày. */
const SLOT_STATUS_SHORT: Record<SlotStatus, string> = {
  booked: 'system.mentorSchedule.statusShort.booked',
  past: 'system.mentorSchedule.statusShort.past',
  inactive: 'system.mentorSchedule.statusShort.inactive',
  available: 'system.mentorSchedule.statusShort.available',
};

/** Key i18n nhãn dài cho tooltip. */
const SLOT_STATUS_LABELS: Record<SlotStatus, string> = {
  booked: 'system.mentorSchedule.statusLabel.booked',
  past: 'system.mentorSchedule.statusLabel.past',
  inactive: 'system.mentorSchedule.statusLabel.inactive',
  available: 'system.mentorSchedule.statusLabel.available',
};

/** Date của p-datepicker → 'HH:mm' bằng getHours/getMinutes (naive, KHÔNG dùng toISOString/timezone). */
function dateToHm(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Giờ mặc định cho ô chọn giờ — luôn 08:00 (chỉ phần giờ được dùng vì timeOnly). */
function defaultPickTime(): Date {
  const d = new Date();
  d.setHours(8, 0, 0, 0);
  return d;
}

/**
 * Card quản lý lịch khả dụng của MỘT mentor — component NHÚNG (embeddable).
 * Nhận `mentorId` qua input; nhúng trong màn Quản lý mentor (system/mentors),
 * render dưới form edit. Đổi `mentorId` → store tự reset khối lịch + tải lại tháng.
 *
 * Chỉ có XEM THÁNG: grid tháng (chip read-only) + panel chi tiết ngày (mở khi click ô,
 * chứa toàn bộ action toggle/xoá/thêm giờ) + pattern generator "Thêm nhiều khung giờ".
 */
@Component({
  selector: 'app-mentor-schedule',
  standalone: true,
  imports: [
    FormsModule,
    DatePicker,
    TranslocoPipe,
    LucideAlertCircle,
    LucideCalendarClock,
    LucideCheck,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideLock,
    LucidePlus,
    LucidePower,
    LucideTrash2,
    LucideX,
  ],
  providers: [MentorScheduleStore],
  templateUrl: './mentor-schedule.html',
  styleUrl: './mentor-schedule.css',
  // None để CSS override được phần tử bên trong p-datepicker —
  // mọi selector trong mentor-schedule.css đều nằm dưới .mentor-schedule nên không leak.
  encapsulation: ViewEncapsulation.None,
})
export class MentorScheduleComponent {
  private store = inject(MentorScheduleStore);
  private transloco = inject(TranslocoService);

  /** Mentor đang quản lý lịch — component cha (màn Quản lý mentor) truyền vào. */
  readonly mentorId = input.required<string>();

  // ── Lịch khả dụng (alias signal của store để template dùng trực tiếp) ──
  readonly monthDays = this.store.monthDays;
  readonly isCurrentMonth = this.store.isCurrentMonth;
  readonly isLoadingSlots = this.store.isLoadingSlots;
  readonly slotsError = this.store.slotsError;
  readonly slotNotice = this.store.slotNotice;
  readonly slotActionError = this.store.slotActionError;
  readonly isCreatingSlots = this.store.isCreatingSlots;
  readonly slotActionId = this.store.slotActionId;
  readonly confirmDeleteSlotId = this.store.confirmDeleteSlotId;
  readonly toggleSlot = this.store.toggleSlot;
  readonly requestDeleteSlot = this.store.requestDeleteSlot;
  readonly cancelDeleteSlot = this.store.cancelDeleteSlot;
  readonly confirmDeleteSlot = this.store.confirmDeleteSlot;
  readonly changeMonth = this.store.changeMonth;
  readonly goToCurrentMonth = this.store.goToCurrentMonth;

  // Panel chi tiết ngày
  readonly selectedDate = this.store.selectedDate;
  readonly selectedDaySlots = this.store.selectedDaySlots;
  readonly closeDay = this.store.closeDay;

  // Pattern generator "Thêm nhiều khung giờ"
  readonly composeOpen = this.store.composeOpen;
  readonly composeWeekdays = this.store.composeWeekdays;
  readonly composeTimes = this.store.composeTimes;
  readonly composeWeeksAhead = this.store.composeWeeksAhead;
  readonly composePreviewCount = this.store.composePreviewCount;
  readonly toggleComposeOpen = this.store.toggleComposeOpen;
  readonly toggleComposeWeekday = this.store.toggleComposeWeekday;
  readonly removeComposeTime = this.store.removeComposeTime;
  readonly setComposeWeeksAhead = this.store.setComposeWeeksAhead;
  readonly clearCompose = this.store.clearCompose;
  readonly submitCompose = this.store.submitCompose;

  /** Nhãn tháng đang xem — vd "Tháng 7/2026". */
  readonly monthLabel = computed(() => {
    const anchor = this.store.monthAnchor();
    return this.transloco.translate('system.mentorSchedule.monthLabel', {
      month: Number(anchor.slice(5, 7)),
      year: anchor.slice(0, 4),
    });
  });

  /** Key i18n nhãn thứ cho hàng header của grid tháng (T2→CN, khớp cột grid). */
  readonly monthWeekdayHeaders = WEEKDAY_SHORT_KEYS;

  /** Key i18n nút chọn THỨ của pattern generator (index 0 = T2 … 6 = CN). */
  readonly composeWeekdayOptions = WEEKDAY_SHORT_KEYS;

  /** Select "Áp dụng trong N tuần tới" của pattern generator (label dịch ở template). */
  readonly weeksAheadOptions: number[] = [1, 2, 4, 8, 12];

  readonly today = todayStr();

  // ── PrimeNG PassThrough — style inline theo design token (hover/focus do CSS override) ──

  /** p-datepicker timeOnly (compose + panel ngày) — khớp .form-input, cao 44px. */
  readonly timePickerPt = {
    pcInputText: {
      root: {
        style: `
          width: 100%;
          height: 44px;
          padding: 0 16px;
          border: 1.5px solid var(--color-border-input);
          border-radius: 12px;
          background: var(--color-bg-input);
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          font-variant-numeric: tabular-nums;
          color: var(--color-text);
          outline: none;
          box-shadow: none;
          transition: all 0.2s;
        `,
      },
    },
  };

  constructor() {
    // mentorId đổi (admin chọn mentor khác trong list) → reset khối lịch + tải tháng hiện tại.
    // selectMentor tự bỏ qua khi id không đổi và vô hiệu response slot đang bay của mentor cũ.
    effect(() => {
      this.store.selectMentor(this.mentorId());
    });
  }

  // ── Giờ đang chọn trong pattern generator (Date của p-datepicker, chưa bấm "Thêm giờ") ──
  readonly composeTimeDraft = signal<Date | null>(defaultPickTime());

  addComposeTime() {
    const draft = this.composeTimeDraft();
    if (!draft) return;
    this.store.addComposeTime(dateToHm(draft));
    this.composeTimeDraft.set(defaultPickTime());
  }

  // ── Panel chi tiết ngày ──

  /** Giờ đang chọn trong ô thêm giờ của panel ngày. */
  readonly dayAddTime = signal<Date | null>(defaultPickTime());

  openDay(date: string) {
    this.dayAddTime.set(defaultPickTime());
    this.store.openDay(date);
  }

  /** Nút "+" trên ô ngày tương lai: mở panel ngày đó + focus sẵn ô thêm giờ. */
  openDayAndFocusAdd(date: string) {
    this.dayAddTime.set(defaultPickTime());
    if (this.selectedDate() !== date) this.store.openDay(date);
    // Panel render sau khi signal cập nhật — focus input (inputId) ở tick kế tiếp
    setTimeout(() => document.getElementById('day-add-time')?.focus());
  }

  async submitDayAdd() {
    const date = this.selectedDate();
    const time = this.dayAddTime();
    if (!date || !time || this.isCreatingSlots()) return;
    const ok = await this.store.quickAddSlot(date, dateToHm(time));
    // Thành công thì reset input về 08:00 để thêm tiếp giờ khác; lỗi giữ nguyên để sửa
    if (ok) this.dayAddTime.set(defaultPickTime());
  }

  /** Heading panel — vd "Thứ 2, 14/07/2026". */
  dayHeading(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    const weekday = this.transloco.translate(WEEKDAY_FULL_KEYS[new Date(y, m - 1, d).getDay()]);
    return `${weekday}, ${date.slice(8, 10)}/${date.slice(5, 7)}/${y}`;
  }

  // ── Helper hiển thị (thao tác chuỗi naive, KHÔNG convert timezone — A1-6) ──

  /** Trạng thái slot — ưu tiên: Đã đặt > Đã qua > Đã tắt > Trống. */
  slotStatus(slot: MentorAvailabilitySlot): SlotStatus {
    if (slot.bookedBookingId) return 'booked';
    if (slot.startAt.slice(0, 16) < nowNaiveMinute()) return 'past';
    if (!slot.isActive) return 'inactive';
    return 'available';
  }

  slotStatusLabel(slot: MentorAvailabilitySlot): string {
    return this.transloco.translate(SLOT_STATUS_LABELS[this.slotStatus(slot)]);
  }

  slotStatusShort(slot: MentorAvailabilitySlot): string {
    return this.transloco.translate(SLOT_STATUS_SHORT[this.slotStatus(slot)]);
  }

  /** Giờ bắt đầu 'HH:mm' — cắt trực tiếp từ chuỗi naive, KHÔNG parse qua Date (A1-6). */
  slotTime(slot: MentorAvailabilitySlot): string {
    return slot.startAt.slice(11, 16);
  }

  /** 'dd/MM' từ 'YYYY-MM-DD'. */
  dayNum(date: string): string {
    return `${date.slice(8, 10)}/${date.slice(5, 7)}`;
  }

  isToday(date: string): boolean {
    return date === this.today;
  }

  isPastDay(date: string): boolean {
    return date < this.today;
  }

  /** Số ngày trong tháng (bỏ số 0 đầu) — hiển thị góc ô. */
  dayOfMonth(date: string): number {
    return Number(date.slice(8, 10));
  }

  /** Tối đa MONTH_CELL_MAX_CHIPS chip giờ mỗi ô — phần dư hiện "+N nữa". */
  visibleMonthSlots(day: MonthDayCell): MentorAvailabilitySlot[] {
    return day.slots.slice(0, MONTH_CELL_MAX_CHIPS);
  }

  hiddenMonthCount(day: MonthDayCell): number {
    return Math.max(0, day.slots.length - MONTH_CELL_MAX_CHIPS);
  }
}
