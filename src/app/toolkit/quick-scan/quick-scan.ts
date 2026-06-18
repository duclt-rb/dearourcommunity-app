import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideLandmark,
  LucideLeaf,
  LucideRotateCcw,
  LucideTriangleAlert,
  LucideUsers,
} from '@lucide/angular';
import { MeterComponent } from '../shared/meter/meter';
import { PriorityBadgeComponent } from '../shared/priority-badge/priority-badge';
import { SCORE_SCALE_OPTIONS, ScoreScaleComponent } from '../shared/score-scale/score-scale';
import { TextFieldComponent } from '../shared/text-field/text-field';
import { QuickScanStore } from './quick-scan.store';
import { QuickScanConfig } from './quick-scan.types';

@Component({
  selector: 'app-quick-scan',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideLeaf,
    LucideUsers,
    LucideLandmark,
    LucideTriangleAlert,
    LucideArrowLeft,
    LucideRotateCcw,
    ScoreScaleComponent,
    TextFieldComponent,
    MeterComponent,
    PriorityBadgeComponent,
  ],
  providers: [QuickScanStore], // Feature-scoped store: a fresh instance per quick-scan
  templateUrl: './quick-scan.html',
  styleUrl: './quick-scan.css',
  encapsulation: ViewEncapsulation.None,
})
export class QuickScanComponent {
  config = input.required<QuickScanConfig>();

  readonly store = inject(QuickScanStore);
  readonly scaleOptions = SCORE_SCALE_OPTIONS;

  constructor() {
    // Keep the store's config in sync with the input.
    effect(() => this.store.setConfig(this.config()));
  }

  /** Clear all answers and progress after confirmation. */
  resetScan(): void {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Làm lại bài test? Toàn bộ câu trả lời và tiến độ sẽ bị xóa.');
      if (!ok) return;
    }
    this.store.reset();
  }
}
