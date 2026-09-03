import { ApiError } from '@dearourcommunity/client';

/**
 * Rút message hiển thị được từ một lỗi API.
 *
 * BE (nestjs-zod + HttpExceptionFilter) trả lỗi validate dạng
 * `{ message: 'Validation failed', details: { field: ['message cụ thể'] } }` —
 * `message` chung chung, thông tin thật nằm trong `details`. Ưu tiên message
 * cụ thể đầu tiên trong `details`; không có thì dùng `err.message`; không phải
 * ApiError thì dùng `fallback` (chuỗi đã dịch theo locale).
 */
export function apiErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof ApiError)) return fallback;
  const details = err.details;
  if (details && typeof details === 'object' && !Array.isArray(details)) {
    for (const messages of Object.values(details as Record<string, unknown>)) {
      if (Array.isArray(messages) && typeof messages[0] === 'string' && messages[0]) {
        return messages[0];
      }
    }
  }
  return err.message || fallback;
}
