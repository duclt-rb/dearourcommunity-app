import { intlLocale } from './locale';

/**
 * Format tiền VNĐ theo locale đang hiển thị (vi: 1.234.567 · en: 1,234,567).
 * Thay cho các chỗ hardcode `toLocaleString('vi-VN')`.
 */
export function formatVnd(amount: number): string {
  return `${amount.toLocaleString(intlLocale())} VNĐ`;
}

/** Chỉ phần số, không hậu tố đơn vị. */
export function formatNumber(amount: number): string {
  return amount.toLocaleString(intlLocale());
}
