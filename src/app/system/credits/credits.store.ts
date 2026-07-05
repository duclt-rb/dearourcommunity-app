import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ApiError, type CreditOverview, type CreditType } from '@dearourcommunity/client';
import { CreditsService } from '../../core/services/credits.service';

const HISTORY_PAGE_SIZE = 20;

function toErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    return err.message || fallback;
  }
  if (err instanceof Error) {
    return err.message || fallback;
  }
  console.error('Credit action failed', err);
  return fallback;
}

const initialState = {
  // Form tra cứu
  lookupUserId: '',
  lookupOrgId: '',

  // Kết quả tra cứu (GET /credits/of-user/:userId)
  overview: null as CreditOverview | null,
  // Target đã tra cứu thành công — dùng cho refresh + điều chỉnh
  activeUserId: null as string | null,
  activeOrgId: null as string | null,
  historyPage: 1,
  isLoading: false,
  lookupError: null as string | null,

  // Form điều chỉnh (POST /credits/adjust)
  adjustCreditType: 'mentoring_session' as CreditType,
  adjustAmount: '',
  adjustNote: '',
  isAdjusting: false,
  adjustError: null as string | null,
  adjustSuccess: null as string | null,
};

export const CreditsAdminStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    const hasResult = computed(() => store.overview() !== null);

    const historyTotalPages = computed(() => {
      const overview = store.overview();
      if (!overview) return 0;
      return Math.max(1, Math.ceil(overview.history.total / overview.history.limit));
    });

    // Amount hợp lệ: số nguyên khác 0 (âm = trừ)
    const adjustAmountValid = computed(() => {
      const raw = store.adjustAmount().trim();
      if (!raw) return false;
      const value = Number(raw);
      return Number.isInteger(value) && value !== 0;
    });

    // Note bắt buộc ≥ 3 ký tự (Q15)
    const adjustNoteValid = computed(() => store.adjustNote().trim().length >= 3);

    const canAdjust = computed(
      () => hasResult() && adjustAmountValid() && adjustNoteValid() && !store.isAdjusting(),
    );

    return { hasResult, historyTotalPages, adjustAmountValid, adjustNoteValid, canAdjust };
  }),
  withMethods((store, creditsService = inject(CreditsService)) => {
    /** Tải số dư + lịch sử của target (đã trim) — dùng chung cho tra cứu / phân trang / refresh. */
    async function fetchOverview(userId: string, orgId: string | null, page: number) {
      patchState(store, { isLoading: true, lookupError: null });
      try {
        const overview = await creditsService.getOfUser(userId, {
          organizationId: orgId ?? undefined,
          page,
          limit: HISTORY_PAGE_SIZE,
        });
        patchState(store, {
          overview,
          activeUserId: userId,
          activeOrgId: orgId,
          historyPage: page,
        });
      } catch (err) {
        patchState(store, {
          lookupError: toErrorMessage(err, 'Không thể tra cứu credit. Vui lòng thử lại.'),
        });
      } finally {
        patchState(store, { isLoading: false });
      }
    }

    return {
      setLookupUserId(value: string) {
        patchState(store, { lookupUserId: value });
      },
      setLookupOrgId(value: string) {
        patchState(store, { lookupOrgId: value });
      },

      /** Tra cứu số dư + lịch sử theo userId (+ organizationId cho org-scope). */
      async lookup() {
        const userId = store.lookupUserId().trim();
        if (!userId) {
          patchState(store, { lookupError: 'Vui lòng nhập User ID cần tra cứu.' });
          return;
        }
        const orgId = store.lookupOrgId().trim() || null;
        patchState(store, { adjustSuccess: null, adjustError: null });
        await fetchOverview(userId, orgId, 1);
      },

      async goToHistoryPage(page: number) {
        const userId = store.activeUserId();
        if (!userId || page < 1 || page > store.historyTotalPages()) return;
        await fetchOverview(userId, store.activeOrgId(), page);
      },

      setAdjustCreditType(value: CreditType) {
        patchState(store, { adjustCreditType: value });
      },
      setAdjustAmount(value: string) {
        patchState(store, { adjustAmount: value });
      },
      setAdjustNote(value: string) {
        patchState(store, { adjustNote: value });
      },

      /**
       * Điều chỉnh tay (CSKH): amount âm = trừ, note bắt buộc.
       * Target đúng MỘT trong userId | organizationId — nếu tra cứu theo org-scope
       * thì điều chỉnh vào pool của org, ngược lại vào credit cá nhân của user.
       */
      async submitAdjust() {
        const userId = store.activeUserId();
        if (!userId || !store.canAdjust()) return;
        const orgId = store.activeOrgId();
        const amount = Number(store.adjustAmount().trim());

        patchState(store, { isAdjusting: true, adjustError: null, adjustSuccess: null });
        try {
          await creditsService.adjust({
            ...(orgId ? { organizationId: orgId } : { userId }),
            creditType: store.adjustCreditType(),
            amount,
            note: store.adjustNote().trim(),
          });
          patchState(store, {
            adjustAmount: '',
            adjustNote: '',
            adjustSuccess: `Đã điều chỉnh ${amount > 0 ? '+' : ''}${amount} credit thành công.`,
          });
          // Refresh số dư + lịch sử sau khi điều chỉnh
          await fetchOverview(userId, orgId, 1);
        } catch (err) {
          patchState(store, {
            adjustError: toErrorMessage(err, 'Điều chỉnh credit thất bại. Vui lòng thử lại.'),
          });
        } finally {
          patchState(store, { isAdjusting: false });
        }
      },
    };
  }),
);
