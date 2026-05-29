import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" style="display: block; cursor: pointer;">
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
}
