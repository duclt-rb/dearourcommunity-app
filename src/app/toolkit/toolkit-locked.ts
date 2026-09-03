import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowRight, LucideLock } from '@lucide/angular';
import LogoComponent from '../shared/logo/logo';
import { ToolkitAccessService } from './toolkit-access.service';
import { frontpageUrl } from '../core/i18n/locale';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * CR-003 — trang khóa riêng: guard đưa về đây (`?toolkit=<id>`) khi user không có
 * quyền vào toolkit. Thông điệp generic (không nêu tên công cụ) + chip các gói có
 * kèm nó (link mua trên Frontpage). Catalog/giới thiệu nằm ở Frontpage.
 */
@Component({
  selector: 'app-toolkit-locked',
  standalone: true,
  imports: [TranslocoPipe, CommonModule, RouterLink, LogoComponent, LucideArrowRight, LucideLock],
  templateUrl: './toolkit-locked.html',
})
export default class ToolkitLockedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  readonly access = inject(ToolkitAccessService);

  private toolkitId = signal<string | null>(null);

  packages = computed(() => {
    const id = this.toolkitId();
    return id ? this.access.packagesWithToolkit(id) : [];
  });

  readonly frontpageToolkitUrl = frontpageUrl('/toolkit');

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.toolkitId.set(params.get('toolkit'));
    });
    void this.access.ensureCatalog();
  }
}
