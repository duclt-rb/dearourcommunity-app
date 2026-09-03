import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TranslocoService } from '@jsverse/transloco';
import type { MentorAvailabilitySlot } from '@dearourcommunity/client';
import { MentorService } from '../../../core/services/mentor.service';

function toErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) {
    return err.message || fallback;
  }
  console.error('Mentor schedule action failed', err);
  return fallback;
}

// ── Helper ngày (naive giờ VN — thao tác chuỗi 'YYYY-MM-DD', không convert timezone) ──

function toDateStr(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Cộng/trừ n ngày trên chuỗi 'YYYY-MM-DD' (dùng Date local, không dính timezone UTC). */
export function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return toDateStr(new Date(y, m - 1, d + n));
}

/** Hôm nay theo đồng hồ máy (naive) — 'YYYY-MM-DD'. */
export function todayStr(): string {
  return toDateStr(new Date());
}

/** Thứ 2 của tuần chứa `dateStr` — 'YYYY-MM-DD' (tuần bắt đầu T2, dùng dựng biên grid tháng). */
export function startOfWeekStr(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const weekday = new Date(y, m - 1, d).getDay(); // 0 = CN
  return addDays(dateStr, -((weekday + 6) % 7));
}

/** Mùng 1 của tháng chứa `dateStr` — 'YYYY-MM-01'. */
export function startOfMonthStr(dateStr: string): string {
  return `${dateStr.slice(0, 7)}-01`;
}

/** Ngày cuối cùng của tháng chứa `dateStr` — 'YYYY-MM-DD'. */
export function endOfMonthStr(dateStr: string): string {
  const [y, m] = dateStr.split('-').map(Number);
  return toDateStr(new Date(y, m, 0)); // ngày 0 của tháng sau = ngày cuối tháng này
}

/** Cộng/trừ n tháng — trả về mùng 1 của tháng đích ('YYYY-MM-01'). */
function addMonths(dateStr: string, n: number): string {
  const [y, m] = dateStr.split('-').map(Number);
  return toDateStr(new Date(y, m - 1 + n, 1));
}

