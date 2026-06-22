import {
  AssessmentGroup,
  ActionItem,
  DataGovToolkitConfig,
  IncidentStep,
  LegalItem,
  ReviewMilestone,
} from './datagov.types';

/** Tạo một nhóm câu hỏi từ các bộ ba [text, risk, ref]. */
function mkGroup(id: string, topic: string, rows: [string, string, string][]): AssessmentGroup {
  return {
    id,
    topic,
    questions: rows.map(([text, risk, ref], i) => ({ id: `${id}-${i + 1}`, text, risk, ref })),
  };
}

// ── Phần dùng chung cho cả hai ngành (giống hệt trong file nguồn) ──

const DATA_MAP_COLUMNS = [
  'Nguồn thu thập',
  'Mục đích xử lý',
  'Cơ sở pháp lý',
  'Nhạy cảm?',
  'Nơi lưu trữ',
  'Ai có quyền truy cập',
  'Thời gian lưu',
  'Chia sẻ / Bên thứ ba',
  'Chuyển ra nước ngoài?',
];

const DATA_MAP_NOTE =
  'Lưu ý: dữ liệu sinh trắc học, sức khỏe, hình ảnh, thông tin tài khoản, hành vi/định vị… là DỮ LIỆU NHẠY CẢM — yêu cầu đồng ý riêng & bảo vệ tăng cường (PDPL).';

const RISK_SUGGESTIONS: Record<string, string> = {
  collect: 'Nền tảng: chỉ thu thập dữ liệu cần thiết, có đồng ý hợp lệ',
  transparency: 'Cần chính sách quyền riêng tư & cơ sở pháp lý cho mỗi hoạt động',
  security: 'Phân quyền truy cập, mã hóa dữ liệu nhạy cảm, sao lưu',
  rights: 'Lập quy trình đáp ứng quyền của chủ thể dữ liệu',
  thirdparty: 'Ký DPA với bên thứ ba; rà soát chuyển dữ liệu xuyên biên giới',
  governance: 'Phân công người phụ trách; quy trình sự cố 72 giờ; lưu hồ sơ',
};

const RISK_NOTE =
  'Lưu ý SME: DN siêu nhỏ/nhỏ & khởi nghiệp được MIỄN nghĩa vụ chỉ định DPO và làm DPIA/CTIA tới năm 2031 — TRỪ KHI xử lý dữ liệu nhạy cảm hoặc lượng lớn. Các nghĩa vụ còn lại (đồng ý, bảo mật, thông báo 72 giờ, quyền chủ thể, cấm mua bán dữ liệu) áp dụng ngay.';

const INCIDENT_STEPS: IncidentStep[] = [
  {
    id: 'i1',
    title: '1. Phát hiện & ghi nhận',
    desc: 'Ghi lại thời điểm phát hiện, ai phát hiện, mô tả ban đầu về sự cố.',
  },
  {
    id: 'i2',
    title: '2. Ngăn chặn',
    desc: 'Cô lập hệ thống/tài khoản bị ảnh hưởng; ngăn dữ liệu tiếp tục bị lộ.',
  },
  {
    id: 'i3',
    title: '3. Đánh giá mức độ',
    desc: 'Loại & lượng dữ liệu bị ảnh hưởng; có dữ liệu nhạy cảm không; nguy cơ gây hại cho chủ thể.',
  },
  {
    id: 'i4',
    title: '4. Thông báo cơ quan (≤72 giờ)',
    desc: 'Nếu sự cố có thể gây hại, thông báo cơ quan chuyên trách (Bộ Công an) trong 72 giờ kể từ khi phát hiện.',
  },
  {
    id: 'i5',
    title: '5. Thông báo chủ thể dữ liệu',
    desc: 'Khi có nguy cơ cao gây hại, thông báo cho cá nhân bị ảnh hưởng & hướng dẫn họ tự bảo vệ.',
  },
  {
    id: 'i6',
    title: '6. Khắc phục',
    desc: 'Vá lỗ hổng, khôi phục dữ liệu từ sao lưu, đổi mật khẩu/khóa truy cập.',
  },
  {
    id: 'i7',
    title: '7. Ghi nhận & lưu hồ sơ',
    desc: 'Lập hồ sơ sự cố đầy đủ (diễn biến, xử lý, thông báo) để phục vụ thanh tra & chứng minh tuân thủ.',
  },
  {
    id: 'i8',
    title: '8. Rút kinh nghiệm',
    desc: 'Phân tích nguyên nhân gốc; cập nhật quy trình, phân quyền & đào tạo để tránh tái diễn.',
  },
];

