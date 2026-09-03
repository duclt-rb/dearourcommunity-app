import { Injectable } from '@angular/core';
import type { Translation, TranslocoLoader } from '@jsverse/transloco';

/**
 * Loader dùng fetch thay vì HttpClient — app không provide HttpClient
 * (mọi API đi qua SDK @dearourcommunity/client), không thêm chỉ vì i18n.
 * File dịch nằm ở public/i18n/{vi,en}.json → serve tại /i18n/<lang>.json.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoFetchLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Translation> {
    return fetch(`/i18n/${lang}.json`).then((res) => {
      if (!res.ok) throw new Error(`Failed to load i18n file for "${lang}"`);
      return res.json();
    });
  }
}
