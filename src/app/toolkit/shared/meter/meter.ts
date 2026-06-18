import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-meter',
  standalone: true,
  templateUrl: './meter.html',
  styleUrl: './meter.css',
})
export class MeterComponent {
  /** Fill percentage, 0–100. */
  percent = input.required<number>();
  /** Any CSS color for the fill. */
  color = input<string>('var(--color-primary)');

  readonly clamped = computed(() => Math.max(0, Math.min(100, this.percent())));
}