const LEGAL_ITEMS: LegalItem[] = [
  { id: 'l1', label: 'Chính sách quyền riêng tư — rà soát & cập nhật', frequency: 'Hằng năm' },
  { id: 'l2', label: 'Cơ chế & mẫu đồng ý — rà soát', frequency: 'Hằng năm' },
  { id: 'l3', label: 'Bản đồ dữ liệu (RoPA) — cập nhật', frequency: '6 tháng/lần' },
  {
    id: 'l4',
    label: 'Đánh giá tác động xử lý DLCN (DPIA) — nếu thuộc diện',
    frequency: 'Khi có hoạt động mới',
  },
  {
    id: 'l5',
    label: 'Đánh giá tác động chuyển DLCN ra nước ngoài (CTIA)',
    frequency: 'Khi có chuyển dữ liệu',
  },
  {
    id: 'l6',
    label: 'Hợp đồng xử lý dữ liệu (DPA) với bên thứ ba — rà soát',
    frequency: 'Hằng năm',
  },
  { id: 'l7', label: 'Rà soát & xóa dữ liệu hết thời hạn lưu', frequency: '6 tháng/lần' },
  { id: 'l8', label: 'Diễn tập ứng phó sự cố (72 giờ)', frequency: 'Hằng năm' },
  { id: 'l9', label: 'Đào tạo nhân viên về bảo vệ DLCN', frequency: 'Hằng năm' },
  { id: 'l10', label: 'Rà soát người/bộ phận phụ trách BVDLCN (DPO)', frequency: 'Hằng năm' },
  { id: 'l11', label: 'Giấy phép kinh doanh & giấy phép ngành', frequency: 'Theo hạn' },
  {
    id: 'l12',
    label: 'An ninh mạng: sao lưu, phân quyền, cập nhật bảo mật',
    frequency: 'Liên tục',
  },
];

const MILESTONES: ReviewMilestone[] = [
  {
    id: 'm30',
    title: '30 ngày',
    focus: 'Nền tảng: Bản đồ dữ liệu, đồng ý & chính sách, quy trình sự cố 72 giờ',
  },
  {
    id: 'm60',
    title: '60 ngày',
    focus: 'Hệ thống: phân quyền & bảo mật, DPA bên thứ ba, xác định DPO/DPIA',
  },
  {
    id: 'm90',
    title: '90 ngày',
    focus: 'Chuẩn hóa: đào tạo, lịch xóa dữ liệu, rà soát tuân thủ định kỳ',
  },
];

const INTRO_LEAD =
  "Bộ công cụ Gói B giúp doanh nghiệp chuyển từ 'lo lắng về luật dữ liệu' sang 'biết mình đang giữ dữ liệu gì và làm gì để tuân thủ' — lập bản đồ, đánh giá, ứng phó sự cố, theo dõi và hành động. Đồng thiết kế cùng Data Protectify (chuyên gia bảo vệ dữ liệu & tuân thủ) cho SME.";

// ════════════════════════ NGÀNH SẢN XUẤT ════════════════════════

