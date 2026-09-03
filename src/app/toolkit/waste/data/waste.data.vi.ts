import type { WasteToolkitConfig } from '../waste.types';

/**
 * Waste Toolkit — Module B · Dịch vụ F&B.
 * Source: EB_Module_B_WasteToolkit_DichVu_FnB_VI.xlsx (v1.0 · 2026).
 */
const FNB: WasteToolkitConfig = {
  id: 'waste-toolkit-fnb',
  name: 'Bộ công cụ Quản lý Chất thải — Dịch vụ F&B',
  sector: 'Module B — Ngành Dịch vụ F&B · Eco Solutions Vietnam',
  introLead:
    'Lập bản đồ chất thải, đánh giá thực hành (40 câu · 6 nhóm), chấm điểm nhà thầu, theo dõi ' +
    'food waste & chi phí, rồi xây kế hoạch 90 ngày. Tập trung vào rác thực phẩm, dầu/mỡ thải, ' +
    'nhựa dùng một lần & bao bì, phân loại tại nguồn và vệ sinh khu vực ăn uống. ' +
    'Dữ liệu được lưu tự động trên trình duyệt.',
  tracker: {
    stepLabel: 'Food Waste',
    title: 'Theo dõi rác thải thực phẩm (Food Waste)',
    note: 'Ghi food waste theo nguồn mỗi tuần. Nhập giá vốn thực phẩm bình quân (VNĐ/kg) để thấy số tiền thật bị lãng phí.',
    costLabel: 'Giá vốn thực phẩm bình quân mỗi kg',
    costPlaceholder: 'VD: 35.000 VNĐ',
    sourceHeader: 'Nguồn / Loại',
    annualLabel: 'Ước tính chi phí mất mát mỗi năm',
    resultCardLabel: 'Chi phí food waste / năm',
    tip: 'Một nhà hàng lãng phí 50kg/tuần × 35.000đ ≈ 91 triệu VNĐ/năm — chỉ riêng food waste. Đây là khoản chi phí bạn kiểm soát được ngay mà không cần tăng doanh thu.',
  },

  // Bản đồ Rác thải — Dịch vụ F&B
  mappingFields: [
    { id: 'business-name', label: 'Tên doanh nghiệp' },
    {
      id: 'business-type',
      label: 'Loại hình F&B',
      hint: 'VD: Nhà hàng, Quán cà phê, Foodservice, Bar/Bistro',
    },
    { id: 'site-count', label: 'Số điểm bán / cơ sở' },
    { id: 'mapping-date', label: 'Ngày lập bản đồ', type: 'date' },
    { id: 'conducted-with', label: 'Thực hiện cùng', hint: 'Tên chuyên gia Eco Solutions' },
  ],
  wasteStreamGroups: [
    {
      label: 'Hữu cơ (rác thực phẩm)',
      streams: [
        { id: 'fnb-food-prep', label: 'Rác thực phẩm — sơ chế', unit: 'kg' },
        { id: 'fnb-food-spoil', label: 'Rác thực phẩm — hư hỏng / quá hạn', unit: 'kg' },
        { id: 'fnb-food-plate', label: 'Rác thực phẩm — khách bỏ thừa', unit: 'kg' },
      ],
    },
    {
      label: 'Tái chế',
      streams: [
        { id: 'fnb-paper', label: 'Bao bì giấy / bìa carton', unit: 'kg' },
        { id: 'fnb-glass', label: 'Chai / lon / thủy tinh', unit: 'kg' },
        { id: 'fnb-metal', label: 'Vỏ hộp / lon kim loại', unit: 'kg' },
      ],
    },
    {
      label: 'Rác thường',
      streams: [
        { id: 'fnb-single-plastic', label: 'Nhựa dùng một lần (ly, ống hút, hộp)', unit: 'kg' },
        { id: 'fnb-food-plastic', label: 'Bao bì nhựa thực phẩm', unit: 'kg' },
        { id: 'fnb-broken-glass', label: 'Đồ thủy tinh / sứ vỡ', unit: 'kg' },
        { id: 'fnb-tissue', label: 'Khăn giấy / rác khu vực khách', unit: 'kg' },
        { id: 'fnb-general', label: 'Rác thải sinh hoạt chung', unit: 'túi' },
      ],
    },
    {
      label: 'Nguy hại',
      streams: [
        { id: 'fnb-uco', label: 'Dầu ăn thải (used cooking oil)', unit: 'lít' },
        { id: 'fnb-fog', label: 'Mỡ thải / bẫy mỡ (FOG)', unit: 'lít' },
        { id: 'fnb-chemical', label: 'Hóa chất tẩy rửa thải', unit: 'lít' },
        { id: 'fnb-battery', label: 'Pin / bóng đèn thải', unit: 'kg' },
        { id: 'fnb-weee', label: 'Thiết bị bếp / điện tử thải (WEEE)', unit: 'món' },
      ],
    },
  ],

  // Đánh giá Thực hành — 40 câu · 6 nhóm
  assessmentGroups: [
    {
      id: 'separation',
      topic: 'Phân loại & Tách rác tại nguồn',
      questions: [
        {
          id: 'sep-1',
          text: 'DN có phân loại rác thành ít nhất 3 nhóm: rác thực phẩm, tái chế, rác thường tại mỗi điểm bán không?',
          risk: 'Nghiêm trọng — Rác trộn không tái chế được; rủi ro phạt; ảnh hưởng hình ảnh nếu khách thấy',
          ref: 'Nghị định 45/2022/NĐ-CP (bắt buộc từ 01/01/2025)',
        },
        {
          id: 'sep-2',
          text: 'Thùng phân loại có được dán nhãn rõ, đặt đúng vị trí (bếp, khu khách, khu rửa) không?',
          risk: 'Cao — Thùng không nhãn = phân loại không xảy ra trong thực tế',
          ref: 'Tuân thủ thực tế',
        },
        {
          id: 'sep-3',
          text: 'DN có tách dầu ăn thải & mỡ thải (bẫy mỡ) riêng, không đổ xuống cống không?',
          risk: 'Nghiêm trọng — Đổ dầu/mỡ xuống cống gây tắc, ô nhiễm; bị phạt',
          ref: 'Luật BVMT 2020; QCVN nước thải',
        },
        {
          id: 'sep-4',
          text: 'Rác nguy hại (pin, bóng đèn, hóa chất tẩy rửa) có được tách khỏi rác thường không?',
          risk: 'Cao — Trộn rác nguy hại với rác thường là vi phạm',
          ref: 'Thông tư 02/2022/TT-BTNMT',
        },
        {
          id: 'sep-5',
          text: 'Rác thực phẩm có được tách & lưu trữ đúng cách hằng ngày trước khi thu gom không?',
          risk: 'Cao — Rác hữu cơ lưu sai: mùi, côn trùng, thanh tra y tế',
          ref: 'An toàn vệ sinh thực phẩm',
        },
        {
          id: 'sep-6',
          text: 'Toàn bộ nhân viên (kể cả bán thời gian, mới) có biết bỏ loại rác nào vào thùng nào không?',
          risk: 'Cao — Kiến thức chỉ ở vài người = phân loại thiếu nhất quán',
          ref: 'Đào tạo & tuân thủ',
        },
        {
          id: 'sep-7',
          text: 'Việc phân loại có được giám sát ít nhất hằng tuần không?',
          risk: 'Trung bình — Không giám sát thì nhiễm bẩn dòng tái chế tăng',
          ref: 'Quản lý nội bộ',
        },
      ],
    },
    {
      id: 'contractor',
      topic: 'Xử lý & Tuân thủ Nhà thầu',
      questions: [
        {
          id: 'con-1',
          text: 'DN có dùng đơn vị thu gom có giấy phép cho rác không phải rác sinh hoạt (dầu thải, rác nguy hại) không?',
          risk: 'Nghiêm trọng — Xử lý không phép là bất hợp pháp; chủ DN chịu trách nhiệm',
          ref: 'Nghị định 08/2022/NĐ-CP',
        },
        {
          id: 'con-2',
          text: 'DN có giữ bản sao giấy phép còn hiệu lực của nhà thầu không?',
          risk: 'Cao — Không chứng minh được tuân thủ khi thanh tra',
          ref: 'Yêu cầu hồ sơ pháp lý',
        },
        {
          id: 'con-3',
          text: 'Dầu ăn thải có được giao cho đơn vị thu gom hợp pháp & có chứng từ không?',
          risk: 'Cao — Dầu thải bán cho nguồn không rõ có rủi ro pháp lý & ATTP cộng đồng',
          ref: 'Quản lý dầu thải',
        },
        {
          id: 'con-4',
          text: 'DN có hợp đồng/thỏa thuận bằng văn bản với đơn vị thu gom chính không?',
          risk: 'Cao — Không hợp đồng = không có cơ sở khi nhà thầu làm sai',
          ref: 'Bảo vệ hợp đồng',
        },
        {
          id: 'con-5',
          text: 'DN có lưu biên lai/hồ sơ thu gom ít nhất 3 năm không?',
          risk: 'Cao — Bắt buộc cho thanh tra',
          ref: 'Yêu cầu lưu trữ hồ sơ',
        },
        {
          id: 'con-6',
          text: 'DN đã xác minh đơn vị thu gom thực sự xử lý đúng quy định (không đổ trộm, không tái sử dụng dầu thải sai mục đích) chưa?',
          risk: 'Cao — DN có thể bị liên đới nếu nhà thầu xử lý sai; dầu thải tái sử dụng sai là rủi ro ATTP cộng đồng',
          ref: 'Trách nhiệm môi trường & ATTP',
        },
        {
          id: 'con-7',
          text: 'DN có theo dõi khối lượng & chi phí rác giao cho nhà thầu mỗi kỳ không?',
          risk: 'Trung bình — Không theo dõi = không kiểm soát chi phí',
          ref: 'Quản lý vận hành',
        },
      ],
    },
    {
      id: 'foodwaste',
      topic: 'Giảm thiểu Rác thải Thực phẩm',
      questions: [
        {
          id: 'fwr-1',
          text: 'DN có theo dõi lượng rác thực phẩm mỗi tuần theo nguồn (sơ chế, hư hỏng, khách bỏ thừa) không?',
          risk: 'Cao — Không đo được thì không giảm được; food waste thường 3–8% doanh thu nhà hàng',
          ref: 'Hiệu quả vận hành F&B',
        },
        {
          id: 'fwr-2',
          text: 'DN có quy trình đặt nguyên liệu dựa trên mức sử dụng thực tế thay vì ước lượng không?',
          risk: 'Cao — Đặt dư là nguyên nhân #1 gây lãng phí thực phẩm; ảnh hưởng trực tiếp biên lợi nhuận',
          ref: 'Quản lý mua hàng',
        },
        {
          id: 'fwr-3',
          text: 'Nguyên liệu dễ hỏng có được lưu trữ theo FIFO (nhập trước, dùng trước) không?',
          risk: 'Cao — Lỗi FIFO gây hư hỏng phòng tránh được; tổn thất trực tiếp',
          ref: 'ATTP & giảm lãng phí',
        },
        {
          id: 'fwr-4',
          text: 'Bếp có quy trình tận dụng nguyên liệu cận hạn/dư (món đặc biệt, ăn ca) không?',
          risk: 'Trung bình — Thực phẩm dùng được bị bỏ khi không có quy trình tái sử dụng',
          ref: 'Hiệu quả chi phí',
        },
        {
          id: 'fwr-5',
          text: 'DN có theo dõi rác khách bỏ thừa (plate waste) để phát hiện khẩu phần quá lớn không?',
          risk: 'Trung bình — Khẩu phần dư thừa hệ thống làm tăng chi phí/suất',
          ref: 'Quản lý thực đơn & khẩu phần',
        },
        {
          id: 'fwr-6',
          text: 'DN có cân nhắc quyên góp/chuyển thực phẩm dư an toàn thay vì bỏ đi không?',
          risk: 'Thấp — Bỏ lỡ giá trị cộng đồng & câu chuyện thương hiệu',
          ref: 'Giá trị chia sẻ',
        },
        {
          id: 'fwr-7',
          text: 'DN có đặt mục tiêu giảm food waste cho 3–6 tháng tới không?',
          risk: 'Trung bình — Không mục tiêu = không cải thiện',
          ref: 'Cải tiến liên tục',
        },
      ],
    },
    {
      id: 'plastic',
      topic: 'Nhựa dùng một lần & Bao bì',
      questions: [
        {
          id: 'pls-1',
          text: 'DN đã rà soát các vật phẩm nhựa dùng một lần đang sử dụng (ly, ống hút, hộp mang đi) chưa?',
          risk: 'Cao — Chi phí ẩn & rủi ro hình ảnh; quy định hạn chế nhựa đang tăng',
          ref: 'Đề án kinh tế tuần hoàn',
        },
        {
          id: 'pls-2',
          text: 'DN đã thay thế ít nhất 1–2 vật phẩm nhựa bằng lựa chọn tái sử dụng/phân hủy trong 12 tháng qua chưa?',
          risk: 'Trung bình — Bất lợi cạnh tranh & kỳ vọng khách hàng',
          ref: 'Giảm nhựa',
        },
        {
          id: 'pls-3',
          text: 'DN có khuyến khích khách mang ly/hộp riêng hoặc giảm bao bì khi mang đi không?',
          risk: 'Thấp — Bỏ lỡ cơ hội giảm chi phí & gắn kết khách hàng',
          ref: 'Trải nghiệm khách hàng',
        },
        {
          id: 'pls-4',
          text: 'Bao bì mang đi có ưu tiên vật liệu tái chế/phân hủy được trong ngân sách không?',
          risk: 'Trung bình — Chuyển dần thay vì đổi toàn bộ; cân bằng chi phí',
          ref: 'Mua hàng bền vững',
        },
        {
          id: 'pls-5',
          text: 'DN có truyền thông nỗ lực giảm nhựa tới khách hàng một cách trung thực (có số liệu) không?',
          risk: 'Thấp — Tuyên bố chung chung = rủi ro greenwashing',
          ref: 'Truyền thông không greenwashing',
        },
        {
          id: 'pls-6',
          text: 'DN có theo dõi chi phí bao bì & nhựa dùng một lần hằng tháng không?',
          risk: 'Trung bình — Không theo dõi = không kiểm soát chi phí ẩn',
          ref: 'Quản lý chi phí',
        },
      ],
    },
    {
      id: 'hygiene',
      topic: 'Lưu trữ Rác & Vệ sinh',
      questions: [
        {
          id: 'hyg-1',
          text: 'Khu lưu rác có sạch, có nắp, tách biệt khỏi khu chế biến thực phẩm không?',
          risk: 'Nghiêm trọng — Vi phạm vệ sinh; nhiễm chéo; than phiền khách/nhân viên',
          ref: 'Luật ATTP & vệ sinh',
        },
        {
          id: 'hyg-2',
          text: 'Thùng rác có còn tốt (không rò rỉ, nắp hoạt động) không?',
          risk: 'Trung bình — Thùng rò rỉ: nước rỉ rác, côn trùng, mùi',
          ref: 'Tiêu chuẩn vệ sinh',
        },
        {
          id: 'hyg-3',
          text: 'Bẫy mỡ (grease trap) có được vệ sinh & bảo trì định kỳ không?',
          risk: 'Cao — Bẫy mỡ tắc gây trào ngược, mùi, vi phạm vệ sinh',
          ref: 'Vệ sinh & nước thải',
        },
        {
          id: 'hyg-4',
          text: 'Khu vực chứa rác có được kiểm tra & vệ sinh hằng ngày không?',
          risk: 'Cao — Khu rác bỏ bê thu hút côn trùng, gây mùi trong môi trường ăn uống',
          ref: 'Tuân thủ vệ sinh',
        },
        {
          id: 'hyg-5',
          text: 'Hóa chất tẩy rửa có được lưu trữ riêng, dán nhãn, tách khỏi thực phẩm không?',
          risk: 'Cao — Rủi ro nhiễm hóa chất vào thực phẩm; vi phạm ATTP',
          ref: 'An toàn hóa chất',
        },
        {
          id: 'hyg-6',
          text: 'Có lối tiếp cận riêng cho xe thu gom rác không gây ảnh hưởng khu khách không?',
          risk: 'Thấp — Tiếp cận không quy hoạch gây gián đoạn & mất hình ảnh',
          ref: 'Hiệu quả vận hành',
        },
        {
          id: 'hyg-7',
          text: 'DN có quy trình kiểm soát côn trùng/loài gây hại định kỳ không?',
          risk: 'Cao — Côn trùng trong cơ sở F&B = rủi ro ATTP & uy tín nghiêm trọng',
          ref: 'An toàn vệ sinh thực phẩm',
        },
      ],
    },
    {
      id: 'staff',
      topic: 'Hành vi Nhân viên & Đào tạo',
      questions: [
        {
          id: 'stf-1',
          text: 'Toàn bộ nhân viên có được đào tạo xử lý & phân loại rác khi nhập môn không?',
          risk: 'Cao — Nhân viên mới là nguồn vi phạm phổ biến nhất',
          ref: 'Thực hành đào tạo',
        },
        {
          id: 'stf-2',
          text: 'Quản lý rác/giảm lãng phí có nằm trong giao ban hằng ngày/tuần không?',
          risk: 'Trung bình — Không nhắc lại = tuân thủ trôi dần',
          ref: 'Hệ thống quản lý',
        },
        {
          id: 'stf-3',
          text: 'Có người chịu trách nhiệm rõ ràng về quản lý rác tại mỗi điểm bán không?',
          risk: 'Cao — Không ai sở hữu = hệ thống rác không ai quản',
          ref: 'Phân vai rõ ràng',
        },
        {
          id: 'stf-4',
          text: 'Nhân viên bếp có được hướng dẫn cụ thể về giảm food waste (FIFO, khẩu phần) không?',
          risk: 'Cao — Hành vi bếp quyết định phần lớn lượng food waste',
          ref: 'Đào tạo vận hành',
        },
        {
          id: 'stf-5',
          text: 'Nhân viên có báo cáo kịp thời vấn đề về rác (thùng hỏng, côn trùng, đổ sai) không?',
          risk: 'Trung bình — Vấn đề không báo dồn lại thành sự cố',
          ref: 'Văn hóa an toàn',
        },
        {
          id: 'stf-6',
          text: 'DN có ghi nhận & xử lý sự cố liên quan đến rác/vệ sinh trong 12 tháng qua không?',
          risk: 'Chọn N/A nếu không có — nếu có, đã tìm nguyên nhân gốc chưa?',
          ref: 'Quản lý sự cố',
        },
      ],
    },
  ],

  // Đánh giá Nhà thầu
  contractorFields: [
    { id: 'contractor-name', label: 'Tên nhà thầu' },
    {
      id: 'license-number',
      label: 'Số giấy phép',
      hint: 'Xác minh tại DONRE địa phương hoặc cổng trực tuyến',
    },
    { id: 'license-expiry', label: 'Ngày hết hạn giấy phép', type: 'date' },
    { id: 'licensed-waste-types', label: 'Các loại chất thải được cấp phép xử lý' },
    { id: 'assessment-date', label: 'Ngày đánh giá', type: 'date' },
    { id: 'assessor', label: 'Người đánh giá' },
  ],
  contractorCriteria: [
    {
      id: 'license',
      label: 'Giấy phép hành nghề xử lý rác hợp lệ, còn hiệu lực',
      desc: 'Có giấy phép hành nghề còn hiệu lực, bao gồm các loại chất thải bạn phát sinh.',
      weight: 25,
      verify: 'Yêu cầu giấy phép. Xác minh số tại website/văn phòng DONRE.',
    },
    {
      id: 'manifest',
      label: 'Cung cấp chứng từ/biên bản (manifest) cho rác nguy hại',
      desc: 'Cấp phiếu chuyển giao / manifest cho mỗi lần thu gom chất thải nguy hại (gồm dầu/mỡ thải).',
      weight: 20,
      verify: 'Xin mẫu manifest của 3 lần thu gom gần nhất.',
    },
    {
      id: 'contract',
      label: 'Hợp đồng dịch vụ bằng văn bản rõ ràng',
      desc: 'Có hợp đồng dịch vụ bằng văn bản, nêu rõ nghĩa vụ cung cấp chứng từ xử lý.',
      weight: 15,
      verify: 'Soát hợp đồng hiện hành; kiểm tra điều khoản chứng từ & trách nhiệm.',
    },
    {
      id: 'practice',
      label: 'Bằng chứng xử lý đúng quy định (không đổ trộm)',
      desc: 'Đã xác minh rằng rác được đưa tới cơ sở được cấp phép — không đổ trộm.',
      weight: 15,
      verify: 'Yêu cầu địa chỉ cơ sở xử lý cuối cùng và kiểm tra đã đăng ký. Thăm nếu được.',
    },
    {
      id: 'records',
      label: 'Lưu trữ & cung cấp hồ sơ thu gom ≥ 3 năm',
      desc: 'Lưu trữ và cung cấp được biên lai/hồ sơ thu gom tối thiểu 3 năm.',
      weight: 10,
      verify: 'Yêu cầu trích xuất hồ sơ thu gom các kỳ trước.',
    },
    {
      id: 'capacity',
      label: 'Năng lực xử lý đúng các loại rác doanh nghiệp phát sinh',
      desc: 'Được cấp phép & có năng lực xử lý đúng mọi loại rác đặc thù bạn phát sinh (gồm dầu/mỡ thải).',
      weight: 10,
      verify: 'Đối chiếu danh mục rác phát sinh với phạm vi giấy phép của nhà thầu.',
    },
    {
      id: 'pricing',
      label: 'Giá cả minh bạch & độ tin cậy dịch vụ',
      desc: 'Giá rõ ràng, có chứng từ; thu gom đúng lịch; có đầu mối liên hệ rõ ràng.',
      weight: 5,
      verify: 'Soát 6 tháng hóa đơn & đánh giá độ đúng hẹn của dịch vụ.',
    },
  ],
  contractorChecklist: [
    {
      id: 'cl-1',
      priority: 'critical',
      text: 'Yêu cầu bản sao giấy phép hành nghề & kiểm tra hiệu lực trên cổng thông tin',
    },
    {
      id: 'cl-2',
      priority: 'critical',
      text: 'Xác nhận họ cấp chứng từ/manifest cho rác nguy hại',
    },
    {
      id: 'cl-3',
      priority: 'critical',
      text: 'Tham quan/xác minh nơi xử lý cuối cùng (tránh đổ trộm)',
    },
    {
      id: 'cl-4',
      priority: 'important',
      text: 'So sánh giá & điều khoản hợp đồng của ít nhất 2 nhà thầu',
    },
    {
      id: 'cl-5',
      priority: 'important',
      text: 'Kiểm tra năng lực xử lý đúng các loại rác đặc thù của bạn',
    },
    {
      id: 'cl-6',
      priority: 'standard',
      text: 'Yêu cầu tham chiếu từ khách hàng hiện tại của nhà thầu',
    },
  ],

  // Theo dõi Food Waste (weekly)
  foodSources: [
    { id: 'prep', label: 'Sơ chế thừa (gọt, cắt, tỉa)' },
    { id: 'spoil', label: 'Hư hỏng / quá hạn trong kho' },
    { id: 'plate', label: 'Khách bỏ thừa (plate waste)' },
    { id: 'cook-error', label: 'Nấu lỗi / cháy / sai món' },
    { id: 'display', label: 'Trưng bày không bán được' },
    { id: 'return', label: 'Trả món / hủy đơn' },
    { id: 'promo', label: 'Hết hạn khuyến mãi không kịp dùng' },
    { id: 'other', label: 'Khác' },
  ],

  // Kế hoạch 90 ngày
  planFields: [
    { id: 'business-name', label: 'Tên doanh nghiệp' },
    { id: 'plan-date', label: 'Ngày lập kế hoạch', type: 'date' },
    { id: 'eco-expert', label: 'Chuyên gia Eco Solutions' },
    { id: 'internal-owner', label: 'Người phụ trách (nội bộ)' },
    {
      id: 'next-review-date',
      label: 'Ngày review kế tiếp',
      type: 'date',
      hint: 'Khuyến nghị: 30 ngày sau khi lập',
    },
  ],
  actions: [
    {
      id: 'a1',
      priority: 'critical',
      action:
        'Dầu/mỡ thải: Ký hợp đồng với đơn vị thu gom dầu ăn thải hợp pháp; vệ sinh bẫy mỡ định kỳ; ngừng đổ dầu/mỡ xuống cống.',
      targetDay: 'Ngày 30',
      measure: 'Có hợp đồng thu gom dầu thải + lịch vệ sinh bẫy mỡ',
    },
    {
      id: 'a2',
      priority: 'critical',
      action: 'Vệ sinh: Tách khu lưu rác khỏi khu chế biến; thiết lập kiểm soát côn trùng định kỳ.',
      targetDay: 'Ngày 30',
      measure: 'Khu rác đạt chuẩn vệ sinh, có lịch diệt côn trùng',
    },
    {
      id: 'a3',
      priority: 'critical',
      action: 'Nhà thầu: Thu thập & lưu giấy phép + chứng từ của đơn vị thu gom; lưu hồ sơ 3 năm.',
      targetDay: 'Ngày 45',
      measure: 'Có đủ giấy phép & chứng từ cho 2 kỳ liên tiếp',
    },
    {
      id: 'a4',
      priority: 'important',
      action:
        'Phân loại: Thiết lập phân loại 3 nhóm tại bếp/khu khách/khu rửa; dán nhãn & đào tạo nhân viên.',
      targetDay: 'Ngày 45',
      measure: 'Phân loại đúng tại 100% khu vực sau 2 tuần kiểm tra',
    },
    {
      id: 'a5',
      priority: 'important',
      action:
        'Food waste: Bắt đầu theo dõi food waste hằng tuần theo nguồn; xác định nguồn lớn nhất tuần 1.',
      targetDay: 'Ngày 14',
      measure: 'Xác định được nguồn food waste lớn nhất',
    },
    {
      id: 'a6',
      priority: 'important',
      action: 'FIFO: Áp dụng kiểm tra FIFO hằng ngày; phân công người phụ trách xoay vòng kho.',
      targetDay: 'Ngày 30',
      measure: 'Checklist FIFO hoàn thành mỗi ngày trong 2 tuần',
    },
    {
      id: 'a7',
      priority: 'quickwin',
      action: 'Bản đồ Rác: Hoàn thành Bản đồ Rác thải & tính tổng chi phí rác/tháng.',
      targetDay: 'Ngày 7',
      measure: 'Bản đồ Rác hoàn chỉnh, biết tổng chi phí',
    },
    {
      id: 'a8',
      priority: 'quickwin',
      action: 'Nhựa: Rà soát vật phẩm nhựa dùng một lần; chọn 1–2 món thay thế trong 90 ngày.',
      targetDay: 'Ngày 45',
      measure: 'Đã thay ít nhất 1 vật phẩm nhựa dùng một lần',
    },
    {
      id: 'a9',
      priority: 'quickwin',
      action: 'Phân công: Chỉ định 1 người chịu trách nhiệm quản lý rác cho mỗi điểm bán.',
      targetDay: 'Ngày 7',
      measure: 'Đã có người phụ trách rõ ràng',
    },
  ],
  reviewMilestones: [
    { id: 'm30', title: '30 ngày', focus: 'Nền tảng: phân loại, nhà thầu hợp lệ, hồ sơ' },
    {
      id: 'm60',
      title: '60 ngày',
      focus: 'Hệ thống: theo dõi khối lượng & chi phí, đào tạo',
    },
    { id: 'm90', title: '90 ngày', focus: 'Chuẩn hóa: mục tiêu giảm thiểu & cải tiến liên tục' },
  ],
};

