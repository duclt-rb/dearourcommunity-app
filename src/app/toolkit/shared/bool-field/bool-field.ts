import { Component, inject, input, model } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-bool-field',
  standalone: true,
  templateUrl: './bool-field.html',
  styleUrl: './bool-field.css',
})
export class BoolFieldComponent {
  private readonly transloco = inject(TranslocoService);

  label = input.required<string>();
  trueLabel = input<string>(this.transloco.translate('common.yes'));
  falseLabel = input<string>(this.transloco.translate('common.no'));
  /** Giá trị persist ổn định — KHÔNG phải nhãn hiển thị (nhãn dịch được). */
  trueValue = input<string>('yes');
  falseValue = input<string>('no');
  /** Two-way bindable value, stored as the stable option value. */
  value = model<string>('');

  select(option: string): void {
    this.value.set(option);
  }
}
