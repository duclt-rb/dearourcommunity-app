import { WasteToolkitConfig } from './waste.types';

/**
 * Waste Toolkit — Module B (Eco Solutions).
 * Source: [Draft] EB_Module_B_WasteToolkit_EcoSolutions.xlsx
 */
export const WASTE_TOOLKIT: WasteToolkitConfig = {
  id: 'waste-toolkit',
  name: 'Bộ công cụ Quản lý Chất thải',
  sector: 'Module B — Eco Solutions',

  // 🗺️ Waste Mapping
  mappingFields: [
    { label: 'Tên doanh nghiệp' },
    { label: 'Loại hình / Ngành', hint: 'VD: Nhà hàng, Khách sạn, Nhà sản xuất, Bán lẻ' },
    { label: 'Số địa điểm / cơ sở' },
    { label: 'Ngày lập bản đồ', type: 'date' },
    { label: 'Thực hiện cùng', hint: 'Tên chuyên gia Eco Solutions' },
  ],
  wasteStreamGroups: [
    {
      label: 'Ngành dịch vụ',
      streams: [
        { id: 'svc-food-prep', label: 'Rác thực phẩm — sơ chế', unit: 'kg' },
        { id: 'svc-food-spoil', label: 'Rác thực phẩm — hư hỏng / hết hạn', unit: 'kg' },
        { id: 'svc-food-plate', label: 'Rác thực phẩm — khách bỏ thừa', unit: 'kg' },
        { id: 'svc-oil', label: 'Dầu ăn / mỡ', unit: 'lít' },
        { id: 'svc-pkg-paper', label: 'Bao bì — giấy / bìa carton', unit: 'kg' },
        { id: 'svc-pkg-plastic', label: 'Bao bì — màng / bọc nhựa', unit: 'kg' },
        { id: 'svc-glass', label: 'Thủy tinh (chai, ly vỡ)', unit: 'kg' },
        { id: 'svc-single-plastic', label: 'Nhựa dùng một lần (ly, ống hút, dao nĩa)', unit: 'kg' },
        { id: 'svc-general', label: 'Rác thường / hỗn hợp', unit: 'túi' },
        { id: 'svc-chemical', label: 'Chất thải hóa chất (sản phẩm tẩy rửa)', unit: 'lít' },
        { id: 'svc-linen', label: 'Rác vải / khăn (lưu trú)', unit: 'kg' },
      ],
    },
    {
      label: 'Chuỗi cung ứng',
      streams: [
        { id: 'sup-scrap', label: 'Phế liệu / đầu thừa sản xuất', unit: 'kg' },
        { id: 'sup-defect', label: 'Sản phẩm lỗi / bị loại', unit: 'kg' },
        { id: 'sup-pkg-out', label: 'Rác bao bì — đầu ra', unit: 'kg' },
        { id: 'sup-solvent', label: 'Hóa chất / dung môi công nghiệp', unit: 'lít' },
        { id: 'sup-lubricant', label: 'Dầu nhớt máy móc', unit: 'lít' },
        { id: 'sup-metal', label: 'Phế liệu kim loại', unit: 'kg' },
        { id: 'sup-ewaste', label: 'Rác điện tử (pin, thiết bị)', unit: 'món' },
        { id: 'sup-effluent', label: 'Nước thải / chất thải lỏng', unit: 'm³' },
        { id: 'sup-dust', label: 'Bụi / chất thải dạng hạt', unit: 'kg' },
      ],
    },
  ],
  mappingCostItems: [
    { id: 'contractor', label: 'Phí nhà thầu thu gom' },
    { id: 'municipality', label: 'Phí thu gom của địa phương' },
    { id: 'hazardous', label: 'Xử lý chất thải nguy hại (đặc biệt)' },
    { id: 'equipment', label: 'Túi, thùng, thiết bị phân loại' },
    { id: 'foodfee', label: 'Phí xử lý / ủ rác thực phẩm' },
    { id: 'stafftime', label: 'Thời gian nhân viên quản lý rác (ước tính)' },
    { id: 'fines', label: 'Tiền phạt trong 12 tháng qua' },
  ],

  // ✅ Waste Practices Assessment
  assessmentGroups: [
    {
      id: 'separation',
      topic: 'Phân loại & tách rác',
      questions: [
        {
          id: 'sep-1',
          text: 'Doanh nghiệp có phân loại rác thành ít nhất 3 nhóm: hữu cơ/thực phẩm, tái chế và rác thường không?',
          risk: 'Nghiêm trọng — Rác trộn lẫn không thể tái chế/ủ; rủi ro xử lý trái phép; chi phí nhà thầu cao hơn',
          ref: 'Nghị định 45/2022/NĐ-CP',
        },
        {
          id: 'sep-2',
          text: 'Thùng phân loại có được dán nhãn đúng, đặt đúng vị trí và mọi nhân viên tiếp cận được không?',
          risk: 'Cao — Thùng không nhãn khiến phân loại không thực sự diễn ra dù đã có quy định',
        },
        {
          id: 'sep-3',
          text: 'Bạn có tách chất thải nguy hại (dầu, hóa chất, pin) khỏi rác thường không?',
          risk: 'Nghiêm trọng — Trộn chất thải nguy hại với rác thường là vi phạm; nguy cơ bị cơ quan môi trường phạt',
          ref: 'Luật Bảo vệ Môi trường 2020',
        },
        {
          id: 'sep-4',
          text: 'Rác thực phẩm/hữu cơ có được tách mỗi ngày và lưu trữ đúng cách trước khi thu gom không?',
          risk: 'Cao — Lưu trữ sai: mùi hôi, côn trùng, bị thanh tra y tế',
        },
        {
          id: 'sep-5',
          text: 'Mọi nhân viên — kể cả bán thời gian và mới — có biết bỏ rác nào vào thùng nào không?',
          risk: 'Cao — Kiến thức chỉ nằm ở vài người; phân loại không nhất quán làm hỏng cả hệ thống',
        },
        {
          id: 'sep-6',
          text: 'Việc phân loại rác có được giám sát viên kiểm tra ít nhất hàng tuần không?',
          risk: 'Trung bình — Không giám sát thì tuân thủ suy giảm; tăng nhiễm bẩn luồng tái chế',
        },
      ],
    },
    {
      id: 'contractor',
      topic: 'Xử lý & tuân thủ nhà thầu',
      questions: [
        {
          id: 'con-1',
          text: 'Bạn có dùng nhà thầu thu gom được cấp phép cho mọi loại rác không phải rác thường không?',
          risk: 'Nghiêm trọng — Xử lý không phép là bất hợp pháp; chủ doanh nghiệp chịu trách nhiệm pháp lý',
          ref: 'Nghị định 08/2022/NĐ-CP',
        },
        {
          id: 'con-2',
          text: 'Bạn có giữ bản sao giấy phép xử lý chất thải còn hiệu lực của nhà thầu không?',
          risk: 'Cao — Không có tài liệu này thì không chứng minh được tuân thủ khi bị thanh tra',
        },
        {
          id: 'con-3',
          text: 'Nhà thầu có cung cấp chứng từ/biên bản xử lý cho chất thải nguy hại không?',
          risk: 'Nghiêm trọng — Bắt buộc theo luật với chất thải nguy hại; thiếu = phạt nặng',
          ref: 'Thông tư 02/2022/TT-BTNMT',
        },
        {
          id: 'con-4',
          text: 'Bạn có hợp đồng dịch vụ bằng văn bản với nhà thầu xử lý chất thải không?',
          risk: 'Cao — Không hợp đồng = không có cơ sở khiếu nại nếu nhà thầu xử lý sai và liên đới doanh nghiệp',
        },
        {
          id: 'con-5',
          text: 'Bạn đã xác minh nhà thầu thực sự xử lý đúng (không đổ trộm) chưa?',
          risk: 'Cao — Nhiều doanh nghiệp bị phạt khi nhà thầu bị phát hiện đổ rác trái phép',
        },
        {
          id: 'con-6',
          text: 'Bạn có lưu giữ biên lai/hồ sơ thu gom ít nhất 3 năm không?',
          risk: 'Cao — Bắt buộc cho thanh tra; không có hồ sơ thì không chứng minh được tuân thủ',
        },
      ],
    },
    {
      id: 'storage',
      topic: 'Lưu trữ & cơ sở chứa chất thải',
      questions: [
        {
          id: 'sto-1',
          text: 'Khu lưu trữ rác có sạch, được che chắn và tách khỏi khu chế biến/sản xuất không?',
          risk: 'Nghiêm trọng — Vi phạm y tế; nguy cơ nhiễm chéo; khách/nhân viên phàn nàn',
        },
        {
          id: 'sto-2',
          text: 'Thùng và bồn chứa rác có trong tình trạng tốt (không rò rỉ, nắp hoạt động) không?',
          risk: 'Trung bình — Thùng rò rỉ: nước rỉ rác, thu hút côn trùng, mùi hôi',
        },
        {
          id: 'sto-3',
          text: 'Có khu vực được chỉ định, có biển báo cho xe thu gom rác tiếp cận không?',
          risk: 'Thấp — Lối vào không chỉ định gây gián đoạn vận hành và sự cố an toàn',
        },
        {
          id: 'sto-4',
          text: 'Vật liệu nguy hại có được lưu trữ ở khu riêng, thông gió, dán nhãn trước khi xử lý không?',
          risk: 'Nghiêm trọng — Nguy cơ cháy, phản ứng hóa học, vi phạm quy định',
        },
        {
          id: 'sto-5',
          text: 'Khu lưu trữ rác có được kiểm tra và vệ sinh ít nhất hàng tuần không?',
          risk: 'Trung bình — Khu rác bị bỏ bê thu hút côn trùng và gây mùi, hàng xóm phàn nàn',
        },
      ],
    },
    {
      id: 'staff',
      topic: 'Hành vi & đào tạo nhân viên',
      questions: [
        {
          id: 'stf-1',
          text: 'Mọi nhân viên có được đào tạo xử lý chất thải trong buổi hội nhập không?',
          risk: 'Cao — Nhân viên mới là nguồn gây lỗi tuân thủ chất thải phổ biến nhất',
        },
        {
          id: 'stf-2',
          text: 'Xử lý chất thải có nằm trong kỳ vọng hiệu suất hoặc giao ban nhóm không?',
          risk: 'Trung bình — Không nhắc lại thực hành thì tuân thủ trôi dần',
        },
        {
          id: 'stf-3',
          text: 'Có người chịu trách nhiệm rõ ràng về quản lý chất thải trong doanh nghiệp không?',
          risk: 'Cao — Không ai sở hữu thì hệ thống chất thải không ai quản',
        },
        {
          id: 'stf-4',
          text: 'Nhân viên có báo cáo kịp thời các vấn đề (thùng hỏng, bỏ sai, có côn trùng) không?',
          risk: 'Trung bình — Vấn đề không báo cáo tích tụ; việc nhỏ thành sự cố pháp lý',
        },
        {
          id: 'stf-5',
          text: 'Trong 12 tháng qua có sự cố liên quan nhân viên (bỏ rác sai, nhiễm bẩn) không? Nếu có, đã tìm và khắc phục nguyên nhân gốc chưa?',
          risk: 'Chọn N/A nếu không có — nếu có, cần xác định và khắc phục nguyên nhân gốc',
        },
      ],
    },
    {
      id: 'food',
      topic: 'Giảm rác thực phẩm (F&B)',
      questions: [
        {
          id: 'fwr-1',
          text: 'Bạn có theo dõi lượng rác thực phẩm mỗi tuần theo nguồn (sơ chế, hư hỏng, khách bỏ thừa) không?',
          risk: 'Cao — Không đo thì không giảm được; rác thực phẩm thường 3–8% doanh thu nhà hàng',
        },
        {
          id: 'fwr-2',
          text: 'Bạn có quy trình đặt nguyên liệu theo lượng dùng thực tế thay vì ước chừng không?',
          risk: 'Cao — Đặt dư là nguyên nhân số 1 gây lãng phí thực phẩm; ảnh hưởng trực tiếp biên lợi nhuận',
        },
        {
          id: 'fwr-3',
          text: 'Hàng dễ hỏng có được lưu theo FIFO (nhập trước xuất trước) để giảm hư hỏng không?',
          risk: 'Cao — Không FIFO dẫn đến hư hỏng tránh được; tổn thất chi phí trực tiếp',
        },
        {
          id: 'fwr-4',
          text: 'Bếp có quy trình tận dụng nguyên liệu cận hạn/không đạt chuẩn (vd món đặc biệt, bữa ăn nhân viên) không?',
          risk: 'Trung bình — Thực phẩm dùng được bị bỏ khi không có quy trình tái sử dụng',
        },
        {
          id: 'fwr-5',
          text: 'Bạn có theo dõi rác từ đĩa khách (thức ăn khách bỏ) để phát hiện khẩu phần quá lớn không?',
          risk: 'Trung bình — Khẩu phần lớn có hệ thống gây lãng phí và tăng chi phí mỗi suất',
        },
        {
          id: 'fwr-6',
          text: 'Trong 12 tháng qua bạn có hành động giảm nhựa/bao bì dùng một lần không?',
          risk: 'Trung bình — Áp lực pháp lý tăng; kỳ vọng khách hàng; rủi ro uy tín',
        },
      ],
    },
    {
      id: 'pollution',
      topic: 'Kiểm soát ô nhiễm (Sản xuất / Chuỗi cung ứng)',
      questions: [
        {
          id: 'pol-1',
          text: 'Bạn có hệ thống xử lý hoặc lưu chứa nước thải lỏng từ quy trình sản xuất không?',
          risk: 'Nghiêm trọng — Xả nước thải chưa xử lý ra cống/nguồn nước là vi phạm nghiêm trọng',
          ref: 'Luật BVMT 2020, QCVN 40:2011',
        },
        {
          id: 'pol-2',
          text: 'Bụi hoặc hạt vật chất từ quy trình sản xuất có được kiểm soát và quản lý không?',
          risk: 'Cao — Khiếu nại về bụi từ hàng xóm kích hoạt thanh tra môi trường',
          ref: 'QCVN 05:2023/BTNMT',
        },
        {
          id: 'pol-3',
          text: 'Mức ồn từ hoạt động có nằm trong giới hạn cho phép tại ranh giới khu đất không?',
          risk: 'Cao — Vi phạm tiếng ồn là nguyên nhân khiếu nại phổ biến ở khu công nghiệp',
          ref: 'QCVN 26:2010/BTNMT',
        },
        {
          id: 'pol-4',
          text: 'Hóa chất và vật liệu nguy hại có được lưu trữ với khay/đê chứa tràn thứ cấp không?',
          risk: 'Nghiêm trọng — Tràn vào hệ thống thoát nước = sự cố môi trường; phạt nặng; nguy cơ dừng hoạt động',
        },
        {
          id: 'pol-5',
          text: 'Bạn có quy trình và bộ ứng phó sự cố tràn tại chỗ không?',
          risk: 'Cao — Không có kế hoạch ứng phó, sự cố tràn leo thang nhanh và chi phí dọn dẹp tăng vọt',
        },
      ],
    },
  ],

  // 📦 Contractor Evaluation
  contractorFields: [
    { label: 'Tên nhà thầu' },
    { label: 'Số giấy phép', hint: 'Xác minh tại DONRE địa phương hoặc cổng trực tuyến' },
    { label: 'Ngày hết hạn giấy phép', type: 'date' },
    { label: 'Các loại chất thải được cấp phép xử lý' },
    { label: 'Ngày đánh giá', type: 'date' },
    { label: 'Người đánh giá' },
  ],
  contractorCriteria: [
    {
      id: 'license',
      label: 'Giấy phép & Tuân thủ pháp lý',
      desc: 'Có giấy phép thu gom còn hiệu lực do DONRE cấp, bao gồm các loại chất thải bạn phát sinh.',
      weight: 25,
      verify: 'Yêu cầu giấy phép. Xác minh số tại website/văn phòng DONRE.',
    },
    {
      id: 'docs',
      label: 'Chứng từ xử lý',
      desc: 'Cung cấp phiếu chuyển giao, biên bản xử lý hoặc biên lai cho mỗi lần thu gom.',
      weight: 20,
      verify: 'Xin mẫu chứng từ của 3 lần thu gom gần nhất.',
    },
    {
      id: 'hazard',
      label: 'Xử lý chất thải nguy hại',
      desc: 'Được chứng nhận xử lý chất thải nguy hại (nếu có). Cung cấp biên bản chất thải nguy hại.',
      weight: 15,
      verify: 'Yêu cầu giấy phép chất thải nguy hại nếu bạn phát sinh loại này.',
    },
    {
      id: 'practice',
      label: 'Thực tế xử lý',
      desc: 'Đã xác minh (hoặc tin tưởng hợp lý) rằng rác được đưa tới cơ sở được cấp phép — không đổ trộm.',
      weight: 15,
      verify: 'Yêu cầu địa chỉ cơ sở và kiểm tra đã đăng ký. Thăm nếu được.',
    },
    {
      id: 'reliability',
      label: 'Độ tin cậy & chất lượng dịch vụ',
      desc: 'Thu gom đúng lịch. Phản hồi nhanh với sự cố. Có đầu mối liên hệ rõ ràng.',
      weight: 10,
      verify: 'Đánh giá trải nghiệm của bạn trong 6 tháng qua.',
    },
    {
      id: 'separation',
      label: 'Giữ nguyên phân loại',
      desc: 'Nhà thầu thực sự giữ các luồng rác đã phân loại tách biệt — không trộn trên xe.',
      weight: 10,
      verify: 'Quan sát một lần thu gom hoặc hỏi nhân viên có mặt.',
    },
    {
      id: 'pricing',
      label: 'Minh bạch giá',
      desc: 'Giá rõ ràng, có chứng từ, phản ánh khối lượng thực. Không phí khó hiểu.',
      weight: 5,
      verify: 'Soát 6 tháng hóa đơn so với mức đã thỏa thuận.',
    },
  ],

  // 🍱 Food Waste Tracker
  foodSources: [
    { id: 'prep', label: 'Rác sơ chế (gọt, cắt tỉa, cắt hỏng)' },
    { id: 'overprod', label: 'Sản xuất dư (làm ra nhưng không bán)' },
    { id: 'spoil-storage', label: 'Hư hỏng — lưu trữ kém / không FIFO' },
    { id: 'spoil-order', label: 'Hư hỏng — đặt dư' },
    { id: 'plate', label: 'Khách bỏ thừa' },
    { id: 'staff', label: 'Bữa ăn nhân viên & lỗi' },
    { id: 'packaging', label: 'Rác bao bì/gói (tiếp xúc thực phẩm)' },
    { id: 'other', label: 'Rác thực phẩm khác' },
  ],

  // 📊 Monthly Dashboard
  dashboardVolumeCategories: [
    { id: 'food', label: 'Rác thực phẩm / hữu cơ (kg)' },
    { id: 'recycle', label: 'Tái chế: nhựa, giấy, thủy tinh, kim loại (kg)' },
    { id: 'general', label: 'Rác thường / hỗn hợp (kg)' },
    { id: 'hazard', label: 'Chất thải nguy hại (kg)' },
    { id: 'oil', label: 'Dầu ăn / mỡ (lít)' },
    { id: 'scrap', label: 'Phế liệu sản xuất (kg)' },
    { id: 'other', label: 'Khác (kg)' },
  ],
  dashboardCostCategories: [
    { id: 'contractor', label: 'Phí nhà thầu' },
    { id: 'municipality', label: 'Phí địa phương' },
    { id: 'hazardous', label: 'Xử lý chất thải nguy hại' },
    { id: 'equipment', label: 'Thiết bị / túi / thùng' },
    { id: 'other', label: 'Chi phí xử lý khác' },
  ],

  // 🎯 90-Day Action Plan
  planFields: [
    { label: 'Tên doanh nghiệp' },
    { label: 'Ngày lập kế hoạch', type: 'date' },
    { label: 'Chuyên gia Eco Solutions' },
    { label: 'Người phụ trách (nội bộ)' },
    { label: 'Ngày review kế tiếp', type: 'date', hint: 'Khuyến nghị: 30 ngày sau khi lập' },
  ],
  actions: [
    {
      id: 'a1',
      priority: 'critical',
      action:
        'Tuân thủ nhà thầu: Lấy bản sao giấy phép DONRE còn hiệu lực của nhà thầu và xác minh bao gồm mọi loại rác phát sinh',
      targetDay: 'Ngày 7',
      measure: 'Đã lưu bản sao giấy phép; xác nhận các loại chất thải',
    },
    {
      id: 'a2',
      priority: 'critical',
      action:
        'Thiết lập phân loại: Lắp hệ thống 3 thùng dán nhãn (hữu cơ / tái chế / rác thường) tại mọi điểm phát sinh',
      targetDay: 'Ngày 14',
      measure: 'Thùng đã có; nhãn rõ; nhân viên biết bỏ thùng nào',
    },
    {
      id: 'a3',
      priority: 'critical',
      action:
        'Chất thải nguy hại: Xác định mọi luồng nguy hại (dầu, hóa chất, pin). Sắp xếp thu gom riêng có phép',
      targetDay: 'Ngày 21',
      measure: 'Chất thải nguy hại không còn trộn với rác thường',
    },
    {
      id: 'a4',
      priority: 'important',
      action:
        'Đào tạo: Tổ chức buổi 30 phút về xử lý rác cho toàn bộ nhân viên (quy tắc phân loại, vị trí thùng, không bỏ gì vào rác thường)',
      targetDay: 'Ngày 21',
      measure: 'Mọi nhân viên xác định đúng thùng cho mỗi loại',
    },
    {
      id: 'a5',
      priority: 'important',
      action: 'Theo dõi rác: Bắt đầu ghi khối lượng và chi phí hàng tháng vào Dashboard',
      targetDay: 'Ngày 30',
      measure: 'Có dữ liệu tháng đầu tiên',
    },
    {
      id: 'a6',
      priority: 'important',
      action: 'Chứng từ nhà thầu: Yêu cầu biên bản xử lý mỗi lần thu gom. Lưu giữ 3 năm',
      targetDay: 'Ngày 30',
      measure: 'Nhận chứng từ ít nhất 2 lần thu gom liên tiếp',
    },
    {
      id: 'a7',
      priority: 'quickwin',
      action:
        'Rác thực phẩm (F&B): Bắt đầu theo dõi hàng tuần theo nguồn. Xác định nguồn lớn nhất tuần 1',
      targetDay: 'Ngày 7',
      measure: 'Đã xác định nguồn rác thực phẩm lớn nhất',
    },
    {
      id: 'a8',
      priority: 'quickwin',
      action:
        'Giảm rác thực phẩm: Thực hiện kiểm tra FIFO hàng ngày. Phân công người phụ trách xoay vòng kho',
      targetDay: 'Ngày 14',
      measure: 'Hoàn thành checklist FIFO mỗi ngày trong 2 tuần liên tiếp',
    },
    {
      id: 'a9',
      priority: 'quickwin',
      action:
        'Nhựa dùng một lần: Rà soát các món nhựa dùng một lần. Chọn 1–2 món thay bằng giải pháp tái sử dụng trong 90 ngày',
      targetDay: 'Ngày 45',
      measure: 'Thay được ít nhất 1 món nhựa dùng một lần',
    },
  ],
};