/**
 * Waste Toolkit — Module B · Sản xuất (nhà máy · xưởng).
 * Source: EB_Module_B_WasteToolkit_San_Xuat_VI.xlsx (v1.0 · 2026).
 */
const SUPPLY: WasteToolkitConfig = {
  id: 'waste-toolkit-supply',
  name: 'Bộ công cụ Quản lý Chất thải — Sản xuất',
  sector: 'Module B — Ngành Sản xuất · Eco Solutions Vietnam',
  introLead:
    'Lập bản đồ chất thải, đánh giá thực hành (40 câu · 6 nhóm), chấm điểm nhà thầu, theo dõi ' +
    'phế liệu & chi phí, rồi xây kế hoạch 90 ngày. Tập trung vào phế liệu sản xuất, rác nguy hại ' +
    '& hóa chất, kiểm soát ô nhiễm và nghĩa vụ tái chế (EPR). Dữ liệu được lưu tự động trên trình duyệt.',
  tracker: {
    stepLabel: 'Phế liệu',
    title: 'Theo dõi phế liệu & rác thải sản xuất',
    note: 'Ghi khối lượng (kg) theo tuần và nguồn. Nhập chi phí xử lý bình quân (VNĐ/kg) để quy ra tiền. Lưu ý: phế liệu tái chế có thể có giá trị thu hồi (bán).',
    costLabel: 'Chi phí xử lý bình quân mỗi kg',
    costPlaceholder: 'VD: 2.000 VNĐ',
    sourceHeader: 'Nguồn / Loại',
    annualLabel: 'Ước tính chi phí mất mát mỗi năm',
    resultCardLabel: 'Chi phí phế liệu / năm',
    tip: 'Mẹo: phế liệu tái chế thường BÁN được — hãy ghi cả giá trị thu hồi để thấy net. Rác nguy hại có chi phí xử lý cao hơn nhiều; có thể nhập riêng đơn giá cho dòng đó.',
  },

  // Bản đồ Rác thải — Sản xuất
  mappingFields: [
    { id: 'business-name', label: 'Tên doanh nghiệp' },
    {
      id: 'business-type',
      label: 'Loại hình sản xuất / Ngành hàng',
      hint: 'VD: Cơ khí, Dệt may, Nhựa, Chế biến gỗ, Điện tử',
    },
    { id: 'site-count', label: 'Số nhà máy / cơ sở' },
    { id: 'mapping-date', label: 'Ngày lập bản đồ', type: 'date' },
    { id: 'conducted-with', label: 'Thực hiện cùng', hint: 'Tên chuyên gia Eco Solutions' },
  ],
  wasteStreamGroups: [
    {
      label: 'Tái chế (có thể bán / thu hồi)',
      streams: [
        { id: 'mfg-metal', label: 'Phế liệu kim loại', unit: 'kg' },
        { id: 'mfg-plastic', label: 'Phế liệu nhựa sản xuất', unit: 'kg' },
        { id: 'mfg-textile', label: 'Vải vụn / phế liệu dệt', unit: 'kg' },
        { id: 'mfg-wood', label: 'Phế liệu gỗ / mùn cưa', unit: 'kg' },
        { id: 'mfg-paper', label: 'Phế liệu giấy / bìa carton', unit: 'kg' },
        { id: 'mfg-pkg-in', label: 'Bao bì nguyên vật liệu đầu vào', unit: 'kg' },
        { id: 'mfg-pallet', label: 'Pallet hỏng', unit: 'cái' },
      ],
    },
    {
      label: 'Rác thường',
      streams: [
        { id: 'mfg-defect', label: 'Sản phẩm lỗi / hàng hủy', unit: 'kg' },
        { id: 'mfg-general', label: 'Rác thải sinh hoạt / văn phòng', unit: 'kg' },
      ],
    },
    {
      label: 'Nguy hại',
      streams: [
        { id: 'mfg-sludge', label: 'Bùn thải từ xử lý nước thải', unit: 'kg' },
        { id: 'mfg-oil', label: 'Dầu thải / dầu nhớt đã qua sử dụng', unit: 'lít' },
        { id: 'mfg-solvent', label: 'Dung môi / hóa chất thải', unit: 'lít' },
        { id: 'mfg-rag', label: 'Giẻ lau dính dầu / hóa chất', unit: 'kg' },
        { id: 'mfg-battery', label: 'Pin / ắc quy thải', unit: 'kg' },
        { id: 'mfg-lamp', label: 'Bóng đèn huỳnh quang thải', unit: 'cái' },
        { id: 'mfg-weee', label: 'Thiết bị điện tử thải (WEEE)', unit: 'món' },
      ],
    },
  ],

  // Đánh giá Thực hành — 40 câu · 6 nhóm
  assessmentGroups: [
    {
      id: 'separation',
      topic: 'Phân loại & Tách rác tại nguồn',
      questions: [
        {
          id: 'sep-1',
          text: 'DN có phân loại rác thành ít nhất 3 nhóm: hữu cơ, tái chế và rác thường không?',
          risk: 'Nghiêm trọng — Rác trộn lẫn không thể tái chế; rủi ro xử lý sai quy định; chi phí nhà thầu cao hơn',
          ref: 'Nghị định 45/2022/NĐ-CP (bắt buộc phân loại từ 01/01/2025)',
        },
        {
          id: 'sep-2',
          text: 'DN có tách riêng phế liệu sản xuất (kim loại, nhựa, gỗ, vải) theo từng loại để tái chế/bán không?',
          risk: 'Cao — Phế liệu trộn lẫn mất giá trị thu hồi; bỏ lỡ nguồn thu',
          ref: 'Tối ưu chi phí & kinh tế tuần hoàn',
        },
        {
          id: 'sep-3',
          text: 'Rác nguy hại (dầu thải, hóa chất, giẻ dính dầu, pin) có được tách hoàn toàn khỏi rác thường không?',
          risk: 'Nghiêm trọng — Trộn rác nguy hại với rác thường là vi phạm pháp luật; rủi ro phạt nặng',
          ref: 'Luật BVMT 2020; Thông tư 02/2022/TT-BTNMT',
        },
        {
          id: 'sep-4',
          text: 'Thùng/khu phân loại có được dán nhãn rõ ràng, đặt đúng vị trí, dễ tiếp cận cho công nhân không?',
          risk: 'Cao — Thùng không nhãn = phân loại không xảy ra dù có chính sách',
          ref: 'Tuân thủ thực tế',
        },
        {
          id: 'sep-5',
          text: 'Toàn bộ công nhân (kể cả thời vụ, mới) có biết bỏ loại rác nào vào thùng nào không?',
          risk: 'Cao — Kiến thức chỉ ở vài người; phân loại thiếu nhất quán làm hỏng cả hệ thống',
          ref: 'Đào tạo & tuân thủ',
        },
        {
          id: 'sep-6',
          text: 'Việc phân loại có được giám sát/kiểm tra ít nhất hằng tuần không?',
          risk: 'Trung bình — Không giám sát thì tuân thủ suy giảm; nhiễm bẩn dòng tái chế tăng',
          ref: 'Quản lý nội bộ',
        },
        {
          id: 'sep-7',
          text: 'DN có đăng ký chủ nguồn thải chất thải nguy hại với cơ quan môi trường (nếu phát sinh) không?',
          risk: 'Nghiêm trọng — Bắt buộc với cơ sở phát sinh CTNH; thiếu = vi phạm',
          ref: 'Luật BVMT 2020; Nghị định 08/2022',
        },
      ],
    },
    {
      id: 'contractor',
      topic: 'Xử lý & Tuân thủ Nhà thầu',
      questions: [
        {
          id: 'con-1',
          text: 'DN có dùng đơn vị thu gom/xử lý có giấy phép cho mọi loại rác không phải rác sinh hoạt không?',
          risk: 'Nghiêm trọng — Xử lý không phép là bất hợp pháp; chủ DN chịu trách nhiệm pháp lý',
          ref: 'Nghị định 08/2022/NĐ-CP',
        },
        {
          id: 'con-2',
          text: 'DN có giữ bản sao giấy phép hành nghề còn hiệu lực của nhà thầu không?',
          risk: 'Cao — Không thể chứng minh tuân thủ khi thanh tra nếu thiếu',
          ref: 'Yêu cầu hồ sơ pháp lý',
        },
        {
          id: 'con-3',
          text: 'Nhà thầu có cung cấp chứng từ/biên bản (manifest) cho rác nguy hại không?',
          risk: 'Nghiêm trọng — Bắt buộc theo luật với rác nguy hại; thiếu = phạt nặng',
          ref: 'Thông tư 02/2022/TT-BTNMT',
        },
        {
          id: 'con-4',
          text: 'DN có hợp đồng dịch vụ bằng văn bản với nhà thầu xử lý rác không?',
          risk: 'Cao — Không hợp đồng = không có cơ sở khi nhà thầu làm sai và DN bị liên đới',
          ref: 'Bảo vệ hợp đồng',
        },
        {
          id: 'con-5',
          text: 'DN đã xác minh nhà thầu thực sự xử lý đúng quy định (không đổ trộm) chưa?',
          risk: 'Cao — DN từng bị phạt khi nhà thầu của họ đổ trộm rác',
          ref: 'Trách nhiệm môi trường',
        },
        {
          id: 'con-6',
          text: 'DN có lưu giữ biên lai/hồ sơ thu gom ít nhất 3 năm không?',
          risk: 'Cao — Bắt buộc cho thanh tra; không có hồ sơ = không chứng minh được tuân thủ',
          ref: 'Yêu cầu lưu trữ hồ sơ',
        },
        {
          id: 'con-7',
          text: 'DN có theo dõi khối lượng rác giao cho nhà thầu mỗi kỳ không?',
          risk: 'Trung bình — Không theo dõi = không kiểm soát chi phí và bất thường',
          ref: 'Quản lý vận hành',
        },
      ],
    },
    {
      id: 'hazardous',
      topic: 'Rác thải Nguy hại & Hóa chất',
      questions: [
        {
          id: 'haz-1',
          text: 'DN có nhận diện đầy đủ các loại chất thải nguy hại phát sinh (dầu, dung môi, pin, giẻ, bùn) không?',
          risk: 'Nghiêm trọng — Không nhận diện = xử lý sai; rủi ro pháp lý và môi trường',
          ref: 'Luật BVMT 2020',
        },
        {
          id: 'haz-2',
          text: 'Chất thải nguy hại có được lưu trong khu riêng, có mái che, thông gió, dán nhãn không?',
          risk: 'Nghiêm trọng — Rủi ro cháy nổ, phản ứng hóa học, vi phạm quy định',
          ref: 'Quy định lưu trữ CTNH',
        },
        {
          id: 'haz-3',
          text: 'DN có dán nhãn cảnh báo & mã chất thải nguy hại đúng quy định không?',
          risk: 'Cao — Nhãn sai/thiếu cản trở xử lý an toàn và là điểm vi phạm khi thanh tra',
          ref: 'Thông tư 02/2022',
        },
        {
          id: 'haz-4',
          text: 'Hóa chất sản xuất có Phiếu an toàn hóa chất (SDS) và được lưu trữ đúng cách không?',
          risk: 'Cao — Thiếu SDS gây rủi ro an toàn lao động và tuân thủ',
          ref: 'An toàn hóa chất',
        },
        {
          id: 'haz-5',
          text: 'Công nhân tiếp xúc chất thải nguy hại có được đào tạo & trang bị bảo hộ không?',
          risk: 'Cao — Rủi ro sức khỏe nghề nghiệp; trách nhiệm pháp lý',
          ref: 'ATVSLĐ',
        },
        {
          id: 'haz-6',
          text: 'DN có kế hoạch ứng phó sự cố tràn đổ hóa chất/dầu không?',
          risk: 'Trung bình — Sự cố tràn đổ không kiểm soát gây ô nhiễm và xử phạt',
          ref: 'Ứng phó sự cố',
        },
        {
          id: 'haz-7',
          text: 'DN có lập báo cáo quản lý chất thải nguy hại định kỳ theo quy định không?',
          risk: 'Cao — Bắt buộc với chủ nguồn thải; thiếu báo cáo = vi phạm hành chính',
          ref: 'Nghị định 08/2022',
        },
      ],
    },
    {
      id: 'pollution',
      topic: 'Lưu trữ Rác & Kiểm soát Ô nhiễm',
      questions: [
        {
          id: 'pol-1',
          text: 'Khu lưu rác có sạch, có mái che, tách biệt khỏi khu sản xuất/kho nguyên liệu không?',
          risk: 'Nghiêm trọng — Rủi ro nhiễm chéo; than phiền; vi phạm vệ sinh',
          ref: 'Vệ sinh cơ sở',
        },
        {
          id: 'pol-2',
          text: 'Thùng/container chứa rác có còn tốt (không rò rỉ, có nắp) không?',
          risk: 'Trung bình — Thùng rò rỉ: nước rỉ rác, côn trùng, mùi',
          ref: 'Tiêu chuẩn vệ sinh',
        },
        {
          id: 'pol-3',
          text: 'DN có hệ thống xử lý nước thải sản xuất đạt quy chuẩn trước khi xả không?',
          risk: 'Nghiêm trọng — Xả thải vượt quy chuẩn bị phạt nặng, có thể đình chỉ',
          ref: 'QCVN về nước thải; Luật BVMT 2020',
        },
        {
          id: 'pol-4',
          text: 'DN có biện pháp kiểm soát bụi & khí thải tại nguồn không?',
          risk: 'Cao — Bụi/khí thải vượt ngưỡng gây than phiền và vi phạm',
          ref: 'QCVN về khí thải/bụi',
        },
        {
          id: 'pol-5',
          text: 'DN có kiểm soát tiếng ồn trong giới hạn quy định không?',
          risk: 'Trung bình — Tiếng ồn vượt ngưỡng gây than phiền dân cư & vi phạm',
          ref: 'QCVN về tiếng ồn',
        },
        {
          id: 'pol-6',
          text: 'DN có quan trắc môi trường định kỳ (nước thải, khí thải) theo quy định không?',
          risk: 'Cao — Bắt buộc với nhiều cơ sở sản xuất; thiếu = vi phạm',
          ref: 'Nghị định 08/2022',
        },
        {
          id: 'pol-7',
          text: 'Khu lưu rác có được kiểm tra & vệ sinh ít nhất hằng tuần không?',
          risk: 'Trung bình — Khu rác bỏ bê thu hút côn trùng, gây mùi & than phiền',
          ref: 'Tuân thủ môi trường',
        },
      ],
    },
    {
      id: 'reduction',
      topic: 'Giảm thiểu, Tái chế & EPR',
      questions: [
        {
          id: 'red-1',
          text: 'DN có theo dõi khối lượng rác phát sinh để đặt mục tiêu giảm thiểu không?',
          risk: 'Cao — Không đo được thì không giảm được; chi phí rác duy trì cao',
          ref: 'Hiệu quả vận hành',
        },
        {
          id: 'red-2',
          text: 'DN đã xác định 3 nguồn phát sinh rác/phế liệu lớn nhất và có biện pháp giảm chưa?',
          risk: 'Cao — Phế liệu = tổn thất nguyên vật liệu trực tiếp lên giá thành',
          ref: 'Giảm chi phí',
        },
        {
          id: 'red-3',
          text: 'DN có chương trình tái sử dụng/tái chế phế liệu nội bộ hoặc bán cho đơn vị tái chế không?',
          risk: 'Trung bình — Bỏ lỡ nguồn thu và lợi thế kinh tế tuần hoàn',
          ref: 'Đề án kinh tế tuần hoàn',
        },
        {
          id: 'red-4',
          text: 'DN có giảm bao bì hoặc chuyển sang vật liệu tái chế được trong 12 tháng qua không?',
          risk: 'Trung bình — Kỳ vọng khách mua & quy định đang tăng',
          ref: 'Kinh tế tuần hoàn',
        },
        {
          id: 'red-5',
          text: 'Nếu là nhà SX/nhập khẩu bao bì có doanh thu trên ngưỡng (≈30 tỷ VNĐ), DN có nắm nghĩa vụ EPR (tái chế bắt buộc) không?',
          risk: 'Cao — Không thực hiện EPR có thể bị phạt 50 triệu–1 tỷ VNĐ',
          ref: 'Luật BVMT 2020 (Điều 54,55); NĐ 08/2022; NĐ 05/2025',
        },
        {
          id: 'red-6',
          text: 'DN có đặt mục tiêu giảm rác/tăng tỷ lệ tái chế cho năm tới không?',
          risk: 'Trung bình — Không mục tiêu = không cải thiện hệ thống',
          ref: 'Cải tiến liên tục',
        },
      ],
    },
    {
      id: 'staff',
      topic: 'Hành vi Nhân viên & Đào tạo',
      questions: [
        {
          id: 'stf-1',
          text: 'Toàn bộ công nhân có được đào tạo xử lý rác khi nhập môn không?',
          risk: 'Cao — Công nhân mới là nguồn vi phạm phổ biến nhất',
          ref: 'Thực hành đào tạo',
        },
        {
          id: 'stf-2',
          text: 'Quản lý rác có nằm trong kỳ vọng công việc/giao ban đội nhóm không?',
          risk: 'Trung bình — Không nhắc lại = tuân thủ trôi dần',
          ref: 'Hệ thống quản lý',
        },
        {
          id: 'stf-3',
          text: 'Có người chịu trách nhiệm rõ ràng về quản lý rác trong DN không?',
          risk: 'Cao — Không ai sở hữu = hệ thống rác không ai quản',
          ref: 'Phân vai rõ ràng',
        },
        {
          id: 'stf-4',
          text: 'Công nhân có báo cáo kịp thời các vấn đề về rác (thùng hỏng, đổ sai, côn trùng) không?',
          risk: 'Trung bình — Vấn đề không báo dồn lại; việc nhỏ thành sự cố lớn',
          ref: 'Văn hóa an toàn',
        },
        {
          id: 'stf-5',
          text: 'DN có ghi nhận & xử lý các sự cố liên quan đến rác trong 12 tháng qua không?',
          risk: 'Chọn N/A nếu không có — nếu có, đã tìm nguyên nhân gốc & khắc phục chưa?',
          ref: 'Quản lý sự cố',
        },
        {
          id: 'stf-6',
          text: 'DN có truyền thông kết quả giảm rác/tiết kiệm chi phí tới đội ngũ không?',
          risk: 'Thấp — Không ghi nhận nỗ lực làm giảm động lực duy trì',
          ref: 'Gắn kết nhân viên',
        },
      ],
    },
  ],

  // Đánh giá Nhà thầu
  contractorFields: [
    { id: 'contractor-name', label: 'Tên nhà thầu' },
    {
      id: 'license-number',
      label: 'Số giấy phép',
      hint: 'Xác minh tại DONRE địa phương hoặc cổng trực tuyến',
    },
    { id: 'license-expiry', label: 'Ngày hết hạn giấy phép', type: 'date' },
    { id: 'licensed-waste-types', label: 'Các loại chất thải được cấp phép xử lý' },
    { id: 'assessment-date', label: 'Ngày đánh giá', type: 'date' },
    { id: 'assessor', label: 'Người đánh giá' },
  ],
  contractorCriteria: [
    {
      id: 'license',
      label: 'Giấy phép hành nghề xử lý rác hợp lệ, còn hiệu lực',
      desc: 'Có giấy phép hành nghề còn hiệu lực, bao gồm các loại chất thải bạn phát sinh.',
      weight: 25,
      verify: 'Yêu cầu giấy phép. Xác minh số tại website/văn phòng DONRE.',
    },
    {
      id: 'manifest',
      label: 'Cung cấp chứng từ/biên bản (manifest) cho rác nguy hại',
      desc: 'Cấp phiếu chuyển giao / manifest cho mỗi lần thu gom chất thải nguy hại.',
      weight: 20,
      verify: 'Xin mẫu manifest của 3 lần thu gom gần nhất.',
    },
    {
      id: 'contract',
      label: 'Hợp đồng dịch vụ bằng văn bản rõ ràng',
      desc: 'Có hợp đồng dịch vụ bằng văn bản, nêu rõ nghĩa vụ cung cấp chứng từ xử lý.',
      weight: 15,
      verify: 'Soát hợp đồng hiện hành; kiểm tra điều khoản chứng từ & trách nhiệm.',
    },
    {
      id: 'practice',
      label: 'Bằng chứng xử lý đúng quy định (không đổ trộm)',
      desc: 'Đã xác minh rằng rác được đưa tới cơ sở được cấp phép — không đổ trộm.',
      weight: 15,
      verify: 'Yêu cầu địa chỉ cơ sở xử lý cuối cùng và kiểm tra đã đăng ký. Thăm nếu được.',
    },
    {
      id: 'records',
      label: 'Lưu trữ & cung cấp hồ sơ thu gom ≥ 3 năm',
      desc: 'Lưu trữ và cung cấp được biên lai/hồ sơ thu gom tối thiểu 3 năm.',
      weight: 10,
      verify: 'Yêu cầu trích xuất hồ sơ thu gom các kỳ trước.',
    },
    {
      id: 'capacity',
      label: 'Năng lực xử lý đúng các loại rác doanh nghiệp phát sinh',
      desc: 'Được cấp phép & có năng lực xử lý đúng mọi loại rác đặc thù bạn phát sinh.',
      weight: 10,
      verify: 'Đối chiếu danh mục rác phát sinh với phạm vi giấy phép của nhà thầu.',
    },
    {
      id: 'pricing',
      label: 'Giá cả minh bạch & độ tin cậy dịch vụ',
      desc: 'Giá rõ ràng, có chứng từ; thu gom đúng lịch; có đầu mối liên hệ rõ ràng.',
      weight: 5,
      verify: 'Soát 6 tháng hóa đơn & đánh giá độ đúng hẹn của dịch vụ.',
    },
  ],
  contractorChecklist: [
    {
      id: 'cl-1',
      priority: 'critical',
      text: 'Yêu cầu bản sao giấy phép hành nghề & kiểm tra hiệu lực trên cổng thông tin',
    },
    {
      id: 'cl-2',
      priority: 'critical',
      text: 'Xác nhận họ cấp chứng từ/manifest cho rác nguy hại',
    },
    {
      id: 'cl-3',
      priority: 'critical',
      text: 'Tham quan/xác minh nơi xử lý cuối cùng (tránh đổ trộm)',
    },
    {
      id: 'cl-4',
      priority: 'important',
      text: 'So sánh giá & điều khoản hợp đồng của ít nhất 2 nhà thầu',
    },
    {
      id: 'cl-5',
      priority: 'important',
      text: 'Kiểm tra năng lực xử lý đúng các loại rác đặc thù của bạn',
    },
    {
      id: 'cl-6',
      priority: 'standard',
      text: 'Yêu cầu tham chiếu từ khách hàng hiện tại của nhà thầu',
    },
  ],

  // Theo dõi Phế liệu (weekly scrap tracker)
  foodSources: [
    { id: 'recyclable', label: 'Phế liệu tái chế (kim loại/nhựa/giấy/gỗ)' },
    { id: 'non-recyclable', label: 'Phế liệu không tái chế' },
    { id: 'defect', label: 'Sản phẩm lỗi / hàng hủy' },
    { id: 'hazard', label: 'Rác thải nguy hại' },
    { id: 'sludge', label: 'Bùn thải xử lý nước thải' },
    { id: 'pkg-in', label: 'Bao bì đầu vào' },
    { id: 'general', label: 'Rác sinh hoạt / văn phòng' },
    { id: 'other', label: 'Khác' },
  ],

  // Kế hoạch 90 ngày
  planFields: [
    { id: 'business-name', label: 'Tên doanh nghiệp' },
    { id: 'plan-date', label: 'Ngày lập kế hoạch', type: 'date' },
    { id: 'eco-expert', label: 'Chuyên gia Eco Solutions' },
    { id: 'internal-owner', label: 'Người phụ trách (nội bộ)' },
    {
      id: 'next-review-date',
      label: 'Ngày review kế tiếp',
      type: 'date',
      hint: 'Khuyến nghị: 30 ngày sau khi lập',
    },
  ],
  actions: [
    {
      id: 'a1',
      priority: 'critical',
      action:
        'Rác nguy hại: Tách & lưu trữ riêng toàn bộ rác nguy hại (dầu, hóa chất, pin) trong khu có mái che, dán nhãn đúng quy định.',
      targetDay: 'Ngày 30',
      measure: 'Khu lưu CTNH đạt chuẩn, có nhãn & mã',
    },
    {
      id: 'a2',
      priority: 'critical',
      action:
        'Nhà thầu: Thu thập & lưu bản sao giấy phép hành nghề + manifest rác nguy hại của nhà thầu; lưu hồ sơ 3 năm.',
      targetDay: 'Ngày 30',
      measure: 'Có đủ giấy phép & chứng từ cho 2 kỳ thu gom liên tiếp',
    },
    {
      id: 'a3',
      priority: 'critical',
      action:
        'Ô nhiễm: Kiểm tra hệ thống xử lý nước thải & quan trắc định kỳ đạt QCVN; khắc phục điểm vượt ngưỡng.',
      targetDay: 'Ngày 60',
      measure: 'Kết quả quan trắc đạt quy chuẩn',
    },
    {
      id: 'a4',
      priority: 'important',
      action:
        'Phân loại: Thiết lập hệ thống phân loại 3 nhóm tại mọi khu vực; dán nhãn & đào tạo công nhân.',
      targetDay: 'Ngày 45',
      measure: 'Phân loại đúng tại 100% khu vực sau 2 tuần kiểm tra',
    },
    {
      id: 'a5',
      priority: 'important',
      action:
        'Giảm thiểu: Xác định 3 nguồn phế liệu lớn nhất từ Bản đồ Rác thải; lập biện pháp giảm cho từng nguồn.',
      targetDay: 'Ngày 60',
      measure: 'Có kế hoạch giảm cho top 3 nguồn phế liệu',
    },
    {
      id: 'a6',
      priority: 'important',
      action:
        'EPR: Rà soát doanh thu & loại bao bì để xác định nghĩa vụ EPR; lập kế hoạch tuân thủ nếu thuộc diện.',
      targetDay: 'Ngày 60',
      measure: 'Xác định rõ có/không thuộc diện EPR & bước tiếp theo',
    },
    {
      id: 'a7',
      priority: 'quickwin',
      action: 'Bản đồ Rác: Hoàn thành Bản đồ Rác thải & tính tổng chi phí rác/tháng.',
      targetDay: 'Ngày 7',
      measure: 'Bản đồ Rác hoàn chỉnh, biết tổng chi phí',
    },
    {
      id: 'a8',
      priority: 'quickwin',
      action:
        'Tái chế: Tách & bán phế liệu tái chế (kim loại/nhựa/giấy) cho đơn vị tái chế hợp pháp.',
      targetDay: 'Ngày 14',
      measure: 'Có nguồn thu từ phế liệu tái chế',
    },
    {
      id: 'a9',
      priority: 'quickwin',
      action: 'Phân công: Chỉ định 1 người chịu trách nhiệm quản lý rác cho toàn nhà máy.',
      targetDay: 'Ngày 7',
      measure: 'Đã có người phụ trách rõ ràng',
    },
  ],
  reviewMilestones: [
    { id: 'm30', title: '30 ngày', focus: 'Nền tảng: phân loại, nhà thầu hợp lệ, hồ sơ' },
    {
      id: 'm60',
      title: '60 ngày',
      focus: 'Hệ thống: theo dõi khối lượng & chi phí, đào tạo',
    },
    { id: 'm90', title: '90 ngày', focus: 'Chuẩn hóa: mục tiêu giảm thiểu & cải tiến liên tục' },
  ],
};

/**
 * Vietnamese edition — registry of all waste toolkit variants, keyed by id.
 * LƯU Ý: đây là NGUỒN CHUẨN cho migration persist V1→V2 (map nhãn VN → id),
 * nên nội dung phải giữ nguyên nhãn gốc tiếng Việt.
 */
export const WASTE_TOOLKITS_VI: Record<string, WasteToolkitConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
  // Back-compat: the legacy single-toolkit id resolves to the F&B variant.
  'waste-toolkit': FNB,
};
