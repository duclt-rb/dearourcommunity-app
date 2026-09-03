import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

/** Brand suffix appended to every page title. */
export const APP_TITLE = 'Dear Our Community';

/**
 * Sets the document title from each route's `title` property (an i18n key
 * under `titles.*`), translated then suffixed with the brand name. Routes
 * without a `title` fall back to the brand name alone.
 *
 * Dịch sync được vì file dịch đã preload trong provideAppInitializer
 * (app.config.ts) trước khi routing chạy.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly transloco = inject(TranslocoService);

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(snapshot);
    this.title.setTitle(
      titleKey ? `${this.transloco.translate(titleKey)} | ${APP_TITLE}` : APP_TITLE,
    );
  }
}
