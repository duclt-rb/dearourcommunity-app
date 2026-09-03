import { environment } from '../../../environments/environment';

/**
 * Locale của app — cố định theo mỗi page load; đổi ngôn ngữ = persist + full reload.
 *
 * Thứ tự resolve (chạy một lần, memoize):
 *   1. `?lang=` trên URL (frontpage truyền sang qua appUrls.*) → persist ngay
 *   2. localStorage `doc:locale`
 *   3. mặc định 'vi'
 *
 * Plain function (không phải service) để dùng được ở guard, field initializer,
 * factory provider — mọi nơi chạy trước/ngoài DI.
 */
export type AppLocale = 'vi' | 'en';

export const LOCALE_STORAGE_KEY = 'doc:locale';

const SUPPORTED: readonly AppLocale[] = ['vi', 'en'];

let resolved: AppLocale | null = null;

function readParam(): AppLocale | null {
  try {
    const lang = new URLSearchParams(window.location.search).get('lang');
    return SUPPORTED.includes(lang as AppLocale) ? (lang as AppLocale) : null;
  } catch {
    return null;
  }
}

function readStorage(): AppLocale | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return SUPPORTED.includes(stored as AppLocale) ? (stored as AppLocale) : null;
  } catch {
    return null;
  }
}

export function getActiveLocale(): AppLocale {
  if (resolved) return resolved;
  const fromParam = readParam();
  if (fromParam) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, fromParam);
    } catch {
      /* private mode — bỏ qua, locale vẫn đúng cho page load này */
    }
    resolved = fromParam;
    return resolved;
  }
  resolved = readStorage() ?? 'vi';
  return resolved;
}

/** Persist lựa chọn mới + reload trang (bỏ `?lang` cũ khỏi URL để không ghi đè). */
export function setLocale(locale: AppLocale): void {
  if (locale === getActiveLocale()) return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* không persist được thì vẫn reload với ?lang để đổi được ngôn ngữ */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete('lang');
  // Set ?lang mới phòng trường hợp localStorage bị chặn (private mode)
  url.searchParams.set('lang', locale);
  window.location.assign(url.toString());
}

/** LOCALE_ID cho Angular pipes (date/number). */
export function angularLocaleId(): string {
  return getActiveLocale() === 'en' ? 'en-US' : 'vi';
}

/** BCP-47 cho Intl.* / PrimeNG number-field. */
export function intlLocale(): string {
  return getActiveLocale() === 'en' ? 'en-US' : 'vi-VN';
}

/**
 * Link về Frontpage (Next.js, locale nằm trong prefix URL: /vi/... | /en/...).
 * Thay cho mọi URL hardcode `/vi/` rải rác trước đây.
 */
export function frontpageUrl(path = ''): string {
  const normalized = path && !path.startsWith('/') ? `/${path}` : path;
  return `${environment.appUrl}/${getActiveLocale()}${normalized}`;
}

/**
 * Chọn giá trị theo locale hiện hành — dùng được ở MODULE LEVEL vì
 * `getActiveLocale()` sync và locale cố định suốt page load.
 * Dùng cho các bảng nhãn/config per-locale (toolkit data, option lists).
 */
export function localePick<T>(byLocale: { vi: T; en: T }): T {
  return byLocale[getActiveLocale()];
}

/** Gắn ?lang=<locale> vào một URL cross-origin bất kỳ. */
export function withLang(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('lang', getActiveLocale());
    return u.toString();
  } catch {
    return url;
  }
}
