import { CurrencyPipe } from '@angular/common';
import { afterRenderEffect, Component, computed, inject, resource } from '@angular/core';
import { Router } from '@angular/router';
import type { Package } from '@dearourcommunity/client';
import {
  LucideArrowRight,
  LucideCheck,
  LucideCrown,
  LucideGraduationCap,
  LucideRocket,
  LucideStar,
  LucideUsers,
} from '@lucide/angular';
import { PackagesService } from '../../core/services/packages.service';
import { ProfileStore } from '../profile.store';
import { CheckoutStore } from '../../checkout/checkout.store';

export interface UIPackage extends Package {
  formattedFeatures: { key: string; label: string }[];
}

@Component({
  selector: 'app-profile-plans',
  standalone: true,
  imports: [
    CurrencyPipe,
    LucideCheck,
    LucideRocket,
    LucideStar,
    LucideCrown,
    LucideUsers,
    LucideGraduationCap,
    LucideArrowRight,
  ],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export default class PlansComponent {
  private packagesService = inject(PackagesService);
  private router = inject(Router);
  private checkoutStore = inject(CheckoutStore);
  store = inject(ProfileStore);

  // 1. Dùng resource API mới để tự động tải packages
  packagesResource = resource({
    loader: () => this.packagesService.findAll(),
  });

  // Helper để xử lý dữ liệu và format sẵn các feature key
  private mapToUIPackages(pkgs: Package[]): UIPackage[] {
    return pkgs.map((pkg) => {
      const formattedFeatures = pkg.features
        ? Object.keys(pkg.features)
            .filter((key) => pkg.features![key] === true)
            .map((key) => ({
              key,
              label: key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            }))
        : [];
      return { ...pkg, formattedFeatures };
    });
  }

  // 2. Computed Signals tối ưu, tính toán 1 lần duy nhất khi packages thay đổi
  packages = computed<UIPackage[]>(() => {
    const list = this.packagesResource.value() ?? [];
    return this.mapToUIPackages(list);
  });

  youthPackages = computed(() =>
    this.packages()
      .filter((p) => p.packageType === 'youth')
      .sort((a, b) => this.resolveTier(a) - this.resolveTier(b)),
  );

  orgPackages = computed(() =>
    this.packages()
      .filter((p) => p.packageType === 'organization')
      .sort((a, b) => this.resolveTier(a) - this.resolveTier(b)),
  );

  activePackage = computed<UIPackage | null>(() => {
    const list = this.packages();
    const id = this.store.packageId();
    const name = this.store.packageName();
    if (!list.length) return null;
    const byId = id ? list.find((p) => p.id === id) : null;
    const byName = name ? list.find((p) => p.name === name) : null;
    return byId ?? byName ?? null;
  });

  constructor() {
    // 3. Dùng afterRenderEffect để scroll vào view sau khi DOM đã được render xong (Không cần setTimeout)
    afterRenderEffect(() => {
      const isLoaded = !this.packagesResource.isLoading();
      const activeId = this.store.packageId();
      if (isLoaded && this.packages().length > 0 && activeId) {
        const el = document.querySelector('.plan-card--active');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  isActivePlan(pkg: Package): boolean {
    const active = this.activePackage();
    return active ? pkg.id === active.id : false;
  }

  isLowerTier(pkg: Package): boolean {
    const active = this.activePackage();
    if (!active) return false;
    return this.resolveTier(pkg) < this.resolveTier(active);
  }

  selectAndUpgrade(pkg: Package) {
    this.checkoutStore.selectPackage(pkg);
    this.router.navigate(['/checkout/billing']);
  }

  private resolveTier(pkg: Package): number {
    if (typeof pkg.tier === 'number' && pkg.tier > 0) return pkg.tier;
    const suffix = pkg.id.split('-').pop() ?? '';
    const map: Record<string, number> = { basic: 1, standard: 2, premium: 3 };
    return map[suffix] ?? 0;
  }
}
