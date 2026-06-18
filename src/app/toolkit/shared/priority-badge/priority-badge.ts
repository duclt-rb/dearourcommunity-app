import { Component, input } from '@angular/core';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  template: `<span class="priority-badge">{{ label() }}</span>`,
  styleUrl: './priority-badge.css',
})
export class PriorityBadgeComponent {
  label = input<string>('Ưu tiên');
}
