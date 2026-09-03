import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getActiveLocale, setLocale, type AppLocale } from '../../core/i18n/locale';

/**
 * Toggle VI | EN. Không reactive theo thiết kế: locale cố định mỗi page load,
 * click → persist localStorage + full reload (xem core/i18n/locale.ts).
 */
@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex items-center gap-0.5 rounded-full border border-gray-200 bg-white p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      @for (lang of langs; track lang) {
        <button
          type="button"
          class="rounded-full px-2.5 py-1 uppercase transition-colors"
          [class.bg-primary]="lang === active"
          [class.text-white]="lang === active"
          [class.text-gray-500]="lang !== active"
          [class.hover:text-gray-800]="lang !== active"
          [attr.aria-pressed]="lang === active"
          (click)="switchTo(lang)"
        >
          {{ lang }}
        </button>
      }
    </div>
  `,
})
export class LanguageSwitcher {
  readonly langs: readonly AppLocale[] = ['vi', 'en'];
  readonly active = getActiveLocale();

  switchTo(lang: AppLocale): void {
    setLocale(lang);
  }
}
