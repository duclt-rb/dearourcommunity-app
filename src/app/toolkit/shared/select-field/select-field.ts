import { Component, inject, input, model, ViewEncapsulation } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [FormsModule, Select],
  templateUrl: './select-field.html',
  styleUrl: './select-field.css',
  encapsulation: ViewEncapsulation.None,
})
export class SelectFieldComponent {
  private readonly transloco = inject(TranslocoService);

  label = input<string>('');
  placeholder = input<string>(this.transloco.translate('common.select'));
  options = input.required<SelectOption[]>();
  /** Two-way bindable selected value. */
  value = model<string>('');
}
