export const MOMO_RESULT_MESSAGES: Record<string, string> = {
  '0': 'Giao dịch thành công.',
  '10': 'Hệ thống MoMo đang bảo trì. Vui lòng thử lại sau khi thời gian bảo trì kết thúc.',
  '11': 'Truy cập bị từ chối. Vấn đề cài đặt đối tác, vui lòng kiểm tra lại cấu hình tài khoản.',
  '12': 'Phiên bản API thanh toán không được hỗ trợ. Vui lòng nâng cấp lên phiên bản mới nhất.',
  '13': 'Xác thực đối tác thất bại. Vui lòng kiểm tra lại thông tin đăng ký ví đối tác.',
  '20': 'Yêu cầu sai định dạng. Vui lòng kiểm tra lại các tham số gửi đi.',
  '21': 'Yêu cầu bị từ chối do số tiền giao dịch không hợp lệ.',
  '22': 'Số tiền giao dịch vượt quá giới hạn cho phép của phương thức thanh toán.',
  '40': 'Mã yêu cầu (requestId) bị trùng lặp. Vui lòng thử lại với mã yêu cầu khác.',
  '41': 'Mã đơn hàng (orderId) đã tồn tại. Vui lòng truy vấn trạng thái hoặc thử lại với mã đơn mới.',
  '42': 'Mã đơn hàng (orderId) không hợp lệ hoặc không tìm thấy trên hệ thống.',
  '43': 'Yêu cầu bị từ chối do có giao dịch tương tự đang được xử lý.',
  '45': 'Trùng lặp mã sản phẩm (ItemId). Vui lòng kiểm tra lại thông tin đơn hàng.',
  '47': 'Yêu cầu bị từ chối do thông tin cung cấp không phù hợp hoặc không hợp lệ.',
  '98': 'Tạo mã QR thanh toán thất bại. Vui lòng thực hiện lại yêu cầu sau ít phút.',
  '99': 'Lỗi hệ thống không xác định từ MoMo. Vui lòng liên hệ chăm sóc khách hàng MoMo để được hỗ trợ.',
  '1000': 'Giao dịch đã được khởi tạo, đang chờ bạn xác nhận thanh toán trên ứng dụng MoMo.',
  '1001': 'Thanh toán thất bại do tài khoản ví MoMo của bạn không đủ số dư.',
  '1002':
    'Giao dịch bị từ chối bởi nhà phát hành phương thức thanh toán. Vui lòng chọn phương thức thanh toán khác.',
  '1003': 'Giao dịch bị hủy tự động do quá thời gian xác nhận thanh toán (timeout).',
  '1004': 'Giao dịch thất bại do số tiền vượt quá hạn mức thanh toán ngày hoặc tháng của bạn.',
  '1005':
    'Đường dẫn thanh toán hoặc mã QR đã hết hạn. Vui lòng thực hiện gửi lại yêu cầu thanh toán mới.',
  '1006': 'Giao dịch thất bại do bạn đã từ chối xác nhận thanh toán trên ứng dụng MoMo.',
  '1007': 'Tài khoản MoMo của bạn chưa được kích hoạt hoặc không tồn tại. Vui lòng kiểm tra lại.',
  '1017': 'Giao dịch đã bị hủy bởi hệ thống hoặc phía đối tác.',
  '1026': 'Giao dịch bị hạn chế do không thỏa mãn các quy định chương trình khuyến mãi.',
  '1080':
    'Yêu cầu hoàn tiền thất bại trong quá trình xử lý. Vui lòng thực hiện lại sau khoảng 1 giờ.',
  '1081':
    'Hoàn tiền bị từ chối. Giao dịch gốc đã được hoàn tiền hoặc vượt quá số tiền hoàn tối đa.',
  '1088': 'Giao dịch gốc không đủ điều kiện hoặc đã quá hạn thời gian để thực hiện hoàn tiền.',
  '2019': 'Yêu cầu bị từ chối do mã nhóm đơn hàng (orderGroupId) không hợp lệ.',
  '4001': 'Giao dịch bị từ chối do tài khoản ví MoMo của bạn đang bị hạn chế hoạt động.',
  '4002':
    'Giao dịch bị từ chối do tài khoản chưa được xác thực sinh trắc học bằng căn cước công dân qua NFC (C06).',
  '4100': 'Giao dịch thất bại do bạn đăng nhập tài khoản ví MoMo không thành công.',
  '7000': 'Giao dịch đang được xử lý. Vui lòng kiên nhẫn đợi trong giây lát.',
  '7002': 'Giao dịch đang được xử lý bởi nhà cung cấp dịch vụ thanh toán. Vui lòng đợi kết quả.',
  '9000': 'Giao dịch đã được ủy quyền thành công. Đang tiến hành cập nhật trạng thái đơn hàng.',
};

/**
 * Trả về thông báo tiếng Việt tương ứng với mã kết quả MoMo.
 */
export function getMomoResultMessage(resultCode: string | number | null | undefined): string {
  if (resultCode === null || resultCode === undefined) {
    return 'Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.';
  }
  const codeStr = String(resultCode).trim();
  return (
    MOMO_RESULT_MESSAGES[codeStr] ??
    'Đã có lỗi không xác định xảy ra (Mã lỗi: ' + codeStr + '). Vui lòng thử lại.'
  );
}
