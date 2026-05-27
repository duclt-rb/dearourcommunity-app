# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task         | Command                                  |
| ------------ | ---------------------------------------- |
| Dev server   | `npm start` (ng serve on localhost:4200) |
| Build        | `npm run build`                          |
| Build watch  | `npm run watch`                          |
| Test         | `npm test` (Vitest via Angular CLI)      |
| Lint         | `npm run lint`                           |
| Lint + fix   | `npm run lint:fix`                       |
| Format       | `npm run format`                         |
| Format check | `npm run format:check`                   |

## Architecture

**Angular 21** standalone component SPA with lazy-loaded routes. No NgModules anywhere.

**Stack:** Angular 21 + Tailwind CSS 4 + PrimeNG 21 (Aura theme) + NgRx Signals + Lucide Angular icons

**API layer:** `@dearourcommunity/client` — typed NestJS BFF client. Entry point is `DocClient` which exposes sub-clients: `auth`, `org`, `packages`, `course`, `purchases`, `health`. Token-based auth via `DocClientOptions`. Inject `ClientService` (singleton) to access API: `this.client.auth.register(dto)`, `this.client.auth.login(dto)`.

**Styles:** Two global style files load in order: `src/tailwind.css` (design tokens via `@theme`) then `src/styles.scss` (font-face + reset). Component styles are SCSS with BEM naming. Tailwind v4 uses the `@theme` directive, not `tailwind.config.js`.

**Design tokens** are in `src/tailwind.css` — primary purple scale, gray scale, semantic colors (success/warning/info/error), accent colors, border radii, font sizes, letter spacing. Use these tokens, don't hardcode colors.

## Conventions

- **Lazy-loaded components** use `export default class` (Angular 21 convention for `loadComponent`)
- **Component prefix:** `app` (enforced by ESLint), kebab-case selectors
- **Directive prefix:** `app`, camelCase attributes
- **State management:** NgRx Signal Store with `signalStore()`, `withState()`, `withComputed()`, `withMethods()`, `patchState()`. See `counter.store.ts` for reference.
- **Component state:** Angular signals (`signal()`, `computed()`)
- **Forms:** Angular signal-based forms (`form()`, `FormField` directive, validators from `@angular/forms/signals`: `required`, `email`, `minLength`, `validate`, `patternError`)
- **Icons:** Import individual Lucide components by name (e.g., `LucideMail`, `LucideLock`), use as `<svg lucideMail [size]="18" strokeWidth="1.5">`
- **CSS naming:** BEM-style in SCSS (e.g., `login-form__header`, `field__input-wrapper`)
- **ViewEncapsulation:** Auth components use `ViewEncapsulation.None` so Tailwind utilities and shared styles work correctly
- **PrimeNG PassThrough:** Use `inputPt` / `submitPt` objects for inline PrimeNG styling (border, background, font). SCSS handles hover/focus/invalid states with `!important` to override PrimeNG theme
- **Formatting:** Prettier with single quotes, trailing commas, 100 char width, 2-space tabs, LF line endings
- **Pre-commit:** Husky + lint-staged runs ESLint fix on `*.{ts,html}` and Prettier on `*.{ts,html,css,scss,json,md}`

## Project Structure

```
src/
  tailwind.css          # Design system tokens (@theme)
  styles.scss           # Font-face (Forma DJR) + global reset
  main.ts               # Bootstrap
  app/
    app.config.ts       # Providers (router, PrimeNG, Lucide, animations)
    app.routes.ts       # Route definitions (lazy-loaded)
    counter.store.ts    # NgRx Signal Store reference implementation
    auth/
      auth-layout/      # Shared split layout (left visual + right form slot)
      login/            # Login page (ts + html + scss)
      register/         # Register page (ts + html + scss)
public/
  logo.png              # Brand logo
  fonts/                # Forma DJR .otf files
theme.html              # Design system reference (not part of build)
```
