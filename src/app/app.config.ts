import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideLucideConfig } from '@lucide/angular';
import { providePrimeNG } from 'primeng/config';
import CustomPreset from './theme.preset';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    providePrimeNG({
      theme: {
        preset: CustomPreset,
        options: {
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
