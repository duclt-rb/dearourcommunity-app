import { Component, inject, input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  template: `<span class="priority-badge">{{ label() }}</span>`,
  styleUrl: './priority-badge.css',
})
export class PriorityBadgeComponent {
  label = input<string>(inject(TranslocoService).translate('toolkit.fields.priority'));
}
