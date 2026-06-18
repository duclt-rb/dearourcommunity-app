import { Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [FormsModule, DatePicker],
  templateUrl: './date-field.html',
  styleUrl: './date-field.css',
  encapsulation: ViewEncapsulation.None,
})
export class DateFieldComponent {
  label = input.required<string>();
  /** Two-way bindable date value (ISO 'yyyy-mm-dd'). */
  value = model<string>('');

  /** Store string <-> Date adapter for the PrimeNG picker. */
  dateValue = computed<Date | null>(() => {
    const v = this.value();
    return v ? new Date(`${v}T00:00:00`) : null;
  });

  onSelect(date: Date | null): void {
    this.value.set(date ? this.toIso(date) : '');
  }

  private toIso(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
