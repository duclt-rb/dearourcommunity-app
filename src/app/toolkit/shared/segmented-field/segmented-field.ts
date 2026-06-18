import { Component, input, model } from '@angular/core';

export interface SegmentOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-segmented-field',
  standalone: true,
  templateUrl: './segmented-field.html',
  styleUrl: './segmented-field.css',
})
export class SegmentedFieldComponent {
  options = input.required<SegmentOption[]>();
  ariaLabel = input<string>('');
  /** Two-way bindable selected value. */
  value = model<string>('');

  select(option: string): void {
    this.value.set(option);
  }
}