const SAN_XUAT_ASSESSMENT: AssessmentGroup[] = [
  mkGroup('collect', 'Thu thập & Đồng ý', [
    [
      'DN có xác định rõ những loại dữ liệu cá nhân nào đang thu thập (nhân viên, ứng viên, NCC, khách B2B) không?',
      'CAO — Không biết mình giữ dữ liệu gì = không thể bảo vệ',
      'Luật BVDLCN 2025 (minh bạch)',
    ],
    [
      'DN chỉ thu thập dữ liệu thực sự cần thiết cho mục đích cụ thể (tối thiểu hóa) không?',
      'CAO — Thu thập thừa làm tăng rủi ro & trách nhiệm',
      'PDPL (tối thiểu hóa dữ liệu)',
    ],
    [
      'DN có lấy sự đồng ý rõ ràng của người lao động/ứng viên trước khi thu thập & xử lý dữ liệu không?',
      'NGHIÊM TRỌNG — Xử lý không có cơ sở pháp lý là vi phạm',
      'PDPL (đồng ý)',
    ],
    [
      'Với dữ liệu sinh trắc học chấm công (vân tay/khuôn mặt), DN có xử lý như dữ liệu NHẠY CẢM với đồng ý riêng không?',
      'NGHIÊM TRỌNG — Dữ liệu sinh trắc là dữ liệu nhạy cảm, yêu cầu bảo vệ cao hơn',
      'PDPL (dữ liệu nhạy cảm)',
    ],
    [
      'DN có thông báo cho cá nhân về mục đích xử lý tại thời điểm thu thập không?',
      'CAO — Thu thập ngầm vi phạm nguyên tắc minh bạch',
      'PDPL (minh bạch)',
    ],
    [
      'DN có cơ chế để cá nhân rút lại sự đồng ý không?',
      'CAO — Không cho rút đồng ý là vi phạm quyền chủ thể',
      'PDPL (quyền chủ thể)',
    ],
    [
      'DN có biện pháp bảo vệ tăng cường khi xử lý dữ liệu của nhóm đặc biệt (trẻ em, người hạn chế năng lực) không?',
      'CAO — Nhóm đặc biệt được bảo vệ tăng cường',
      'PDPL (nhóm đặc biệt)',
    ],
  ]),
  mkGroup('transparency', 'Cơ sở pháp lý & Minh bạch', [
    [
      'DN có chính sách quyền riêng tư (privacy policy) bằng văn bản & dễ tiếp cận không?',
      'CAO — Thiếu chính sách = thiếu minh bạch & cơ sở tuân thủ',
      'PDPL (minh bạch)',
    ],
    [
      'Mỗi hoạt động xử lý dữ liệu có cơ sở pháp lý rõ ràng (đồng ý / hợp đồng / nghĩa vụ pháp lý) không?',
      'NGHIÊM TRỌNG — Xử lý không có cơ sở pháp lý là vi phạm',
      'PDPL (cơ sở xử lý)',
    ],
    [
      'DN có nêu rõ thời gian lưu trữ dữ liệu cho từng mục đích không?',
      'TRUNG BÌNH — Lưu vô thời hạn vi phạm nguyên tắc giới hạn lưu trữ',
      'PDPL (giới hạn lưu trữ)',
    ],
    [
      'DN chỉ sử dụng dữ liệu đúng mục đích đã thông báo (không dùng cho mục đích khác) không?',
      'CAO — Dùng sai mục đích là vi phạm',
      'PDPL (giới hạn mục đích)',
    ],
    [
      'DN có rà soát & cập nhật chính sách quyền riêng tư định kỳ không?',
      'TRUNG BÌNH — Chính sách lỗi thời không phản ánh thực tế xử lý',
      'Cải tiến liên tục',
    ],
    [
      'DN có đảm bảo dữ liệu chính xác & cập nhật khi cần không?',
      'TRUNG BÌNH — Dữ liệu sai gây quyết định sai & khiếu nại',
      'PDPL (chính xác)',
    ],
    [
      'DN KHÔNG mua/bán dữ liệu cá nhân dưới mọi hình thức chứ?',
      'NGHIÊM TRỌNG — Mua/bán DLCN bị cấm hoàn toàn; phạt tới 10× doanh thu vi phạm hoặc 3 tỷ VNĐ',
      'PDPL (cấm mua bán dữ liệu)',
    ],
  ]),
  mkGroup('security', 'An ninh & Lưu trữ', [
    [
      'Quyền truy cập dữ liệu cá nhân có được giới hạn theo vai trò (chỉ người cần mới truy cập) không?',
      'NGHIÊM TRỌNG — Truy cập tràn lan = rủi ro rò rỉ nội bộ',
      'PDPL (biện pháp bảo vệ); ISO 27001',
    ],
    [
      'Dữ liệu nhạy cảm (sinh trắc, sức khỏe NLĐ) có được mã hóa/bảo vệ tăng cường không?',
      'NGHIÊM TRỌNG — Dữ liệu nhạy cảm yêu cầu biện pháp cao hơn',
      'PDPL; ISO 27001/27701',
    ],
    [
      'DN có sao lưu dữ liệu & quy trình phục hồi không?',
      'CAO — Mất dữ liệu vĩnh viễn do mã độc/hỏng phần cứng',
      'ISO 27001 (sao lưu)',
    ],
    [
      'Nhân viên có được đào tạo về bảo mật (mật khẩu mạnh, không chia sẻ tài khoản, cảnh giác lừa đảo) không?',
      'CAO — Con người là điểm yếu lớn nhất',
      'ISO 27001 (nhận thức)',
    ],
    [
      'Dữ liệu giấy & thiết bị lưu trữ có được khóa/bảo vệ vật lý không?',
      'TRUNG BÌNH — Hồ sơ giấy & USB thất lạc cũng là rò rỉ',
      'ISO 27001 (an ninh vật lý)',
    ],
    [
      'DN có quy trình xóa/hủy dữ liệu an toàn khi hết thời hạn lưu không?',
      'CAO — Giữ dữ liệu quá hạn làm tăng rủi ro & vi phạm',
      'PDPL (giới hạn lưu trữ)',
    ],
    [
      'Hệ thống CNTT có được cập nhật bản vá & bảo vệ (diệt mã độc, tường lửa) không?',
      'CAO — Hệ thống lỗi thời dễ bị tấn công',
      'Luật An ninh mạng 2018',
    ],
  ]),
  mkGroup('rights', 'Quyền của Chủ thể Dữ liệu', [
    [
      'DN có quy trình tiếp nhận & xử lý yêu cầu của cá nhân (xem, sửa, xóa dữ liệu) không?',
      'CAO — Không đáp ứng quyền chủ thể là vi phạm',
      'PDPL (quyền chủ thể)',
    ],
    [
      'Cá nhân có thể yêu cầu xóa dữ liệu/rút đồng ý một cách dễ dàng không?',
      'CAO — Cản trở quyền xóa là vi phạm',
      'PDPL (quyền xóa)',
    ],
    [
      'DN có phản hồi yêu cầu của chủ thể trong thời hạn hợp lý không?',
      'TRUNG BÌNH — Chậm trễ gây khiếu nại & vi phạm',
      'PDPL',
    ],
    [
      'DN có thể cung cấp cho cá nhân bản sao dữ liệu của họ khi được yêu cầu không?',
      'TRUNG BÌNH — Quyền truy cập dữ liệu của chủ thể',
      'PDPL',
    ],
    [
      'DN có cơ chế tiếp nhận khiếu nại về dữ liệu cá nhân không?',
      'TRUNG BÌNH — Khiếu nại không kênh chính thức leo thang ra ngoài',
      'PDPL',
    ],
    [
      'DN có ghi nhận & lưu vết việc xử lý các yêu cầu của chủ thể không?',
      'THẤP — Không lưu vết khó chứng minh tuân thủ',
      'Trách nhiệm giải trình',
    ],
  ]),
  mkGroup('thirdparty', 'Bên thứ ba & Chuyển dữ liệu', [
    [
      'DN có hợp đồng xử lý dữ liệu (DPA) với các bên thứ ba xử lý dữ liệu thay mình (cloud, phần mềm HR, chấm công) không?',
      'NGHIÊM TRỌNG — Bên thứ ba làm sai, DN vẫn chịu trách nhiệm',
      'PDPL (bên xử lý)',
    ],
    [
      'DN có đánh giá năng lực bảo vệ dữ liệu của nhà cung cấp/đối tác trước khi chia sẻ không?',
      'CAO — Chia sẻ với bên yếu kém = rủi ro rò rỉ',
      'ISO 27001 (quản lý NCC)',
    ],
    [
      'DN có biết dữ liệu của mình có được lưu trữ/xử lý ở nước ngoài không (cloud nước ngoài)?',
      'CAO — Chuyển dữ liệu ra nước ngoài có yêu cầu riêng',
      'PDPL (chuyển xuyên biên giới)',
    ],
    [
      'Nếu chuyển dữ liệu ra nước ngoài, DN có nắm yêu cầu đánh giá tác động chuyển dữ liệu (CTIA) không?',
      'CAO — Vi phạm chuyển dữ liệu xuyên biên giới bị phạt tới 5% doanh thu',
      'PDPL; Nghị định 356/2025',
    ],
    [
      'DN có ràng buộc bên thứ ba chỉ dùng dữ liệu đúng mục đích & bảo mật không?',
      'CAO — Bên thứ ba dùng sai mục đích là rủi ro lớn',
      'PDPL (bên xử lý)',
    ],
    [
      'DN có rà soát định kỳ danh sách bên thứ ba được chia sẻ dữ liệu không?',
      'THẤP — Danh sách lỗi thời = chia sẻ ngoài kiểm soát',
      'Quản trị dữ liệu',
    ],
  ]),
  mkGroup('governance', 'Quản trị, DPO & Trách nhiệm', [
    [
      'DN có người/bộ phận chịu trách nhiệm bảo vệ dữ liệu cá nhân (DPO nội bộ hoặc thuê ngoài) không?',
      'CAO — Không ai phụ trách = không tuân thủ',
      'PDPL (nhân sự BVDLCN)',
    ],
    [
      'DN có xác định mình có thuộc diện phải có DPO/làm DPIA không (xử lý dữ liệu nhạy cảm/lượng lớn)?',
      'CAO — DN nhỏ được miễn DPO/DPIA tới 2031 TRỪ KHI xử lý dữ liệu nhạy cảm/lượng lớn',
      'PDPL; miễn trừ SME (Nghị định 356/2025)',
    ],
    [
      'DN có quy trình ứng phó sự cố dữ liệu & biết phải thông báo trong 72 giờ không?',
      'NGHIÊM TRỌNG — Thiếu quy trình = lỡ hạn thông báo 72 giờ',
      'PDPL (thông báo 72 giờ)',
    ],
    [
      'DN có đào tạo nhân viên định kỳ về bảo vệ dữ liệu cá nhân không?',
      'CAO — Nhân viên thiếu nhận thức là rủi ro hàng đầu',
      'PDPL (đào tạo)',
    ],
    [
      'DN có lập & lưu hồ sơ về hoạt động xử lý dữ liệu (để chứng minh tuân thủ) không?',
      'CAO — Không hồ sơ = không chứng minh được khi thanh tra',
      'PDPL (trách nhiệm giải trình)',
    ],
    [
      'DN có rà soát tuân thủ bảo vệ dữ liệu định kỳ (nội bộ hoặc cùng chuyên gia) không?',
      'TRUNG BÌNH — Khoảng trống tuân thủ tích lũy',
      'Cải tiến liên tục',
    ],
    [
      'DN có nắm mức phạt theo PDPL (tới 3 tỷ VNĐ, hoặc 5% doanh thu với vi phạm chuyển dữ liệu) để đánh giá rủi ro không?',
      'TRUNG BÌNH — Đánh giá thấp rủi ro = không ưu tiên nguồn lực',
      'PDPL (chế tài)',
    ],
  ]),
];

