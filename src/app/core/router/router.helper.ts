/**
 * Giải mã Base64 an toàn cho cả định dạng URL-safe và URL-encoded
 * Tránh ném ra lỗi InvalidCharacterError trong môi trường trình duyệt khi gặp ký tự lạ hoặc padding thiếu.
 */
export function safeDecodeBase64(str: string): string {
  if (!str || str === 'undefined' || str === 'null') {
    throw new Error('Input is empty or invalid string');
  }

  // 1. Giải mã URL (ví dụ: biến %3D thành =, %2F thành /)
  let base64 = decodeURIComponent(str).trim();

  // 2. Chuyển đổi ký tự URL-safe sang Base64 tiêu chuẩn
  base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

  // 3. Loại bỏ TUYỆT ĐỐI các ký tự không hợp lệ trong Base64 (như khoảng trắng, dấu ngoặc kép...)
  base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');

  if (base64.length < 4) {
    throw new Error('Cleaned string is too short to be a valid base64');
  }

  // 4. Tự động thêm ký tự padding '=' nếu thiếu
  const pad = base64.length % 4;
  if (pad === 2) {
    base64 += '==';
  } else if (pad === 3) {
    base64 += '=';
  }

  return atob(base64);
}

/**
 * Giải mã và phân tích cú pháp extraData từ query param một cách an toàn.
 * Hỗ trợ cả trường hợp extraData là chuỗi JSON thô hoặc chuỗi đã mã hóa Base64.
 */
export function safeParseExtraData(
  str: string,
): { packageId?: string; userId?: string; bookingId?: string } | null {
  if (!str || str === 'undefined' || str === 'null') {
    return null;
  }

  try {
    // 1. Giải mã URL trước
    const decodedUri = decodeURIComponent(str).trim();

    // 2. Nếu đã là chuỗi JSON thuần thì phân tích trực tiếp
    if (decodedUri.startsWith('{') && decodedUri.endsWith('}')) {
      try {
        return JSON.parse(decodedUri);
      } catch {
        // Bỏ qua lỗi và chuyển tiếp sang giải mã Base64
      }
    }

    // 3. Nếu không phải JSON thuần, thử giải mã Base64
    const decodedBase64 = safeDecodeBase64(str);
    return JSON.parse(decodedBase64);
  } catch (e) {
    if (str.length > 10) {
      console.warn('Failed to parse extraData in safeParseExtraData:', e);
    }
    return null;
  }
}
