import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideLucideConfig } from '@lucide/angular';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import CustomPreset from './theme.preset';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/title-strategy';
import { angularLocaleId, getActiveLocale } from './core/i18n/locale';
import { TranslocoFetchLoader } from './core/i18n/transloco-loader';
import { environment } from '../environments/environment';

registerLocaleData(localeVi, 'vi');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    // Locale cố định theo page load (đổi ngôn ngữ = reload) → cung cấp tĩnh được
    { provide: LOCALE_ID, useFactory: angularLocaleId },
    provideTransloco({
      config: {
        availableLangs: ['vi', 'en'],
        defaultLang: getActiveLocale(),
        fallbackLang: 'vi',
        // Reload-on-switch: không cần re-render theo lang, giữ mọi thứ sync/zoneless-trivial
        reRenderOnLangChange: false,
        prodMode: environment.production,
        missingHandler: {
          useFallbackTranslation: true,
          logMissingKey: !environment.production,
        },
      },
      loader: TranslocoFetchLoader,
    }),
    // Preload file dịch TRƯỚC khi routing chạy → translate() sync ở mọi nơi
    // (store toast, guard, title strategy, alert/confirm).
    provideAppInitializer(() => {
      const transloco = inject(TranslocoService);
      const primeng = inject(PrimeNG);
      return firstValueFrom(transloco.load(getActiveLocale())).then(() => {
        primeng.setTranslation(transloco.translateObject('primeng'));
        document.documentElement.lang = getActiveLocale();
      });
    }),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    providePrimeNG({
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideLucideConfig({
      size: 24,
      color: 'currentColor',
      strokeWidth: 2,
    }),
  ],
};
