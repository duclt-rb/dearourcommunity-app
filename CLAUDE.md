# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task             | Command                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| Dev server       | `npm start` (ng serve, `local` config → API at `localhost:3000`)        |
| Dev server (alt) | `npm run start:dev` (`development` config → `*.dearourcommunity.local`) |
| Build            | `npm run build` (defaults to `production` config)                       |
| Build watch      | `npm run watch` (`local` config)                                        |
| Unit test        | `npm test` (Vitest via Angular CLI builder)                             |
| E2E test         | `npm run test:e2e` (Playwright; `:ui` and `:debug` variants exist)      |
| Lint / fix       | `npm run lint` / `npm run lint:fix`                                     |
| Format / check   | `npm run format` / `npm run format:check`                               |

Dev server runs on `localhost:4200`. Run a single Vitest test with `npm test -- -t "<test name>"`. Playwright `baseURL` is `localhost:4200`, so the dev server must be running for e2e.

## Architecture

**Angular 21** standalone-component SPA, lazy-loaded routes, no NgModules anywhere.

**Stack:** Angular 21 + Tailwind CSS 4 + PrimeNG 21 (Aura theme via custom preset) + NgRx Signals (state) + NgRx Store/router-store (router state only) + Lucide Angular icons. E2E via Playwright.

**API layer — `@dearourcommunity/client`:** typed NestJS BFF client. Entry point is `Client` exposing sub-clients: `auth`, `mentors`, `org`, `packages`, `course`, `purchases`, `payment`, `health`. **Never instantiate `Client` directly in components** — inject the singleton `ClientService` (`src/app/core/services/client.service.ts`), which constructs the client from `environment.apiBaseUrl`, persists the bearer token to `localStorage` under `doc:access_token`, and rehydrates it on startup. Thin domain services (`auth.service.ts`, `course.service.ts`, `payment.service.ts`, etc.) wrap `ClientService` getters; components/stores depend on those services, not on `ClientService` or the raw client.

**State management — three global signal stores** (`{ providedIn: 'root' }`):

- `AuthStore` (`core/stores/auth.store.ts`) — current user, token, `isAuthenticated`. `login`/`register` call the service, persist the token, then fetch `me()`.
- `CheckoutStore` (`checkout/checkout.store.ts`) — selected package, coupon, MoMo payment params/result. Global so the `plans` page can set the package the `checkout` flow reads.
- `CourseStore` (`core/course.store.ts`) — currently mock/hardcoded course data (loaded via `withHooks` `onInit`); not yet wired to the API.

Feature-scoped stores (`profile.store.ts`, `lesson-player.store.ts`) live next to their components. `counter.store.ts` is the reference implementation, kept only as a signal-store example.

**Routing & guards:** Top-level areas — `auth/*`, `profile/*` (user dashboard, courses, certificates, plans, organization), `system/*` (admin: packages, transactions, mentors), `checkout/*` (billing → receipt), `course/:courseId/lesson/:lessonId`, `invitations/check`. Guards in `core/` and `checkout/`:

- `authGuard` / `systemGuard` redirect **with a hard `window.location.href`** (not the Angular `Router`) to `/auth/login?redirect=<encoded url>`; `systemGuard` additionally checks `user.isAdmin`.
- `checkoutGuard` requires a selected package in `CheckoutStore` (or resolves one from a `?packageId=` query param); `receiptGuard` gates the receipt page.

**Payment (MoMo):** `CheckoutStore.confirmPayment()` calls the BFF and redirects the browser to MoMo's `payUrl`. MoMo returns to `/checkout/receipt` with query params (`resultCode`, `orderId`, `transId`, `amount`, `extraData`). Read these via the router-store selectors in `core/router/router.selectors.ts`; `extraData` (base64/JSON) is decoded by `core/router/router.helper.ts`, and `core/router/momo-result-codes.ts` maps result codes to Vietnamese messages. `resultCode === '0'` means success.

