import { computed, inject, Injectable, signal } from '@angular/core';
import type { Package } from '@dearourcommunity/client';
import { environment } from '../../environments/environment';
import { PackagesService } from '../core/services/packages.service';
import { AuthStore } from '../core/stores/auth.store';

// CR-003: quyền vào toolkit = user sở hữu ít nhất 1 gói có flag `toolkit:<id>` trong features
// (union mọi gói, gồm gói kế thừa từ org). Nguồn flag: admin cấu hình ở /system/packages (CR-002).
export const TOOLKIT_FLAG_PREFIX = 'toolkit:';

@Injectable({ providedIn: 'root' })
export class ToolkitAccessService {
  private authStore = inject(AuthStore);
  private packagesService = inject(PackagesService);

  /** Catalog gói (public GET /packages, có features + courses) — load 1 lần, share mọi nơi. */
  private catalog = signal<Package[]>([]);
  private catalogPromise: Promise<void> | null = null;

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

  isAuthenticated = computed(() => this.authStore.isAuthenticated());

  /** Union các toolkitId từ features của mọi gói user đang sở hữu. */
  allowedToolkitIds = computed<Set<string>>(() => {
    const ownedIds = new Set((this.authStore.user()?.packages ?? []).map((p) => p.id));
    const allowed = new Set<string>();
    if (!ownedIds.size) return allowed;

    for (const pkg of this.catalog()) {
      if (!ownedIds.has(pkg.id)) continue;
      for (const [key, value] of Object.entries(pkg.features ?? {})) {
        if (value === true && key.startsWith(TOOLKIT_FLAG_PREFIX)) {
          allowed.add(key.slice(TOOLKIT_FLAG_PREFIX.length));
        }
      }
    }
    return allowed;
  });

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