const SAN_XUAT_ACTIONS: ActionItem[] = [
  {
    id: 'a1',
    priority: 'critical',
    area: 'Bản đồ dữ liệu',
    action:
      'Lập Bản đồ Dữ liệu: liệt kê toàn bộ DLCN đang thu thập (nhân viên, sinh trắc, CCTV, NCC), nơi lưu, ai truy cập, thời gian lưu.',
    deadline: 'Ngày 30',
    measure: 'Bản đồ dữ liệu hoàn chỉnh',
  },
  {
    id: 'a2',
    priority: 'critical',
    area: 'Đồng ý & dữ liệu nhạy cảm',
    action:
      'Rà soát cơ chế đồng ý — đặc biệt dữ liệu sinh trắc chấm công & sức khỏe NLĐ (đồng ý riêng, bảo vệ tăng cường).',
    deadline: 'Ngày 45',
    measure: 'Có đồng ý hợp lệ cho dữ liệu nhạy cảm',
  },
  {
    id: 'a3',
    priority: 'critical',
    area: 'Ứng phó sự cố',
    action: 'Thiết lập quy trình ứng phó sự cố (thông báo 72 giờ) & phân công người phụ trách.',
    deadline: 'Ngày 30',
    measure: 'Quy trình sự cố ban hành & có người phụ trách',
  },
  {
    id: 'a4',
    priority: 'important',
    area: 'An ninh',
    action: 'Phân quyền truy cập theo vai trò; mã hóa/sao lưu dữ liệu nhạy cảm.',
    deadline: 'Ngày 60',
    measure: 'Phân quyền & mã hóa cho dữ liệu nhạy cảm',
  },
  {
    id: 'a5',
    priority: 'important',
    area: 'Bên thứ ba',
    action: 'Rà soát & ký hợp đồng xử lý dữ liệu (DPA) với cloud, phần mềm HR, đơn vị chấm công.',
    deadline: 'Ngày 60',
    measure: 'Có DPA với các bên xử lý chính',
  },
  {
    id: 'a6',
    priority: 'important',
    area: 'DPO/DPIA',
    action:
      'Xác định nghĩa vụ DPO/DPIA: kiểm tra có xử lý dữ liệu nhạy cảm/lượng lớn không (ảnh hưởng miễn trừ SME).',
    deadline: 'Ngày 60',
    measure: 'Biết rõ có/không phải có DPO/DPIA',
  },
  {
    id: 'a7',
    priority: 'quickwin',
    area: 'Đào tạo',
    action: 'Đào tạo nhân viên HR & quản lý về bảo vệ DLCN và xử lý dữ liệu nhân sự.',
    deadline: 'Ngày 30',
    measure: 'Buổi đào tạo đầu tiên hoàn thành',
  },
  {
    id: 'a8',
    priority: 'quickwin',
    area: 'Lưu trữ',
    action: 'Thiết lập lịch xóa dữ liệu hết thời hạn lưu (hồ sơ cũ, CCTV, ứng viên).',
    deadline: 'Ngày 14',
    measure: 'Lịch xóa dữ liệu được áp dụng',
  },
  {
    id: 'a9',
    priority: 'quickwin',
    area: 'Phân công',
    action: 'Chỉ định người phụ trách bảo vệ dữ liệu (nội bộ hoặc thuê ngoài).',
    deadline: 'Ngày 14',
    measure: 'Đã có người phụ trách rõ ràng',
  },
];

