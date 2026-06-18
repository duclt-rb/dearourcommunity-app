import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-text-field',
  standalone: true,
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
})
export class TextFieldComponent {
  label = input.required<string>();
  hint = input<string>('');
  /** Two-way bindable text value. */
  value = model<string>('');

  onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
