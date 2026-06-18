import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-bool-field',
  standalone: true,
  templateUrl: './bool-field.html',
  styleUrl: './bool-field.css',
})
export class BoolFieldComponent {
  label = input.required<string>();
  trueLabel = input<string>('Có');
  falseLabel = input<string>('Không');
  /** Two-way bindable value, stored as the selected label text. */
  value = model<string>('');

  select(option: string): void {
    this.value.set(option);
  }
}
