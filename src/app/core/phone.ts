/**
 * Chuẩn hoá & kiểm tra số điện thoại — PHẢI đồng bộ với BE
 * (dearourcommunity-be: modules/auth/dto/register.dto.ts + update-profile.dto.ts).
 *
 * Người dùng hay gõ kèm khoảng trắng/chấm/gạch/ngoặc (kể cả placeholder cũng gợi ý
 * "0912 345 678") — luôn normalize trước khi validate và trước khi gửi BE.
 * Chấp nhận: số VN nội địa `0[3-9]xxxxxxxx` hoặc quốc tế `+<8–15 số>` (khách APAC).
 */
export const PHONE_PATTERN = /^(?:\+\d{8,15}|0[3-9]\d{8})$/;

/** Bỏ khoảng trắng, chấm, gạch, ngoặc — giữ nguyên `+` đầu số quốc tế. */
export function normalizePhone(value: string): string {
  return value.replace(/[\s().-]/g, '');
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(normalizePhone(value));
}