**Payment (Bank transfer — manual, SDK ≥0.7.0):** Alternative to MoMo, no auto-IPN. In billing step 2, selecting "Bank Transfer" calls `CheckoutStore.prepareBankTransfer()` → `payment.createBankTransfer({ packageId, amount, couponCode? })`, which **only returns** the receiving account info, `transferContent` (= `orderId`, the memo the user must use), and a ready-to-render VietQR image `qrUrl` (server-built, amount + memo prefilled — no client BIN mapping) — it does **not** write a DB record. After transferring, the user clicks "Tôi đã chuyển khoản" → `confirmBankTransfer()`, which is the step that **creates** the transaction at status `awaiting_confirmation`. Since `ConfirmBankTransferDto extends CreateBankTransferDto`, that call must resend `{ orderId, packageId, amount (= original pkg.price), couponCode? }` — all already in `CheckoutStore`. Admins review in `system/transactions`: `payment.approveTransaction(id)` activates the package (reuses the MoMo completion flow → `success`) or `payment.rejectTransaction(id, { reason })` → `failed`. Statuses: bank transfer goes `awaiting_confirmation → success | failed` (no `pending`; `pending` is MoMo's initial state). **Note:** `payment.getTransactions(query?)` returns `Paginated<Transaction>` (`{ items, meta }`), not a bare array.

**Coupons (server-authoritative, SDK ≥0.6.8):** `createPayment`/`createBankTransfer` take an optional `couponCode`; **always send `amount = pkg.price` (original)** — the server computes the discount. Do NOT pre-discount on the client. `CreateBankTransferResponse` and `Transaction` carry `originalAmount` / `discountAmount` / `couponCode`; the billing bank panel shows that breakdown. The coupon input is collected optimistically (no client-side validation/whitelist); the real discount is revealed by the server response.

**Environments:** `src/environments/environment.ts` (default → `*.dearourcommunity.local`), `environment.local.ts` (`localhost`), `environment.prod.ts`. Angular `fileReplacements` swap these per build configuration (`local` / `development` / `production`).

**Styles:** Two global files load in order — `src/tailwind.css` (design tokens via `@theme`) then `src/styles.scss` (font-face + reset). PrimeNG theme is a custom Aura preset (`src/app/theme.preset.ts`) with the project's purple primary scale; CSS layer order is `tailwind-base, primeng, tailwind-utilities`. Tailwind v4 uses `@theme`, not `tailwind.config.js`.

**Design tokens** live in `src/tailwind.css` — primary purple scale, gray scale, semantic colors (success/warning/info/error), accents, radii, font sizes, letter spacing. Use these tokens; don't hardcode colors. `theme.html` (repo root) is a standalone design-system reference, not part of the build.

**Language note:** Much of the UI copy and inline code comments are in Vietnamese. Match the surrounding language when editing.

## Conventions

- **Lazy-loaded components** use `export default class` (Angular 21 `loadComponent` convention)
- **Component prefix:** `app` (ESLint-enforced), kebab-case selectors; **Directive prefix:** `app`, camelCase attributes
- **Signal stores:** `signalStore()` + `withState()`/`withComputed()`/`withMethods()`/`withHooks()`, mutate via `patchState()`. Inject services in `withMethods`
- **Component state:** Angular signals (`signal()`, `computed()`)
- **Forms:** Angular signal-based forms (`form()`, `FormField` directive, validators from `@angular/forms/signals`: `required`, `email`, `minLength`, `validate`, `patternError`)
- **Icons:** import individual Lucide components by name (e.g. `LucideMail`), use as `<svg lucideMail [size]="18" strokeWidth="1.5">`
- **CSS naming:** BEM-style in SCSS (e.g. `login-form__header`, `field__input-wrapper`)
- **ViewEncapsulation:** auth components use `ViewEncapsulation.None` so Tailwind utilities and shared styles apply
- **PrimeNG PassThrough:** use `inputPt` / `submitPt` objects for inline PrimeNG styling (border, background, font); SCSS handles hover/focus/invalid states with `!important` to override the theme
- **Formatting:** Prettier — single quotes, trailing commas, 100-char width, 2-space tabs, LF endings
- **Pre-commit:** Husky + lint-staged runs ESLint `--fix` on `*.{ts,html}` and Prettier on `*.{ts,html,css,scss,json,md}`

## Project Structure

```
src/
  tailwind.css            # Design system tokens (@theme)
  styles.scss             # Font-face (Forma DJR) + global reset
  environments/           # environment.ts / .local.ts / .prod.ts (swapped via fileReplacements)
  app/
    app.config.ts         # Providers (router, NgRx store + router-store, PrimeNG preset, Lucide)
    app.routes.ts         # Lazy route definitions + guard wiring
    theme.preset.ts       # Custom PrimeNG Aura preset (purple palette)
    counter.store.ts      # Signal-store reference implementation
    core/
      services/           # client.service.ts (singleton) + domain services (auth, course, payment, …)
      stores/auth.store.ts
      course.store.ts
      router/             # router-store selectors + MoMo helpers/result codes
      auth.guard.ts, system.guard.ts
    auth/                 # auth-layout (shared split layout), login, register
    profile/              # dashboard, courses, certificates, plans, organization, sidebar, profile.store
    system/               # admin: packages, transactions, mentors
    checkout/             # billing, receipt, checkout.store, checkout.guard, receipt.guard
    courses/lesson-player/
    invitations/check/
    shared/logo/
e2e/                      # Playwright specs
public/                   # logo.png, fonts/ (Forma DJR)
theme.html                # Design system reference (not part of build)
```