const SAN_XUAT: DataGovToolkitConfig = {
  id: 'datagov-toolkit-san-xuat',
  name: 'Quản trị Dữ liệu & Bảo vệ DLCN — Sản xuất',
  sector: 'Quản trị Dữ liệu · Ngành Sản xuất',
  introLead: INTRO_LEAD,
  dataMapColumns: DATA_MAP_COLUMNS,
  dataMapRows: [
    { id: 'd1', label: 'Hồ sơ nhân viên (tên, CCCD, lương, BHXH)' },
    { id: 'd2', label: 'Hợp đồng lao động & hồ sơ HR' },
    { id: 'd3', label: 'Dữ liệu chấm công sinh trắc học (vân tay/khuôn mặt)', sensitive: true },
    { id: 'd4', label: 'Hồ sơ sức khỏe / khám sức khỏe người lao động', sensitive: true },
    { id: 'd5', label: 'Hồ sơ ứng viên tuyển dụng' },
    { id: 'd6', label: 'Dữ liệu liên hệ nhà cung cấp / nhà thầu' },
    { id: 'd7', label: 'Dữ liệu liên hệ khách hàng B2B' },
    { id: 'd8', label: 'Hình ảnh camera giám sát (CCTV)', sensitive: true },
    { id: 'd9', label: 'Dữ liệu khách tham quan / ra vào nhà máy' },
    { id: 'd10', label: 'Dữ liệu marketing / liên hệ B2B' },
  ],
  dataMapNote: DATA_MAP_NOTE,
  assessmentGroups: SAN_XUAT_ASSESSMENT,
  riskSuggestions: RISK_SUGGESTIONS,
  riskNote: RISK_NOTE,
  incidentSteps: INCIDENT_STEPS,
  legalItems: LEGAL_ITEMS,
  actions: SAN_XUAT_ACTIONS,
  milestones: MILESTONES,
};

// ════════════════════════ NGÀNH DỊCH VỤ F&B ════════════════════════

