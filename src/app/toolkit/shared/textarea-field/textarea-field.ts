import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  templateUrl: './textarea-field.html',
  styleUrl: './textarea-field.css',
})
export class TextareaFieldComponent {
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(3);
  /** Two-way bindable text value. */
  value = model<string>('');

  onInput(event: Event): void {
    this.value.set((event.target as HTMLTextAreaElement).value);
  }
}
