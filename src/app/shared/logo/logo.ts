import { Component, input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  template: `
    <a [href]="href" (click)="onClick($event)" style="display: block; cursor: pointer;">
      <img
        src="/logo.png"
        alt="Dear Our Community"
        [class]="className()"
        [style.height]="height()"
        style="display: block;"
      />
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export default class LogoComponent {
  height = input<string>('72px');
  className = input<string>('', { alias: 'class' });

  readonly href = environment.appUrl;

  onClick(event: MouseEvent) {
    event.preventDefault();
    window.location.href = environment.appUrl;
  }
}
