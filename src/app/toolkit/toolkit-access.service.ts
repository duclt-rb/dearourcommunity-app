import { computed, inject, Injectable, signal } from '@angular/core';
import type { Package } from '@dearourcommunity/client';
import { environment } from '../../environments/environment';
import { ClientService } from '../core/services/client.service';
import { PackagesService } from '../core/services/packages.service';
import { AuthStore } from '../core/stores/auth.store';

// CR-006: quyền vào toolkit = user có SELECTION trong app_toolkit_selections (chọn ở checkout
// bằng credit / backfill grandfather / admin cấp) — KHÔNG còn là union flag gói (CR-003 cũ).
// Flag `toolkit:<id>` trong features giờ chỉ là POOL để chọn ở checkout + CTA marketing.
export const TOOLKIT_FLAG_PREFIX = 'toolkit:';

@Injectable({ providedIn: 'root' })
export class ToolkitAccessService {
  private authStore = inject(AuthStore);
  private packagesService = inject(PackagesService);
  private clientService = inject(ClientService);

  /** Catalog gói (public GET /packages, có features + courses) — load 1 lần, share mọi nơi. */
  private catalog = signal<Package[]>([]);
  private catalogPromise: Promise<void> | null = null;

  /** CR-006 — toolkitId user được dùng (GET /toolkits/selections/me), cache theo user + TTL. */
  private selections = signal<Set<string>>(new Set());
  private selectionsForUserId: string | null = null;
  private selectionsPromise: Promise<void> | null = null;
  private selectionsFetchedAt = 0;
  /** TTL cache quyền — mua xong admin duyệt là quyền đổi, không thể cache cả session. */
  private static readonly SELECTIONS_TTL_MS = 60_000;

  /** Fetch catalog nếu chưa có; lỗi mạng → catalog rỗng (fail-closed, thử lại ở lần gọi sau). */
  ensureCatalog(): Promise<void> {
    if (this.catalog().length) return Promise.resolve();
    this.catalogPromise ??= this.packagesService
      .findAll()
      .then((packages) => this.catalog.set(packages))
      .catch((err) => {
        console.error('[ToolkitAccess] Không tải được danh sách gói', err);
        this.catalogPromise = null;
      });
    return this.catalogPromise;
  }

  /**
   * CR-006 — fetch quyền toolkit của user hiện tại; đổi user (login lại) → fetch lại.
   * Lỗi mạng → set rỗng (fail-closed) và thử lại ở lần gọi sau.
   */
  async ensureSelections(): Promise<void> {
    // UX 15/07 — checkout vào thẳng bằng token đã lưu (không qua toolkitAccessGuard) nên
    // AuthStore có thể chưa load user; tự load trước (no-op nếu không có token) để không
    // âm thầm coi user là anonymous → pool sở hữu/badge "Đã sở hữu" sai.
    if (!this.authStore.user()) {
      await this.authStore.loadCurrentUser();
    }
    const userId = this.authStore.user()?.id ?? null;
    if (!userId) {
      this.selections.set(new Set());
      this.selectionsForUserId = null;
      return Promise.resolve();
    }
    const fresh = Date.now() - this.selectionsFetchedAt < ToolkitAccessService.SELECTIONS_TTL_MS;
    if (this.selectionsForUserId === userId && this.selectionsPromise && fresh) {
      return this.selectionsPromise;
    }

    this.selectionsForUserId = userId;
    const promise = this.clientService.toolkits
      .getMySelections()
      .then((rows) => {
        this.selections.set(new Set(rows.map((r) => r.toolkitId)));
        this.selectionsFetchedAt = Date.now();
      })
      .catch((err: unknown) => {
        console.error('[ToolkitAccess] Không tải được quyền toolkit', err);
        this.selections.set(new Set());
        this.selectionsPromise = null; // thử lại lần sau
        this.selectionsFetchedAt = 0;
      });
    this.selectionsPromise = promise;
    return promise;
  }

  /** Gọi sau khi mua/duyệt thành công để quyền mới hiện ngay không chờ TTL. */
  invalidateSelections(): void {
    this.selectionsPromise = null;
    this.selectionsFetchedAt = 0;
  }

  isAuthenticated = computed(() => this.authStore.isAuthenticated());

  /** CR-006 — quyền = danh sách selection của user (không còn union flag gói). */
  allowedToolkitIds = computed<Set<string>>(() => this.selections());

  canAccess(toolkitId: string): boolean {
    return this.allowedToolkitIds().has(toolkitId);
  }

  /** Các gói bán được (youth/org) có chứa toolkit này — cho CTA "mua gói để dùng". */
  packagesWithToolkit(toolkitId: string): Package[] {
    return this.catalog().filter(
      (pkg) =>
        (pkg.packageType === 'youth' || pkg.packageType === 'organization') &&
        pkg.features?.[`${TOOLKIT_FLAG_PREFIX}${toolkitId}`] === true,
    );
  }

  /** Link sang trang package detail trên Frontpage (resolve được cả raw packageId). */
  packageDetailUrl(packageId: string): string {
    return `${environment.appUrl}/vi/what-we-offer/${packageId}`;
  }
}
