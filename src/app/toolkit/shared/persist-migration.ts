/**
 * Migration localStorage cho các store toolkit (quick-scan / waste / energy / datagov).
 *
 * V1 (trước i18n) persist theo NHÃN tiếng Việt (ProfileField.label, PriorityFocus.area,
 * info-field label, cột bản đồ dữ liệu…) và một số GIÁ TRỊ tiếng Việt (datagov:
 * 'Đồng ý', 'Có'…). V2 rekey toàn bộ theo id/enum ổn định để nhãn dịch được mà
 * dữ liệu người dùng đã lưu không vỡ.
 *
 * Nguyên tắc:
 * - Payload v2 mang `version: 2`; payload không có `version` là v1 → migrate.
 * - Map nhãn→id build TỪ CHÍNH CONFIG TIẾNG VIỆT lúc migrate (không drift).
 * - Key/giá trị không nhận diện được thì GIỮ NGUYÊN (forward tolerance).
 * - Idempotent: chạy lại trên payload v2 là no-op.
 */

export const TOOLKIT_PERSIST_VERSION = 2;

export interface VersionedPayload {
  version?: number;
}

export function needsMigration(raw: unknown): boolean {
  return (
    !!raw &&
    typeof raw === 'object' &&
    ((raw as VersionedPayload).version ?? 1) < TOOLKIT_PERSIST_VERSION
  );
}

/** Rekey một record theo map cũ→mới; key không có trong map giữ nguyên. */
export function rekeyRecord<T>(
  record: Record<string, T> | undefined,
  oldToNew: Record<string, string>,
): Record<string, T> {
  if (!record) return {};
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(record)) {
    result[oldToNew[key] ?? key] = value;
  }
  return result;
}

/** Map giá trị chuỗi theo bảng cũ→mới; giá trị lạ giữ nguyên. */
export function mapValue(value: string | undefined, oldToNew: Record<string, string>): string {
  if (value === undefined) return '';
  return oldToNew[value] ?? value;
}
