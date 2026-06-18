import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-number-field',
  standalone: true,
  templateUrl: './number-field.html',
  styleUrl: './number-field.css',
})
export class NumberFieldComponent {
  label = input<string>('');
  hint = input<string>('');
  suffix = input<string>('');
  placeholder = input<string>('');
  /** Two-way bindable numeric value (null when empty). */
  value = model<number | null>(null);

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value.set(raw === '' ? null : Number(raw));
  }
}
