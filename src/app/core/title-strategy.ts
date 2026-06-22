import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/** Brand suffix appended to every page title. */
export const APP_TITLE = 'Dear Our Community';

/**
 * Sets the document title from each route's `title` property, appending the
 * brand name. Routes without a `title` fall back to the brand name alone.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    this.title.setTitle(pageTitle ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE);
  }
}