const FNB_ASSESSMENT: AssessmentGroup[] = [
  mkGroup('collect', 'Thu thập & Đồng ý', [
    [
      'DN có xác định rõ những loại DLCN nào đang thu thập (khách hàng, đặt bàn, loyalty, thanh toán, nhân viên) không?',
      'CAO — Không biết mình giữ dữ liệu gì = không thể bảo vệ',
      'Luật BVDLCN 2025 (minh bạch)',
    ],
    [
      'DN chỉ thu thập dữ liệu thực sự cần thiết (tối thiểu hóa) không?',
      'CAO — Thu thập thừa làm tăng rủi ro & trách nhiệm',
      'PDPL (tối thiểu hóa dữ liệu)',
    ],
    [
      'DN có lấy đồng ý rõ ràng khi thu thập dữ liệu khách (đăng ký loyalty, wifi, marketing) không?',
      'NGHIÊM TRỌNG — Xử lý không có cơ sở pháp lý là vi phạm',
      'PDPL (đồng ý)',
    ],
    [
      'Khi gửi marketing (SMS/email/Zalo), DN có sự đồng ý của khách & cơ chế hủy nhận không?',
      'NGHIÊM TRỌNG — Gửi marketing không đồng ý vi phạm PDPL & quy định chống tin nhắn rác',
      'PDPL; Nghị định 91/2020 (chống spam)',
    ],
    [
      'DN có thông báo mục đích xử lý tại thời điểm thu thập (form loyalty, đặt bàn) không?',
      'CAO — Thu thập ngầm vi phạm nguyên tắc minh bạch',
      'PDPL (minh bạch)',
    ],
    [
      'DN có cơ chế để khách rút lại đồng ý (hủy loyalty, ngừng nhận marketing) không?',
      'CAO — Không cho rút đồng ý là vi phạm quyền chủ thể',
      'PDPL (quyền chủ thể)',
    ],
    [
      'Nếu thu thập dữ liệu liên quan trẻ em (combo gia đình, sự kiện), DN có biện pháp bảo vệ tăng cường không?',
      'CAO — Nhóm đặc biệt được bảo vệ tăng cường',
      'PDPL (nhóm đặc biệt)',
    ],
  ]),
  mkGroup('transparency', 'Cơ sở pháp lý & Minh bạch', [
    [
      'DN có chính sách quyền riêng tư dễ tiếp cận (tại quầy / website / app) không?',
      'CAO — Thiếu chính sách = thiếu minh bạch & cơ sở tuân thủ',
      'PDPL (minh bạch)',
    ],
    [
      'Mỗi hoạt động xử lý (loyalty, đặt bàn, camera, marketing) có cơ sở pháp lý rõ ràng không?',
      'NGHIÊM TRỌNG — Xử lý không có cơ sở pháp lý là vi phạm',
      'PDPL (cơ sở xử lý)',
    ],
    [
      'DN có nêu rõ thời gian lưu dữ liệu khách cho từng mục đích không?',
      'TRUNG BÌNH — Lưu vô thời hạn vi phạm nguyên tắc giới hạn lưu trữ',
      'PDPL (giới hạn lưu trữ)',
    ],
    [
      'DN chỉ dùng dữ liệu khách đúng mục đích đã thông báo không?',
      'CAO — Dùng sai mục đích là vi phạm',
      'PDPL (giới hạn mục đích)',
    ],
    [
      'DN có rà soát & cập nhật chính sách quyền riêng tư định kỳ không?',
      'TRUNG BÌNH — Chính sách lỗi thời không phản ánh thực tế xử lý',
      'Cải tiến liên tục',
    ],
    [
      'DN có giữ dữ liệu khách chính xác & cho phép cập nhật không?',
      'TRUNG BÌNH — Dữ liệu sai gây quyết định sai & khiếu nại',
      'PDPL (chính xác)',
    ],
    [
      'DN KHÔNG mua/bán/trao đổi danh sách khách hàng chứ?',
      'NGHIÊM TRỌNG — Mua/bán DLCN bị cấm; phạt tới 10× doanh thu vi phạm hoặc 3 tỷ VNĐ',
      'PDPL (cấm mua bán dữ liệu)',
    ],
  ]),
  mkGroup('security', 'An ninh & Lưu trữ', [
    [
      'Quyền truy cập dữ liệu khách có giới hạn theo vai trò (thu ngân / quản lý) không?',
      'NGHIÊM TRỌNG — Truy cập tràn lan = rủi ro rò rỉ nội bộ',
      'PDPL (biện pháp bảo vệ); ISO 27001',
    ],
    [
      'Dữ liệu thanh toán/thẻ có được xử lý an toàn (không lưu trái phép) không?',
      'NGHIÊM TRỌNG — Lưu dữ liệu thẻ sai cách rủi ro rất cao',
      'ISO 27001; chuẩn an toàn thanh toán',
    ],
    [
      'DN có sao lưu dữ liệu (POS / loyalty) & quy trình phục hồi không?',
      'CAO — Mất dữ liệu vĩnh viễn do mã độc/hỏng phần cứng',
      'ISO 27001 (sao lưu)',
    ],
    [
      'Nhân viên có được đào tạo bảo mật (mật khẩu POS, không chia sẻ tài khoản) không?',
      'CAO — Con người là điểm yếu lớn nhất',
      'ISO 27001 (nhận thức)',
    ],
    [
      'Camera giám sát (CCTV) có thông báo cho khách & lưu trữ/truy cập có kiểm soát không?',
      'CAO — Hình ảnh khách là DLCN; CCTV không kiểm soát là rủi ro',
      'PDPL (dữ liệu hình ảnh)',
    ],
    [
      'DN có quy trình xóa dữ liệu khách hết thời hạn (CCTV, loyalty cũ) không?',
      'CAO — Giữ dữ liệu quá hạn làm tăng rủi ro & vi phạm',
      'PDPL (giới hạn lưu trữ)',
    ],
    [
      'Hệ thống POS / wifi / app có được cập nhật bảo mật & bảo vệ không?',
      'CAO — Hệ thống lỗi thời dễ bị tấn công',
      'Luật An ninh mạng 2018',
    ],
  ]),
  mkGroup('rights', 'Quyền của Chủ thể Dữ liệu', [
    [
      'DN có quy trình để khách yêu cầu xem / sửa / xóa dữ liệu của họ không?',
      'CAO — Không đáp ứng quyền chủ thể là vi phạm',
      'PDPL (quyền chủ thể)',
    ],
    [
      'Khách có thể dễ dàng rút khỏi loyalty / ngừng nhận marketing / xóa dữ liệu không?',
      'CAO — Cản trở quyền xóa là vi phạm',
      'PDPL (quyền xóa)',
    ],
    [
      'DN có phản hồi yêu cầu của khách trong thời hạn hợp lý không?',
      'TRUNG BÌNH — Chậm trễ gây khiếu nại & vi phạm',
      'PDPL',
    ],
    [
      'DN có thể cung cấp bản sao dữ liệu khi khách yêu cầu không?',
      'TRUNG BÌNH — Quyền truy cập dữ liệu của chủ thể',
      'PDPL',
    ],
    [
      'DN có kênh tiếp nhận khiếu nại về dữ liệu cá nhân không?',
      'TRUNG BÌNH — Khiếu nại không kênh chính thức leo thang ra ngoài',
      'PDPL',
    ],
    [
      'DN có lưu vết việc xử lý yêu cầu của khách không?',
      'THẤP — Không lưu vết khó chứng minh tuân thủ',
      'Trách nhiệm giải trình',
    ],
  ]),
  mkGroup('thirdparty', 'Bên thứ ba & Chuyển dữ liệu', [
    [
      'DN có thỏa thuận xử lý dữ liệu (DPA) với bên thứ ba (POS, phần mềm loyalty, app giao hàng, cloud) không?',
      'NGHIÊM TRỌNG — Bên thứ ba làm sai, DN vẫn chịu trách nhiệm',
      'PDPL (bên xử lý)',
    ],
    [
      'DN có đánh giá năng lực bảo mật của nền tảng/đối tác trước khi chia sẻ dữ liệu khách không?',
      'CAO — Chia sẻ với bên yếu kém = rủi ro rò rỉ',
      'ISO 27001 (quản lý NCC)',
    ],
    [
      'Khi dùng app giao hàng (GrabFood/ShopeeFood/Be), DN có rõ ai sở hữu/được dùng dữ liệu khách không?',
      'CAO — Vùng xám về quyền dữ liệu khách qua nền tảng',
      'PDPL (chia sẻ dữ liệu)',
    ],
    [
      'DN có biết dữ liệu khách có lưu/xử lý ở nước ngoài (cloud/app nước ngoài) không?',
      'CAO — Chuyển dữ liệu ra nước ngoài có yêu cầu riêng',
      'PDPL (chuyển xuyên biên giới)',
    ],
    [
      'Nếu chuyển dữ liệu ra nước ngoài, DN có nắm yêu cầu đánh giá tác động (CTIA) không?',
      'CAO — Vi phạm chuyển dữ liệu bị phạt tới 5% doanh thu',
      'PDPL; Nghị định 356/2025',
    ],
    [
      'DN có rà soát định kỳ các bên thứ ba được chia sẻ dữ liệu khách không?',
      'THẤP — Danh sách lỗi thời = chia sẻ ngoài kiểm soát',
      'Quản trị dữ liệu',
    ],
  ]),
  mkGroup('governance', 'Quản trị, DPO & Trách nhiệm', [
    [
      'DN có người chịu trách nhiệm bảo vệ DLCN (nội bộ hoặc thuê ngoài) không?',
      'CAO — Không ai phụ trách = không tuân thủ',
      'PDPL (nhân sự BVDLCN)',
    ],
    [
      'DN có xác định mình có thuộc diện phải có DPO/DPIA không (dữ liệu nhạy cảm/lượng lớn)?',
      'CAO — DN nhỏ được miễn DPO/DPIA tới 2031 TRỪ KHI xử lý dữ liệu nhạy cảm/lượng lớn',
      'PDPL; miễn trừ SME (Nghị định 356/2025)',
    ],
    [
      'DN có quy trình ứng phó sự cố & biết phải thông báo trong 72 giờ không?',
      'NGHIÊM TRỌNG — Thiếu quy trình = lỡ hạn thông báo 72 giờ',
      'PDPL (thông báo 72 giờ)',
    ],
    [
      'DN có đào tạo nhân viên định kỳ về bảo vệ dữ liệu khách không?',
      'CAO — Nhân viên thiếu nhận thức là rủi ro hàng đầu',
      'PDPL (đào tạo)',
    ],
    [
      'DN có lưu hồ sơ hoạt động xử lý dữ liệu để chứng minh tuân thủ không?',
      'CAO — Không hồ sơ = không chứng minh được khi thanh tra',
      'PDPL (trách nhiệm giải trình)',
    ],
    [
      'DN có rà soát tuân thủ bảo vệ dữ liệu định kỳ không?',
      'TRUNG BÌNH — Khoảng trống tuân thủ tích lũy',
      'Cải tiến liên tục',
    ],
    [
      'DN có nắm mức phạt theo PDPL (tới 3 tỷ VNĐ / 5% doanh thu) để đánh giá rủi ro không?',
      'TRUNG BÌNH — Đánh giá thấp rủi ro = không ưu tiên nguồn lực',
      'PDPL (chế tài)',
    ],
  ]),
];

