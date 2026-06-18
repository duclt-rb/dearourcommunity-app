import { Component, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [FormsModule, InputNumber],
  templateUrl: './number-field.html',
  styleUrl: './number-field.css',
  encapsulation: ViewEncapsulation.None,
})
export class NumberFieldComponent {
  label = input<string>('');
  hint = input<string>('');
  /** Suffix shown after the number (decimal mode only), e.g. ' kg'. */
  suffix = input<string>('');
  placeholder = input<string>('');
  /** Format as VND currency. */
  currency = input<boolean>(false);
  maxFractionDigits = input<number>(0);
  /** Two-way bindable numeric value (null when empty). */
  value = model<number | null>(null);
}
