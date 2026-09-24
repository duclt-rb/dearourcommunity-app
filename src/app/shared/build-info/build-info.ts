import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface BuildInfo {
  version: string;
  commit: string;
  builtAt: string;
}

// Nhúng lúc build qua `--define` (scripts/ng-build-info.mjs); build thẳng `ng build` thì không có.
declare const __BUILD_INFO__: BuildInfo | undefined;

export const APP_BUILD_INFO: BuildInfo =
  typeof __BUILD_INFO__ !== 'undefined'
    ? __BUILD_INFO__
    : { version: 'dev', commit: 'dev', builtAt: '' };

/**
 * Dòng phiên bản ở cuối dashboard — chỉ hiện "v0.1.0"; rê chuột xem commit + giờ build
 * (so với git để biết trình duyệt đang chạy bản nào).
 */
@Component({
  selector: 'app-build-info',
  standalone: true,
  imports: [DatePipe, TranslocoPipe],
  template: `
    <p
      class="build-info"
      [title]="app.commit + (app.builtAt ? ' · ' + (app.builtAt | date: 'dd/MM/yyyy HH:mm') : '')"
    >
      {{ 'profile.dashboard.buildTitle' | transloco }} v{{ app.version }}
    </p>
  `,
  styles: [
    `
      .build-info {
        margin-top: 32px;
        font-size: 12px;
        line-height: 18px;
        color: rgba(28, 28, 28, 0.45);
      }
    `,
  ],
})
export default class BuildInfoComponent {
  readonly app = APP_BUILD_INFO;
}