const FNB_ACTIONS: ActionItem[] = [
  {
    id: 'a1',
    priority: 'critical',
    area: 'Bản đồ dữ liệu',
    action:
      'Lập Bản đồ Dữ liệu: liệt kê toàn bộ DLCN đang thu thập (khách, loyalty, thanh toán, CCTV), nơi lưu, ai truy cập, thời gian lưu.',
    deadline: 'Ngày 30',
    measure: 'Bản đồ dữ liệu hoàn chỉnh',
  },
  {
    id: 'a2',
    priority: 'critical',
    area: 'Đồng ý & marketing',
    action:
      'Rà soát & cập nhật cơ chế đồng ý + chính sách quyền riêng tư; thêm cơ chế hủy nhận marketing (SMS/Zalo).',
    deadline: 'Ngày 45',
    measure: 'Đồng ý hợp lệ & có cơ chế hủy nhận',
  },
  {
    id: 'a3',
    priority: 'critical',
    area: 'Ứng phó sự cố',
    action: 'Thiết lập quy trình ứng phó sự cố (thông báo 72 giờ) & phân công người phụ trách.',
    deadline: 'Ngày 30',
    measure: 'Quy trình sự cố ban hành & có người phụ trách',
  },
  {
    id: 'a4',
    priority: 'important',
    area: 'An ninh',
    action: 'Phân quyền truy cập POS theo vai trò; bảo vệ dữ liệu thanh toán & CCTV; sao lưu.',
    deadline: 'Ngày 60',
    measure: 'Phân quyền & bảo vệ dữ liệu nhạy cảm',
  },
  {
    id: 'a5',
    priority: 'important',
    area: 'Bên thứ ba',
    action: 'Rà soát hợp đồng xử lý dữ liệu (DPA) với POS, phần mềm loyalty, app giao hàng, cloud.',
    deadline: 'Ngày 60',
    measure: 'Có DPA với các nền tảng chính',
  },
  {
    id: 'a6',
    priority: 'important',
    area: 'DPO/DPIA',
    action:
      'Xác định nghĩa vụ DPO/DPIA: kiểm tra có xử lý dữ liệu nhạy cảm/lượng lớn không (ảnh hưởng miễn trừ SME).',
    deadline: 'Ngày 60',
    measure: 'Biết rõ có/không phải có DPO/DPIA',
  },
  {
    id: 'a7',
    priority: 'quickwin',
    area: 'Đào tạo',
    action: 'Đào tạo nhân viên (thu ngân, phục vụ) về xử lý dữ liệu khách & bảo mật POS.',
    deadline: 'Ngày 30',
    measure: 'Buổi đào tạo đầu tiên hoàn thành',
  },
  {
    id: 'a8',
    priority: 'quickwin',
    area: 'Lưu trữ',
    action: 'Thiết lập lịch xóa dữ liệu hết thời hạn (CCTV, loyalty cũ, dữ liệu khách không dùng).',
    deadline: 'Ngày 14',
    measure: 'Lịch xóa dữ liệu được áp dụng',
  },
  {
    id: 'a9',
    priority: 'quickwin',
    area: 'Phân công',
    action: 'Chỉ định người phụ trách bảo vệ dữ liệu (nội bộ hoặc thuê ngoài).',
    deadline: 'Ngày 14',
    measure: 'Đã có người phụ trách rõ ràng',
  },
];