/** Thời điểm hiện tại dạng naive 'YYYY-MM-DDTHH:mm' — so sánh chuỗi trực tiếp với startAt. */
export function nowNaiveMinute(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${toDateStr(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Index thứ theo tuần bắt đầu T2 (0 = T2 … 6 = CN). */
function weekdayIdx(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number);
  return (new Date(y, m - 1, d).getDay() + 6) % 7;
}

/** Một ngày kèm các slot của ngày đó (đã sort theo giờ). */
export interface SlotDayGroup {
  date: string; // 'YYYY-MM-DD'
  slots: MentorAvailabilitySlot[];
}

/** Một ô ngày trong grid tháng — thêm cờ thuộc tháng đang xem hay ngày lấn từ tháng kề. */
export interface MonthDayCell extends SlotDayGroup {
  inMonth: boolean;
}

/** BE giới hạn 50 slot mỗi call — tổ hợp lớn hơn phải chia thành nhiều call tuần tự. */
const MAX_SLOTS_PER_CALL = 50;

/** BE cap limit 100/trang — grid tháng bận có thể >100 slot nên phải gom nhiều trang. */
const SLOT_PAGE_LIMIT = 100;
/** Guard vòng lặp phân trang (~1000 slot/khoảng là quá đủ cho 1 grid tháng). */
const MAX_SLOT_PAGES = 10;

const initialState = {
  // Mentor đang xem lịch (component nhúng đẩy vào qua input `mentorId`)
  selectedMentorId: null as string | null,

  // ── Lịch khả dụng của mentor đang chọn (AMENDMENT 1 — CRUD riêng) ──
  slots: [] as MentorAvailabilitySlot[],
  /** Mùng 1 của tháng đang xem ('YYYY-MM-01'). Đổi tháng = ±1. */
  monthAnchor: startOfMonthStr(todayStr()),
  /** Ngày đang mở panel chi tiết ('YYYY-MM-DD') — null = panel đóng. */
  selectedDate: null as string | null,
  isLoadingSlots: false,
  slotsError: null as string | null,
  // Thêm slot
  isCreatingSlots: false,
  /** Thông báo kết quả thêm slot — "Đã thêm X, bỏ qua Y trùng". */
  slotNotice: null as string | null,
  // Toggle / xoá từng slot
  slotActionId: null as string | null,
  slotActionError: null as string | null,
  confirmDeleteSlotId: null as string | null,
  // Panel "Thêm nhiều khung giờ" — PATTERN GENERATOR độc lập với tháng đang xem
  composeOpen: true,
  /** Các THỨ trong tuần đã chọn (0 = T2 … 6 = CN). */
  composeWeekdays: [] as number[],
  /** Danh sách giờ 'HH:mm' đã chọn (unique, sort tăng dần). */
  composeTimes: [] as string[],
  /** Áp dụng trong N tuần tới, tính từ hôm nay (cửa sổ N×7 ngày). */
  composeWeeksAhead: 1,
};

/** Reset khối state lịch khả dụng (khi đổi mentor) — gọi mỗi lần để lấy "hôm nay" mới. */
function slotsResetState() {
  return {
    slots: [] as MentorAvailabilitySlot[],
    monthAnchor: startOfMonthStr(todayStr()),
    selectedDate: null as string | null,
    isLoadingSlots: false,
    slotsError: null as string | null,
    isCreatingSlots: false,
    slotNotice: null as string | null,
    slotActionId: null as string | null,
    slotActionError: null as string | null,
    confirmDeleteSlotId: null as string | null,
    composeOpen: true,
    composeWeekdays: [] as number[],
    composeTimes: [] as string[],
    composeWeeksAhead: 1,
  };
}

export const MentorScheduleStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    // Slot group theo ngày ('YYYY-MM-DD'), mỗi nhóm sort theo giờ bắt đầu (so sánh chuỗi naive).
    // Dùng chung cho grid tháng và panel chi tiết ngày.
    const slotsByDate = computed<Map<string, MentorAvailabilitySlot[]>>(() => {
      const groups = new Map<string, MentorAvailabilitySlot[]>();
      const sorted = [...store.slots()].sort((a, b) => a.startAt.localeCompare(b.startAt));
      for (const slot of sorted) {
        const date = slot.startAt.slice(0, 10);
        const bucket = groups.get(date);
        if (bucket) {
          bucket.push(slot);
        } else {
          groups.set(date, [slot]);
        }
      }
      return groups;
    });

    // Grid tháng chuẩn: từ T2 của tuần chứa mùng 1 tới CN của tuần chứa ngày cuối tháng (5-6 hàng)
    const monthDays = computed<MonthDayCell[]>(() => {
      const groups = slotsByDate();
      const anchor = store.monthAnchor();
      const monthPrefix = anchor.slice(0, 7);
      const from = startOfWeekStr(anchor);
      const to = addDays(startOfWeekStr(endOfMonthStr(anchor)), 6);
      const cells: MonthDayCell[] = [];
      for (let date = from; date <= to; date = addDays(date, 1)) {
        cells.push({
          date,
          inMonth: date.slice(0, 7) === monthPrefix,
          slots: groups.get(date) ?? [],
        });
      }
      return cells;
    });

    // Có đang xem đúng tháng hiện tại không (disable nút "Hôm nay")
    const isCurrentMonth = computed(() => store.monthAnchor() === startOfMonthStr(todayStr()));

    // ĐỦ slot của ngày đang mở panel chi tiết (không giới hạn 3 như chip trong ô)
    const selectedDaySlots = computed<MentorAvailabilitySlot[]>(() => {
      const date = store.selectedDate();
      return date ? (slotsByDate().get(date) ?? []) : [];
    });

    // Preview pattern generator: TỐI ĐA = thứ × giờ × N tuần (cửa sổ N×7 ngày có đúng N lần mỗi thứ)
    const composePreviewCount = computed(
      () =>
        store.composeWeekdays().length * store.composeTimes().length * store.composeWeeksAhead(),
    );

    return { monthDays, isCurrentMonth, selectedDaySlots, composePreviewCount };
  }),
  withMethods((store, mentorService = inject(MentorService)) => {
    const transloco = inject(TranslocoService);

    // Bỏ qua response cũ khi admin đổi tháng / đổi mentor trong lúc request đang bay
    let slotsRequestId = 0;

    /**
     * Tải MỌI slot của grid tháng đang xem (T2 tuần chứa mùng 1 → CN tuần chứa cuối tháng).
     * BE cap limit 100/trang — gom bằng vòng lặp phân trang (page 1..n tới khi đủ
     * `total`, guard MAX_SLOT_PAGES) vì tháng bận có thể vượt 100 slot.
     * requestId guard: đổi tháng/mentor giữa chừng → bỏ toàn bộ response cũ.
     */
    async function loadSlots() {
      const mentorId = store.selectedMentorId();
      if (!mentorId) return;
      const requestId = ++slotsRequestId;

      const anchor = store.monthAnchor();
      const from = startOfWeekStr(anchor);
      const to = addDays(startOfWeekStr(endOfMonthStr(anchor)), 6);

      patchState(store, { isLoadingSlots: true, slotsError: null });
      try {
        const items: MentorAvailabilitySlot[] = [];
        for (let page = 1; page <= MAX_SLOT_PAGES; page++) {
          const res = await mentorService.manageAvailabilitySlots(mentorId, {
            from,
            to,
            page,
            limit: SLOT_PAGE_LIMIT,
          });
          if (requestId !== slotsRequestId) return;
          items.push(...res.items);
          if (items.length >= res.total || res.items.length === 0) break;
        }
        patchState(store, { slots: items, isLoadingSlots: false });
      } catch (err) {
        if (requestId !== slotsRequestId) return;
        patchState(store, {
          slotsError: toErrorMessage(
            err,
            transloco.translate('system.mentorSchedule.errors.loadFailed'),
          ),
          isLoadingSlots: false,
        });
      }
    }

    /**
     * Tạo hàng loạt slot — chia gói ≤50 slot/call (giới hạn BE), gọi tuần tự.
     * Gom kết quả created/skipped của mọi gói vào 1 notice; lỗi giữa chừng vẫn
     * refresh tháng để hiển thị phần đã kịp tạo. Trả về true nếu không có lỗi.
     */
    async function createSlotsBulk(startAts: string[], droppedPast = 0): Promise<boolean> {
      const mentorId = store.selectedMentorId();
      if (!mentorId) return false;
      if (!startAts.length) {
        patchState(store, {
          slotNotice: null,
          slotActionError: transloco.translate('system.mentorSchedule.errors.allPast'),
        });
        return false;
      }

      patchState(store, { isCreatingSlots: true, slotNotice: null, slotActionError: null });
      let created = 0;
      let skipped = 0;
      let failure: string | null = null;
      try {
        for (let i = 0; i < startAts.length; i += MAX_SLOTS_PER_CALL) {
          const chunk = startAts.slice(i, i + MAX_SLOTS_PER_CALL);
          const res = await mentorService.createAvailabilitySlots(mentorId, {
            slots: chunk.map((startAt) => ({ startAt })),
          });
          created += res.created.length;
          skipped += res.skipped;
        }
      } catch (err) {
        failure = toErrorMessage(
          err,
          transloco.translate('system.mentorSchedule.errors.createFailed'),
        );
      }

      const parts = [transloco.translate('system.mentorSchedule.notice.added', { n: created })];
      if (skipped > 0) {
        parts.push(
          transloco.translate('system.mentorSchedule.notice.skippedDuplicates', { n: skipped }),
        );
      }
      if (droppedPast > 0) {
        parts.push(
          transloco.translate('system.mentorSchedule.notice.droppedPast', { n: droppedPast }),
        );
      }
      const notice = failure ? null : `${parts.join(', ')}.`;
      patchState(store, {
        isCreatingSlots: false,
        slotNotice: notice,
        slotActionError: failure
          ? created > 0
            ? `${failure} ${transloco.translate('system.mentorSchedule.errors.partialCreated', { n: created })}`
            : failure
          : null,
      });
      await loadSlots();
      // Tự ẩn thông báo sau vài giây (chỉ khi chưa bị ghi đè bởi lần thêm khác)
      if (notice) {
        setTimeout(() => {
          if (store.slotNotice() === notice) patchState(store, { slotNotice: null });
        }, 5000);
      }
      return !failure;
    }

    return {
      loadSlots,

      /** Chọn mentor để quản lý lịch — reset khối lịch rồi tải tháng hiện tại. */
      selectMentor(mentorId: string | null) {
        if (store.selectedMentorId() === mentorId) return;
        // Vô hiệu response slot đang bay của mentor cũ
        slotsRequestId++;
        patchState(store, { selectedMentorId: mentorId, ...slotsResetState() });
        if (mentorId) void loadSlots();
      },

      /** Chuyển tháng đang xem (±1; cho xem cả tháng quá khứ). Đóng panel ngày đang mở. */
      changeMonth(offsetMonths: number) {
        patchState(store, {
          monthAnchor: addMonths(store.monthAnchor(), offsetMonths),
          selectedDate: null,
          slotNotice: null,
          slotActionError: null,
        });
        void loadSlots();
      },

      /** Về tháng hiện tại (nút "Hôm nay"). Đóng panel ngày đang mở. */
      goToCurrentMonth() {
        const current = startOfMonthStr(todayStr());
        if (store.monthAnchor() === current) return;
        patchState(store, {
          monthAnchor: current,
          selectedDate: null,
          slotNotice: null,
          slotActionError: null,
        });
        void loadSlots();
      },

      // ── Panel chi tiết ngày (mở khi click ô ngày trong grid tháng) ──

      /** Mở panel chi tiết cho một ngày (click lại đúng ngày đang mở = đóng). */
      openDay(date: string) {
        patchState(store, {
          selectedDate: store.selectedDate() === date ? null : date,
          slotActionError: null,
        });
      },

      closeDay() {
        patchState(store, { selectedDate: null });
      },

      /**
       * Thêm nhanh 1 slot cho đúng 1 ngày (ô thêm giờ trong panel chi tiết ngày).
       * Trả về true nếu tạo xong — component dùng để reset input.
       */
      async quickAddSlot(date: string, time: string): Promise<boolean> {
        if (!date || !time || store.isCreatingSlots()) return false;
        const startAt = `${date}T${time}`;
        if (startAt <= nowNaiveMinute()) {
          patchState(store, {
            slotNotice: null,
            slotActionError: transloco.translate('system.mentorSchedule.errors.slotPast'),
          });
          return false;
        }
        return createSlotsBulk([startAt]);
      },

      // ── Panel "Thêm nhiều khung giờ" — PATTERN GENERATOR (độc lập với tháng đang xem) ──

      toggleComposeOpen() {
        patchState(store, { composeOpen: !store.composeOpen() });
      },
      /** Chọn/bỏ chọn một THỨ trong tuần (0 = T2 … 6 = CN). */
      toggleComposeWeekday(idx: number) {
        const current = store.composeWeekdays();
        patchState(store, {
          composeWeekdays: current.includes(idx)
            ? current.filter((i) => i !== idx)
            : [...current, idx].sort((a, b) => a - b),
        });
      },
      /** Thêm một giờ 'HH:mm' vào danh sách (bỏ trùng, sort tăng dần). */
      addComposeTime(time: string) {
        if (!time || store.composeTimes().includes(time)) return;
        patchState(store, { composeTimes: [...store.composeTimes(), time].sort() });
      },
      removeComposeTime(time: string) {
        patchState(store, { composeTimes: store.composeTimes().filter((t) => t !== time) });
      },
      setComposeWeeksAhead(weeks: number) {
        patchState(store, { composeWeeksAhead: weeks });
      },
      /** "Xoá chọn" — dọn toàn bộ lựa chọn thứ + giờ + số tuần của pattern generator. */
      clearCompose() {
        patchState(store, { composeWeekdays: [], composeTimes: [], composeWeeksAhead: 1 });
      },

      /**
       * PATTERN GENERATOR: tạo mọi tổ hợp (ngày khớp THỨ đã chọn trong cửa sổ N×7 ngày
       * kể từ HÔM NAY × giờ) — độc lập với tháng đang xem. Expand tại client và lọc
       * từng khung đã qua (BE trả 400 cho CẢ call nếu dính 1 giờ quá khứ), chia gói
       * ≤50/call qua createSlotsBulk. GIỮ selection sau khi tạo.
       */
      async submitCompose() {
        if (store.isCreatingSlots()) return;
        const weekdays = store.composeWeekdays();
        const times = store.composeTimes();
        if (!weekdays.length || !times.length) return;

        const now = nowNaiveMinute();
        const today = todayStr();
        const startAts: string[] = [];
        let droppedPast = 0;
        for (let offset = 0; offset < store.composeWeeksAhead() * 7; offset++) {
          const date = addDays(today, offset);
          if (!weekdays.includes(weekdayIdx(date))) continue;
          for (const time of times) {
            const startAt = `${date}T${time}`;
            if (startAt <= now) droppedPast++;
            else startAts.push(startAt);
          }
        }
        await createSlotsBulk(startAts, droppedPast);
      },

      /** Bật/tắt một slot (chặn khi đã bị booking chiếm). */
      async toggleSlot(slot: MentorAvailabilitySlot) {
        const mentorId = store.selectedMentorId();
        if (!mentorId || slot.bookedBookingId) return;
        patchState(store, { slotActionId: slot.id, slotActionError: null });
        try {
          const updated = await mentorService.updateAvailabilitySlot(mentorId, slot.id, {
            isActive: !slot.isActive,
          });
          patchState(store, {
            slots: store.slots().map((s) => (s.id === updated.id ? updated : s)),
          });
        } catch (err) {
          patchState(store, {
            slotActionError: toErrorMessage(
              err,
              transloco.translate('system.mentorSchedule.errors.updateFailed'),
            ),
          });
        } finally {
          patchState(store, { slotActionId: null });
        }
      },

      // Luồng xoá slot (confirm modal riêng)
      requestDeleteSlot(slotId: string) {
        patchState(store, { confirmDeleteSlotId: slotId, slotActionError: null });
      },
      cancelDeleteSlot() {
        patchState(store, { confirmDeleteSlotId: null });
      },
      async confirmDeleteSlot() {
        const mentorId = store.selectedMentorId();
        const slotId = store.confirmDeleteSlotId();
        if (!mentorId || !slotId) return;
        patchState(store, { slotActionId: slotId, slotActionError: null });
        try {
          await mentorService.deleteAvailabilitySlot(mentorId, slotId);
          patchState(store, {
            confirmDeleteSlotId: null,
            slots: store.slots().filter((s) => s.id !== slotId),
          });
        } catch (err) {
          patchState(store, {
            confirmDeleteSlotId: null,
            slotActionError: toErrorMessage(
              err,
              transloco.translate('system.mentorSchedule.errors.deleteFailed'),
            ),
          });
        } finally {
          patchState(store, { slotActionId: null });
        }
      },
    };
  }),
);
