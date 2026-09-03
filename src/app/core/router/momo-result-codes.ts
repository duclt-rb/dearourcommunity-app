/**
 * Mã kết quả MoMo đã biết — message hiển thị nằm trong i18n (`checkout.momo.c<code>`,
 * vi + en), dịch tại nơi render bằng `translate(momoResultKey(code))`.
 */
export const MOMO_RESULT_CODES = [
  '0',
  '10',
  '11',
  '12',
  '13',
  '20',
  '21',
  '22',
  '40',
  '41',
  '42',
  '43',
  '45',
  '47',
  '98',
  '99',
  '1000',
  '1001',
  '1002',
  '1003',
  '1004',
  '1005',
  '1006',
  '1007',
  '1017',
  '1026',
  '1080',
  '1081',
  '1088',
  '2019',
  '4001',
  '4002',
  '4100',
  '7000',
  '7002',
  '9000',
] as const;

const KNOWN_CODES = new Set<string>(MOMO_RESULT_CODES);

/**
 * Trả về key i18n tương ứng với mã kết quả MoMo.
 * Mã lạ / thiếu → `checkout.momo.unknown`.
 */
export function momoResultKey(resultCode: string | number | null | undefined): string {
  if (resultCode === null || resultCode === undefined) return 'checkout.momo.unknown';
  const codeStr = String(resultCode).trim();
  return KNOWN_CODES.has(codeStr) ? 'checkout.momo.c' + codeStr : 'checkout.momo.unknown';
}