const FNB: DataGovToolkitConfig = {
  id: 'datagov-toolkit-fnb',
  name: 'Quản trị Dữ liệu & Bảo vệ DLCN — Dịch vụ F&B',
  sector: 'Quản trị Dữ liệu · Ngành Dịch vụ F&B',
  introLead: INTRO_LEAD,
  dataMapColumns: DATA_MAP_COLUMNS,
  dataMapRows: [
    { id: 'd1', label: 'Thông tin khách hàng (tên, SĐT, email)' },
    { id: 'd2', label: 'Dữ liệu chương trình khách hàng thân thiết (loyalty)' },
    { id: 'd3', label: 'Dữ liệu đặt bàn / đặt món' },
    { id: 'd4', label: 'Dữ liệu thanh toán (thẻ, ví điện tử)', sensitive: true },
    { id: 'd5', label: 'Hình ảnh camera giám sát (CCTV)', sensitive: true },
    { id: 'd6', label: 'Dữ liệu wifi khách' },
    { id: 'd7', label: 'Dữ liệu marketing (SMS / email / Zalo)' },
    { id: 'd8', label: 'Dữ liệu qua app giao hàng (GrabFood/ShopeeFood/Be)' },
    { id: 'd9', label: 'Đánh giá / phản hồi khách hàng' },
    { id: 'd10', label: 'Hồ sơ nhân viên (HR)' },
  ],
  dataMapNote: DATA_MAP_NOTE,
  assessmentGroups: FNB_ASSESSMENT,
  riskSuggestions: RISK_SUGGESTIONS,
  riskNote: RISK_NOTE,
  incidentSteps: INCIDENT_STEPS,
  legalItems: LEGAL_ITEMS,
  actions: FNB_ACTIONS,
  milestones: MILESTONES,
};

const DATAGOV_TOOLKITS: Record<string, DataGovToolkitConfig> = {
  [SAN_XUAT.id]: SAN_XUAT,
  [FNB.id]: FNB,
};

export function getDataGov(id: string | null): DataGovToolkitConfig | undefined {
  return id ? DATAGOV_TOOLKITS[id] : undefined;
}
