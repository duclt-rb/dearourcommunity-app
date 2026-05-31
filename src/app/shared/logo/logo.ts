import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectQueryRedirect } from '../../core/router/router.selectors';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  template: `
    <a [href]="href()" (click)="onClick($event)" style="display: block; cursor: pointer;">
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
  private ngrxStore = inject(Store);
  private router = inject(Router);

  height = input<string>('72px');
  className = input<string>('', { alias: 'class' });

  href = signal<string>('/');
  readonly redirectParam = this.ngrxStore.selectSignal(selectQueryRedirect);

  constructor() {
    effect(() => {
      const redirect = this.redirectParam();
      if (redirect && typeof redirect === 'string') {
        this.href.set(redirect);
      } else {
        this.href.set('/');
      }
    });
  }

  onClick(event: MouseEvent) {
    const redirect = this.redirectParam();
    if (redirect) {
      // If redirect query param exists, let standard browser href navigation happen.
    } else {
      event.preventDefault();
      this.router.navigate(['/']);
    }
  }
}
