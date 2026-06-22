import type {
  AssessmentGroup,
  AssessmentQuestion,
  ActionItem,
  EnergyToolkitConfig,
  ReviewMilestone,
} from './energy.types';

/** Compact question builder (text · risk/opportunity · legal reference). */
function q(id: string, text: string, risk: string, ref: string): AssessmentQuestion {
  return { id, text, risk, ref };
}

/** Review milestones are identical across sectors. */
const MILESTONES: ReviewMilestone[] = [
  {
    id: 'm30',
    title: '30 ngày',
    focus: 'Nền tảng: giám sát/đo lường, sửa rò rỉ, tắt thiết bị, LED',
  },
  {
    id: 'm60',
    title: '60 ngày',
    focus: 'Hệ thống: lắp đồng hồ phụ, biến tần, tối ưu điều hòa/làm lạnh',
  },
  {
    id: 'm90',
    title: '90 ngày',
    focus: 'Đầu tư: điện mặt trời, BESS, lộ trình & mục tiêu tiết kiệm',
  },
];

// ════════════════════════════════════════════════════════════════════════
// F&B (Dịch vụ F&B)
// ════════════════════════════════════════════════════════════════════════
const FNB_ASSESSMENT: AssessmentGroup[] = [
  {
    id: 'monitor',
    topic: 'Giám sát & Đo lường Năng lượng',
    questions: [
      q(
        'fnb-mon-1',
        'DN có theo dõi tiêu thụ điện hằng tháng theo từng điểm bán & so sánh giữa các tháng không?',
        'CAO — Không đo = không kiểm soát',
        'Luật SDNLTK&HQ 2010 (sửa đổi 2025); ISO 50001',
      ),
      q(
        'fnb-mon-2',
        'DN có thiết bị giám sát điện năng (đồng hồ phụ/IoT) cho khu vực lớn (bếp, điều hòa) không?',
        'CAO — Không có đồng hồ phụ thì không biết khu nào tốn điện nhất',
        'ISO 50001 (đo lường)',
      ),
      q(
        'fnb-mon-3',
        'DN có biết hệ thống nào chiếm tỷ trọng điện lớn nhất (điều hòa, bếp, làm lạnh) không?',
        'CAO — Không biết điểm nóng = đầu tư sai chỗ',
        'Phương pháp khảo sát VEEP',
      ),
      q(
        'fnb-mon-4',
        'DN có giải pháp phát hiện thất thoát/lãng phí điện không?',
        'TRUNG BÌNH — Thất thoát âm thầm làm tăng chi phí',
        'Quản lý năng lượng',
      ),
      q(
        'fnb-mon-5',
        'DN có theo dõi công suất đỉnh & hệ số công suất không?',
        'TRUNG BÌNH — cosφ thấp/vượt công suất bị phụ phí',
        'Biểu giá EVN',
      ),
      q(
        'fnb-mon-6',
        'DN có đặt mục tiêu tiết kiệm điện (%) cho năm nay không?',
        'TRUNG BÌNH — Không mục tiêu = không cải thiện',
        'ISO 50001 (mục tiêu)',
      ),
      q(
        'fnb-mon-7',
        'DN có đối chiếu điện tiêu thụ với sản lượng (kWh/suất ăn hoặc kWh/triệu doanh thu) không?',
        'CAO — Chỉ số cường độ cho thấy hiệu quả thật, giúp so sánh giữa chi nhánh',
        'ISO 50001 (EnPI); VEEP',
      ),
    ],
  },
  {
    id: 'hvac',
    topic: 'Điều hòa, Thông gió & Làm lạnh',
    questions: [
      q(
        'fnb-hvac-1',
        'Nhiệt độ điều hòa khu khách có đặt hợp lý (≈25–26°C) & kiểm soát không?',
        'CAO — Mỗi 1°C thấp hơn ≈ +2–3% điện điều hòa',
        'QCVN 09:2017/BXD',
      ),
      q(
        'fnb-hvac-2',
        'Điều hòa & hệ làm lạnh có bảo trì/vệ sinh định kỳ (lọc, dàn) không?',
        'CAO — Dàn bẩn làm giảm hiệu suất, tăng điện',
        'Bảo trì HVAC',
      ),
      q(
        'fnb-hvac-3',
        'Tủ lạnh/tủ đông/kho lạnh có gioăng kín, đóng cửa nhanh, không quá tải không?',
        'CAO — Gioăng hở & cửa mở lâu làm tăng điện làm lạnh đáng kể',
        'Best practice làm lạnh',
      ),
      q(
        'fnb-hvac-4',
        'Kho lạnh/tủ đông có rèm nhựa (PVC strip) & xả đá định kỳ không?',
        'TRUNG BÌNH — Đóng tuyết làm giảm hiệu suất',
        'Bảo trì làm lạnh',
      ),
      q(
        'fnb-hvac-5',
        'Khu có điều hòa có đóng kín cửa & cách nhiệt tốt không?',
        'TRUNG BÌNH — Thất thoát lạnh làm điều hòa chạy nhiều hơn',
        'QCVN 09:2017/BXD',
      ),
      q(
        'fnb-hvac-6',
        'Quạt hút mùi/thông gió bếp có vận hành đúng nhu cầu (không chạy thừa) không?',
        'TRUNG BÌNH — Hút mùi chạy full công suất liên tục tốn điện',
        'Tối ưu vận hành',
      ),
      q(
        'fnb-hvac-7',
        'DN có theo dõi tỷ trọng điện của điều hòa & làm lạnh trong tổng tiêu thụ không?',
        'TRUNG BÌNH — Đây thường là khoản điện lớn nhất của F&B',
        'VEEP',
      ),
    ],
  },
  {
    id: 'kitchen',
    topic: 'Thiết bị Bếp & Nhà bếp',
    questions: [
      q(
        'fnb-kit-1',
        'Thiết bị bếp (lò, bếp, hấp) có được tắt/giảm khi không phục vụ & có quy trình bật-tắt theo giờ không?',
        'CAO — Thiết bị bếp chạy không cần thiết rất tốn điện',
        'Tối ưu vận hành',
      ),
      q(
        'fnb-kit-2',
        'DN có lịch bật thiết bị theo nhu cầu (không bật sớm/để cả ngày) không?',
        'CAO — Khởi động sớm/để chạy cả ngày lãng phí lớn',
        'Hành vi tiết kiệm',
      ),
      q(
        'fnb-kit-3',
        'Thiết bị bếp mới có ưu tiên loại tiết kiệm năng lượng/dán nhãn không?',
        'TRUNG BÌNH — Thiết bị không hiệu suất tốn điện suốt vòng đời',
        'Nhãn năng lượng',
      ),
      q(
        'fnb-kit-4',
        'Máy hút mùi có hệ điều khiển theo nhu cầu (biến tần/cảm biến) không?',
        'TRUNG BÌNH — Hút mùi chạy full công suất liên tục tốn điện',
        'Best practice',
      ),
      q(
        'fnb-kit-5',
        'Máy nước nóng/đun có được cách nhiệt & đặt nhiệt độ hợp lý không?',
        'TRUNG BÌNH — Đun quá nóng & thất thoát nhiệt lãng phí điện',
        'Tối ưu vận hành',
      ),
      q(
        'fnb-kit-6',
        'DN có bảo trì thiết bị bếp định kỳ để giữ hiệu suất không?',
        'TRUNG BÌNH — Thiết bị thiếu bảo trì tiêu hao nhiều điện hơn',
        'Bảo trì',
      ),
      q(
        'fnb-kit-7',
        'Thiết bị làm mát đồ uống/trưng bày có đặt xa nguồn nhiệt & thông thoáng không?',
        'THẤP — Đặt cạnh bếp/nắng làm tăng điện làm lạnh',
        'Bố trí hợp lý',
      ),
    ],
  },
  {
    id: 'lighting',
    topic: 'Chiếu sáng',
    questions: [
      q(
        'fnb-light-1',
        'DN đã chuyển sang đèn LED ở khu khách & khu bếp chưa?',
        'CAO — LED tiết kiệm 50–70% so với đèn cũ',
        'Nhãn năng lượng / MEPS',
      ),
      q(
        'fnb-light-2',
        'Khu ít dùng (kho, WC) có cảm biến/hẹn giờ tắt đèn không?',
        'TRUNG BÌNH — Đèn cháy ở khu vực trống là lãng phí thuần',
        'Best practice',
      ),
      q(
        'fnb-light-3',
        'DN có tận dụng ánh sáng tự nhiên ban ngày khi khả thi không?',
        'THẤP — Bỏ lỡ nguồn sáng miễn phí',
        'Thiết kế hiệu quả',
      ),
      q(
        'fnb-light-4',
        'Đèn trang trí/biển hiệu có hẹn giờ/cảm biến ánh sáng không?',
        'THẤP — Đèn chạy ban ngày là lãng phí',
        'Tối ưu vận hành',
      ),
      q(
        'fnb-light-5',
        'Độ sáng có phù hợp không gian (không thừa) & tạo trải nghiệm tốt không?',
        'THẤP — Chiếu sáng quá mức vừa tốn điện vừa kém trải nghiệm',
        'QCVN chiếu sáng',
      ),
      q(
        'fnb-light-6',
        'Có người tắt đèn/thiết bị khu vực không dùng cuối ca không?',
        'TRUNG BÌNH — Không ai phụ trách = đèn/thiết bị chạy qua đêm',
        'Hành vi tiết kiệm',
      ),
    ],
  },
  {
    id: 'renewable',
    topic: 'Năng lượng tái tạo & Quản lý phụ tải',
    questions: [
      q(
        'fnb-ren-1',
        'DN đã đánh giá tiềm năng lắp điện mặt trời mái nhà chưa?',
        'CAO — Bỏ lỡ cơ hội giảm chi phí điện & phát thải',
        'Nghị định 58/2025/NĐ-CP (ĐMT mái tự dùng)',
      ),
      q(
        'fnb-ren-2',
        'DN có nắm quy định ĐMT mái tự sản tự tiêu không?',
        'TRUNG BÌNH — Cần nắm thủ tục theo công suất lắp đặt',
        'Nghị định 58/2025/NĐ-CP',
      ),
      q(
        'fnb-ren-3',
        'DN có biết khung giờ cao điểm & dịch tải (làm đá, giặt, sạc) sang giờ thấp điểm không?',
        'CAO — Chạy tải lớn vào giờ cao điểm rất tốn tiền',
        'Biểu giá ToU EVN',
      ),
      q(
        'fnb-ren-4',
        'Nếu đã lắp ĐMT, có giám sát & bảo trì tấm pin không?',
        'TRUNG BÌNH — Pin bẩn/lỗi làm giảm sản lượng',
        'Vận hành ĐMT',
      ),
      q(
        'fnb-ren-5',
        'DN có theo dõi giờ tiêu thụ điện cao nhất trong ngày (load profile) không?',
        'TRUNG BÌNH — Không biết đỉnh tải = không tối ưu được',
        'VEEP load profile',
      ),
      q(
        'fnb-ren-6',
        'DN có cân nhắc pin lưu trữ/dự phòng khi khả thi không?',
        'THẤP — BESS giúp cắt đỉnh & dự phòng mất điện',
        'VEEP (BESS)',
      ),
    ],
  },
  {
    id: 'governance',
    topic: 'Quản trị, Tuân thủ & Hành vi',
    questions: [
      q(
        'fnb-gov-1',
        'DN có người phụ trách quản lý năng lượng/tiết kiệm điện không?',
        'CAO — Không ai sở hữu = không cải thiện',
        'Luật SDNLTK&HQ',
      ),
      q(
        'fnb-gov-2',
        'Nếu là cơ sở trọng điểm (công trình ≥500 TOE/năm), DN có thực hiện nghĩa vụ kiểm toán & báo cáo năng lượng không?',
        'NGHIÊM TRỌNG — Bắt buộc với cơ sở trọng điểm; vi phạm bị phạt',
        'Nghị định 30/2026/NĐ-CP',
      ),
      q(
        'fnb-gov-3',
        'DN có dùng thiết bị dán nhãn năng lượng khi mua mới không?',
        'TRUNG BÌNH — Thiết bị không hiệu suất tốn điện suốt vòng đời',
        'Dán nhãn NL/MEPS',
      ),
      q(
        'fnb-gov-4',
        'DN có đào tạo nhân viên thói quen tiết kiệm điện (tắt thiết bị, đóng cửa kho lạnh) không?',
        'CAO — Hành vi quyết định phần lớn lãng phí',
        'Hành vi tiết kiệm',
      ),
      q(
        'fnb-gov-5',
        'DN có lập kế hoạch tiết kiệm năng lượng hằng năm không?',
        'TRUNG BÌNH — Không kế hoạch = cải thiện rời rạc',
        'Thông tư 25/2020/TT-BCT',
      ),
      q(
        'fnb-gov-6',
        'DN có truyền thông kết quả tiết kiệm tới đội ngũ không?',
        'THẤP — Không ghi nhận làm giảm động lực',
        'Gắn kết nhân viên',
      ),
      q(
        'fnb-gov-7',
        'DN có cân nhắc tín dụng xanh để tài trợ nâng cấp (LED, ĐMT, thiết bị) không?',
        'THẤP — Bỏ lỡ nguồn vốn ưu đãi cho đầu tư EE',
        'Tín dụng xanh; Phân loại xanh QĐ 21/2025',
      ),
    ],
  },
];

const FNB_ACTIONS: ActionItem[] = [
  {
    id: 'fnb-a1',
    priority: 'critical',
    action: 'Kiểm tra gioăng, lắp rèm PVC, xả đá kho lạnh/tủ đông; đặt nhiệt độ hợp lý.',
    targetDay: 'Ngày 30',
    measure: 'Kho lạnh/tủ đông kín & xả đá định kỳ',
  },
  {
    id: 'fnb-a2',
    priority: 'critical',
    action: 'Thiết lập lịch bật-tắt thiết bị bếp theo nhu cầu (không bật sớm/để cả ngày).',
    targetDay: 'Ngày 30',
    measure: 'Lịch bật-tắt áp dụng cho thiết bị chính',
  },
  {
    id: 'fnb-a3',
    priority: 'critical',
    action: 'Lắp đồng hồ phụ cho bếp & điều hòa (2 khu tốn điện nhất).',
    targetDay: 'Ngày 60',
    measure: 'Có dữ liệu tiêu thụ cho 2 khu lớn nhất',
  },
  {
    id: 'fnb-a4',
    priority: 'important',
    action: 'Đặt 25–26°C, bảo trì/vệ sinh định kỳ, đóng kín khu vực có điều hòa.',
    targetDay: 'Ngày 45',
    measure: 'Điều hòa được bảo trì & đặt nhiệt độ chuẩn',
  },
  {
    id: 'fnb-a5',
    priority: 'important',
    action: 'Lắp biến tần/cảm biến cho máy hút mùi & thông gió bếp.',
    targetDay: 'Ngày 90',
    measure: 'Hút mùi vận hành theo nhu cầu',
  },
  {
    id: 'fnb-a6',
    priority: 'important',
    action: 'Đánh giá tiềm năng điện mặt trời mái nhà & phương án tài chính.',
    targetDay: 'Ngày 60',
    measure: 'Có báo cáo tiềm năng ĐMT & hoàn vốn',
  },
  {
    id: 'fnb-a7',
    priority: 'quickwin',
    action: 'Hoàn thành Bản đồ Năng lượng & phân bổ chi phí theo hệ thống.',
    targetDay: 'Ngày 7',
    measure: 'Biết điểm nóng tốn điện nhất',
  },
  {
    id: 'fnb-a8',
    priority: 'quickwin',
    action: 'Thay đèn LED + cảm biến ở khu khách & khu bếp.',
    targetDay: 'Ngày 30',
    measure: 'Đã thay LED khu vực tiêu thụ lớn',
  },
  {
    id: 'fnb-a9',
    priority: 'quickwin',
    action: 'Dịch làm đá/giặt sang giờ thấp điểm; phân công tắt thiết bị cuối ca.',
    targetDay: 'Ngày 14',
    measure: 'Tải lớn dịch khỏi giờ cao điểm',
  },
];

const FNB: EnergyToolkitConfig = {
  id: 'energy-toolkit-fnb',
  name: 'Bộ công cụ Hiệu quả Năng lượng — Dịch vụ F&B',
  sector: 'Module B — Ngành Dịch vụ F&B · Đối tác năng lượng: VIoT Group (VEEP)',
  outputLabel: 'suất ăn / lượt khách',
  defaultRate: 3000,
  allocationSystems: [
    { id: 'hvac', label: 'Điều hòa không khí (HVAC)' },
    { id: 'cold', label: 'Hệ thống làm lạnh / kho lạnh' },
    { id: 'kitchen', label: 'Thiết bị bếp (bếp, lò, hấp)' },
    { id: 'fridge', label: 'Tủ lạnh / tủ đông / tủ mát' },
    { id: 'lighting', label: 'Chiếu sáng' },
    { id: 'ventilation', label: 'Quạt thông gió / hút mùi' },
    { id: 'water', label: 'Bơm nước & máy nước nóng' },
    { id: 'public', label: 'Khu vực công cộng / biển hiệu' },
    { id: 'other', label: 'Khác' },
  ],
  assessmentGroups: FNB_ASSESSMENT,
  equipmentRows: [
    { id: 'fnb-eq-ac', label: 'Điều hòa không khí' },
    { id: 'fnb-eq-coldroom', label: 'Kho lạnh / tủ đông' },
    { id: 'fnb-eq-fridge', label: 'Tủ lạnh / tủ mát' },
    { id: 'fnb-eq-stove', label: 'Bếp điện / bếp từ' },
    { id: 'fnb-eq-oven', label: 'Lò nướng / lò hấp' },
    { id: 'fnb-eq-hood', label: 'Máy hút mùi / thông gió' },
    { id: 'fnb-eq-coffee', label: 'Máy pha cà phê / pha chế' },
    { id: 'fnb-eq-dishwasher', label: 'Máy rửa chén' },
    { id: 'fnb-eq-waterheater', label: 'Máy nước nóng' },
    { id: 'fnb-eq-lighting', label: 'Chiếu sáng' },
    { id: 'fnb-eq-signage', label: 'Biển hiệu / đèn trang trí' },
  ],
  savingsSolutions: [
    {
      id: 'fnb-sv-led',
      label: 'Thay đèn LED + cảm biến (~50–70% điện chiếu sáng)',
      invest: 'Thấp',
    },
    {
      id: 'fnb-sv-ac',
      label: 'Tối ưu nhiệt độ điều hòa 25–26°C & bảo trì (~5–15%)',
      invest: 'Thấp',
    },
    {
      id: 'fnb-sv-cold',
      label: 'Gioăng kín + rèm PVC + xả đá kho lạnh/tủ đông (~10–20% điện làm lạnh)',
      invest: 'Thấp',
    },
    {
      id: 'fnb-sv-kitchen',
      label: 'Lịch bật-tắt thiết bị bếp theo nhu cầu (~10–20%)',
      invest: 'Thấp',
    },
    {
      id: 'fnb-sv-vfd',
      label: 'Biến tần/cảm biến cho máy hút mùi & thông gió (~20–40%)',
      invest: 'Trung bình',
    },
    {
      id: 'fnb-sv-shift',
      label: 'Dịch tải (làm đá, giặt, sạc) sang giờ thấp điểm',
      invest: 'Thấp',
    },
    { id: 'fnb-sv-maint', label: 'Bảo trì định kỳ thiết bị bếp & làm lạnh', invest: 'Thấp' },
    {
      id: 'fnb-sv-label',
      label: 'Thiết bị bếp/làm lạnh dán nhãn tiết kiệm khi thay mới',
      invest: 'Trung bình',
    },
    { id: 'fnb-sv-solar', label: 'Điện mặt trời mái nhà tự sản tự tiêu', invest: 'Cao' },
    {
      id: 'fnb-sv-pf',
      label: 'Bù hệ số công suất / quản lý công suất đỉnh',
      invest: 'Trung bình',
    },
  ],
  planFields: [
    { label: 'Doanh nghiệp' },
    { label: 'Người phụ trách chung' },
    { label: 'Ngày lập kế hoạch', type: 'date' },
  ],
  actions: FNB_ACTIONS,
  reviewMilestones: MILESTONES,
};

// ════════════════════════════════════════════════════════════════════════
// SẢN XUẤT (Manufacturing)
// ════════════════════════════════════════════════════════════════════════
const SUPPLY_ASSESSMENT: AssessmentGroup[] = [
  {
    id: 'monitor',
    topic: 'Giám sát & Đo lường Năng lượng',
    questions: [
      q(
        'sx-mon-1',
        'DN có theo dõi tiêu thụ điện hằng tháng (đọc đồng hồ/hóa đơn) và so sánh giữa các kỳ không?',
        'CAO — Không đo = không kiểm soát; không phát hiện bất thường',
        'Luật SDNLTK&HQ 2010 (sửa đổi 2025); ISO 50001',
      ),
      q(
        'sx-mon-2',
        'DN có thiết bị giám sát điện năng (đồng hồ phụ, IoT) cho các khu vực/máy lớn không?',
        'CAO — Không có đồng hồ phụ thì không biết máy nào tốn điện nhất',
        'ISO 50001 (đo lường)',
      ),
      q(
        'sx-mon-3',
        'DN có biết hệ thống/máy nào chiếm tỷ trọng điện lớn nhất (phân bổ chi phí) không?',
        'CAO — Không biết điểm nóng = đầu tư sai chỗ',
        'Phương pháp khảo sát VEEP',
      ),
      q(
        'sx-mon-4',
        'DN có giải pháp phát hiện thất thoát điện (rò rỉ, chạy không tải) không?',
        'TRUNG BÌNH — Thất thoát âm thầm làm tăng chi phí',
        'Quản lý năng lượng',
      ),
      q(
        'sx-mon-5',
        'DN có theo dõi công suất đỉnh (kW) & hệ số công suất (cosφ) không?',
        'CAO — Vượt công suất đăng ký & cosφ thấp bị tính phụ phí',
        'Biểu giá EVN',
      ),
      q(
        'sx-mon-6',
        'DN có đặt mục tiêu tiết kiệm điện (%) cho năm nay không?',
        'TRUNG BÌNH — Không mục tiêu = không cải thiện',
        'ISO 50001 (mục tiêu)',
      ),
      q(
        'sx-mon-7',
        'DN có đối chiếu điện tiêu thụ với sản lượng (kWh/sản phẩm hoặc kWh/tấn) không?',
        'CAO — Chỉ số cường độ cho thấy hiệu quả thật, không chỉ tổng kWh',
        'ISO 50001 (EnPI); VEEP',
      ),
    ],
  },
  {
    id: 'production',
    topic: 'Hệ thống Sản xuất & Động cơ',
    questions: [
      q(
        'sx-prod-1',
        'Máy móc/thiết bị có được tắt khi không sử dụng & có quy trình tắt máy hệ thống không?',
        'CAO — Chạy không tải lãng phí điện đáng kể',
        'Luật SDNLTK&HQ',
      ),
      q(
        'sx-prod-2',
        'Các động cơ/bơm/quạt có dùng biến tần (VSD/inverter) khi phụ tải thay đổi không?',
        'CAO — VSD tiết kiệm 20–50% cho tải biến đổi',
        'Best practice (VSD)',
      ),
      q(
        'sx-prod-3',
        'Hệ thống khí nén có được kiểm tra & sửa rò rỉ định kỳ không?',
        'CAO — Rò rỉ khí nén thường lãng phí 20–30% điện máy nén',
        'Best practice (khí nén)',
      ),
      q(
        'sx-prod-4',
        'Áp suất khí nén có được đặt ở mức tối thiểu cần thiết (không dư) không?',
        'TRUNG BÌNH — Mỗi 1 bar dư ≈ +7% điện máy nén',
        'Tối ưu vận hành',
      ),
      q(
        'sx-prod-5',
        'Động cơ thay mới có đạt hiệu suất cao (IE3/IE4) không?',
        'TRUNG BÌNH — Động cơ hiệu suất thấp tốn điện suốt vòng đời',
        'Nhãn năng lượng / MEPS',
      ),
      q(
        'sx-prod-6',
        'DN có bảo trì định kỳ thiết bị (bôi trơn, vệ sinh, căn chỉnh) để giữ hiệu suất không?',
        'CAO — Thiết bị thiếu bảo trì tiêu hao nhiều điện hơn',
        'Bảo trì phòng ngừa',
      ),
      q(
        'sx-prod-7',
        'DN có tận dụng nhiệt thải (heat recovery) từ máy nén/lò khi khả thi không?',
        'THẤP — Bỏ lỡ cơ hội thu hồi năng lượng',
        'Hiệu quả năng lượng',
      ),
    ],
  },
  {
    id: 'hvac',
    topic: 'Điều hòa, Thông gió & Làm lạnh',
    questions: [
      q(
        'sx-hvac-1',
        'Nhiệt độ điều hòa có được đặt hợp lý (≈25–26°C) & kiểm soát không?',
        'CAO — Mỗi 1°C thấp hơn ≈ +2–3% điện điều hòa',
        'QCVN 09:2017/BXD',
      ),
      q(
        'sx-hvac-2',
        'Hệ thống điều hòa/chiller có được bảo trì & vệ sinh định kỳ (lọc, dàn) không?',
        'CAO — Dàn bẩn làm giảm hiệu suất, tăng điện',
        'Bảo trì HVAC',
      ),
      q(
        'sx-hvac-3',
        'Khu vực có điều hòa có được cách nhiệt & đóng kín (cửa, rèm) tốt không?',
        'TRUNG BÌNH — Thất thoát lạnh làm điều hòa chạy nhiều hơn',
        'QCVN 09:2017/BXD',
      ),
      q(
        'sx-hvac-4',
        'Hệ thống thông gió/cấp gió tươi có vận hành đúng nhu cầu (không thừa) không?',
        'TRUNG BÌNH — Thông gió quá mức lãng phí điện làm mát',
        'Tối ưu HVAC',
      ),
      q(
        'sx-hvac-5',
        'Chiller/hệ làm lạnh có hệ điều khiển (BMS/cảm biến) tối ưu theo tải không?',
        'CAO — BMS tối ưu chiller tiết kiệm đáng kể',
        'BMS best practice',
      ),
      q(
        'sx-hvac-6',
        'DN có theo dõi tỷ trọng điện của hệ làm mát trong tổng tiêu thụ không?',
        'TRUNG BÌNH — Làm mát thường là khoản lớn cần ưu tiên',
        'VEEP',
      ),
    ],
  },
  {
    id: 'lighting',
    topic: 'Chiếu sáng',
    questions: [
      q(
        'sx-light-1',
        'DN đã chuyển sang đèn LED ở các khu vực chính chưa?',
        'CAO — LED tiết kiệm 50–70% so với đèn cũ',
        'Nhãn năng lượng / MEPS',
      ),
      q(
        'sx-light-2',
        'Khu vực ít dùng có cảm biến hiện diện/hẹn giờ tắt đèn không?',
        'TRUNG BÌNH — Đèn cháy ở khu vực trống là lãng phí thuần',
        'Best practice',
      ),
      q(
        'sx-light-3',
        'DN có tận dụng ánh sáng tự nhiên (giếng trời, cửa sổ) khi khả thi không?',
        'THẤP — Bỏ lỡ nguồn sáng miễn phí',
        'Thiết kế hiệu quả',
      ),
      q(
        'sx-light-4',
        'Độ rọi (lux) có phù hợp công việc (không thừa sáng) không?',
        'THẤP — Chiếu sáng quá mức lãng phí điện',
        'QCVN chiếu sáng',
      ),
      q(
        'sx-light-5',
        'Đèn ngoài trời/biển hiệu có hẹn giờ/cảm biến ánh sáng không?',
        'THẤP — Đèn ngoài chạy ban ngày là lãng phí',
        'Tối ưu vận hành',
      ),
      q(
        'sx-light-6',
        'Có người chịu trách nhiệm tắt đèn khu vực không sử dụng cuối ca không?',
        'TRUNG BÌNH — Không ai phụ trách = đèn chạy qua đêm',
        'Hành vi tiết kiệm',
      ),
    ],
  },
  {
    id: 'renewable',
    topic: 'Năng lượng tái tạo & Quản lý phụ tải',
    questions: [
      q(
        'sx-ren-1',
        'DN đã đánh giá tiềm năng lắp điện mặt trời mái nhà (diện tích mái, phụ tải) chưa?',
        'CAO — Bỏ lỡ cơ hội giảm chi phí điện & phát thải',
        'Nghị định 58/2025/NĐ-CP (ĐMT mái tự dùng)',
      ),
      q(
        'sx-ren-2',
        'Nếu đã lắp ĐMT, DN có hệ giám sát & bảo trì tấm pin không?',
        'TRUNG BÌNH — Pin bẩn/lỗi làm giảm sản lượng',
        'Vận hành ĐMT',
      ),
      q(
        'sx-ren-3',
        'DN có nắm quy định ĐMT mái tự sản tự tiêu (đăng ký theo công suất) không?',
        'TRUNG BÌNH — Hệ ≥1.000 kW phải đăng ký với Sở Công Thương',
        'Nghị định 58/2025/NĐ-CP',
      ),
      q(
        'sx-ren-4',
        'DN có biết khung giờ cao điểm/thấp điểm & dịch chuyển phụ tải để giảm tiền điện không?',
        'CAO — Chạy tải lớn vào giờ cao điểm rất tốn tiền',
        'Biểu giá ToU EVN',
      ),
      q(
        'sx-ren-5',
        'DN có cân nhắc pin lưu trữ (BESS) để cắt đỉnh/dự phòng khi khả thi không?',
        'THẤP — BESS giúp cắt đỉnh phụ tải & dự phòng mất điện',
        'VEEP (BESS)',
      ),
      q(
        'sx-ren-6',
        'DN có theo dõi hồ sơ phụ tải (load profile) theo thời gian thực không?',
        'TRUNG BÌNH — Không biết đỉnh tải = không tối ưu được',
        'VEEP load profile',
      ),
      q(
        'sx-ren-7',
        'DN có cân nhắc mua điện tái tạo qua cơ chế DPPA (nếu nhu cầu lớn) không?',
        'THẤP — DPPA cho phép mua điện sạch trực tiếp',
        'Nghị định 57/2025/NĐ-CP (DPPA)',
      ),
    ],
  },
  {
    id: 'governance',
    topic: 'Quản trị, Tuân thủ & Hành vi',
    questions: [
      q(
        'sx-gov-1',
        'DN có người phụ trách quản lý năng lượng không?',
        'CAO — Không ai sở hữu = không cải thiện',
        'Luật SDNLTK&HQ (người quản lý NL)',
      ),
      q(
        'sx-gov-2',
        'Nếu là cơ sở sử dụng năng lượng trọng điểm (≥1.000 TOE/năm), DN có kiểm toán năng lượng & lập kế hoạch theo quy định không?',
        'NGHIÊM TRỌNG — Bắt buộc với cơ sở trọng điểm; vi phạm bị phạt',
        'Nghị định 30/2026/NĐ-CP; Thông tư 25/2020/TT-BCT',
      ),
      q(
        'sx-gov-3',
        'DN có sử dụng thiết bị đã dán nhãn năng lượng khi mua sắm mới không?',
        'TRUNG BÌNH — Thiết bị không hiệu suất tốn điện suốt vòng đời',
        'Dán nhãn NL & MEPS',
      ),
      q(
        'sx-gov-4',
        'DN có đào tạo nhân viên về thói quen tiết kiệm điện không?',
        'TRUNG BÌNH — Hành vi quyết định phần lớn lãng phí',
        'Hành vi tiết kiệm',
      ),
      q(
        'sx-gov-5',
        'DN có lập kế hoạch/lộ trình tiết kiệm năng lượng hằng năm không?',
        'CAO — Không kế hoạch = cải thiện rời rạc',
        'Thông tư 25/2020/TT-BCT',
      ),
      q(
        'sx-gov-6',
        'DN có truyền thông kết quả tiết kiệm điện tới đội ngũ để duy trì động lực không?',
        'THẤP — Không ghi nhận làm giảm động lực',
        'Gắn kết nhân viên',
      ),
      q(
        'sx-gov-7',
        'DN có cân nhắc tiếp cận tín dụng xanh để tài trợ nâng cấp hiệu quả năng lượng không?',
        'THẤP — Bỏ lỡ nguồn vốn ưu đãi cho đầu tư EE',
        'Tín dụng xanh; Phân loại xanh QĐ 21/2025',
      ),
    ],
  },
];

const SUPPLY_ACTIONS: ActionItem[] = [
  {
    id: 'sx-a1',
    priority: 'critical',
    action:
      'Xác định DN có thuộc cơ sở trọng điểm (≥1.000 TOE/năm) không; nếu có, lập kế hoạch kiểm toán & báo cáo năng lượng.',
    targetDay: 'Ngày 30',
    measure: 'Biết rõ trạng thái & nghĩa vụ tuân thủ',
  },
  {
    id: 'sx-a2',
    priority: 'critical',
    action: 'Kiểm tra & sửa rò rỉ khí nén; giảm áp suất xuống mức tối thiểu cần thiết.',
    targetDay: 'Ngày 45',
    measure: 'Giảm rò rỉ; áp suất đặt tối ưu',
  },
  {
    id: 'sx-a3',
    priority: 'critical',
    action: 'Lắp đồng hồ phụ/giám sát cho 3 khu vực/máy tốn điện nhất.',
    targetDay: 'Ngày 60',
    measure: 'Có dữ liệu tiêu thụ cho top 3 tải',
  },
  {
    id: 'sx-a4',
    priority: 'important',
    action: 'Lắp VSD cho bơm/quạt/động cơ tải biến đổi chính.',
    targetDay: 'Ngày 90',
    measure: 'VSD vận hành cho ít nhất 1 hệ tải lớn',
  },
  {
    id: 'sx-a5',
    priority: 'important',
    action: 'Dịch tải lớn khỏi giờ cao điểm; bù cosφ nếu đang bị phụ phí.',
    targetDay: 'Ngày 60',
    measure: 'Giảm tiền điện giờ cao điểm/phụ phí cosφ',
  },
  {
    id: 'sx-a6',
    priority: 'important',
    action: 'Đánh giá tiềm năng điện mặt trời mái nhà & phương án tài chính.',
    targetDay: 'Ngày 60',
    measure: 'Có báo cáo tiềm năng ĐMT & hoàn vốn',
  },
  {
    id: 'sx-a7',
    priority: 'quickwin',
    action: 'Hoàn thành Bản đồ Năng lượng & phân bổ chi phí theo hệ thống.',
    targetDay: 'Ngày 7',
    measure: 'Biết điểm nóng tốn điện nhất',
  },
  {
    id: 'sx-a8',
    priority: 'quickwin',
    action: 'Thay đèn LED + cảm biến ở các khu vực chính.',
    targetDay: 'Ngày 30',
    measure: 'Đã thay LED khu vực tiêu thụ lớn',
  },
  {
    id: 'sx-a9',
    priority: 'quickwin',
    action: 'Ban hành quy trình tắt máy/không tải & phân công người phụ trách.',
    targetDay: 'Ngày 14',
    measure: 'Quy trình áp dụng; có người phụ trách',
  },
];

const SUPPLY: EnergyToolkitConfig = {
  id: 'energy-toolkit-supply',
  name: 'Bộ công cụ Hiệu quả Năng lượng — Sản xuất',
  sector: 'Module B — Ngành Sản xuất · Đối tác năng lượng: VIoT Group (VEEP)',
  outputLabel: 'sản phẩm / tấn',
  defaultRate: 3000,
  allocationSystems: [
    { id: 'production', label: 'Máy móc / dây chuyền sản xuất' },
    { id: 'compressed', label: 'Máy nén khí (compressed air)' },
    { id: 'motors', label: 'Động cơ & bơm' },
    { id: 'hvac', label: 'Điều hòa / làm mát (HVAC/Chiller)' },
    { id: 'lighting', label: 'Chiếu sáng' },
    { id: 'ventilation', label: 'Quạt / thông gió' },
    { id: 'heating', label: 'Lò / thiết bị gia nhiệt' },
    { id: 'office', label: 'Văn phòng & khu phụ trợ' },
    { id: 'other', label: 'Khác' },
  ],
  assessmentGroups: SUPPLY_ASSESSMENT,
  equipmentRows: [
    { id: 'sx-eq-line', label: 'Dây chuyền / máy sản xuất chính' },
    { id: 'sx-eq-compressor', label: 'Máy nén khí' },
    { id: 'sx-eq-motor', label: 'Động cơ / motor' },
    { id: 'sx-eq-pump', label: 'Bơm' },
    { id: 'sx-eq-fan', label: 'Quạt / thông gió' },
    { id: 'sx-eq-chiller', label: 'Chiller / hệ làm mát' },
    { id: 'sx-eq-ac', label: 'Điều hòa văn phòng' },
    { id: 'sx-eq-furnace', label: 'Lò / thiết bị gia nhiệt' },
    { id: 'sx-eq-lighting', label: 'Chiếu sáng xưởng' },
    { id: 'sx-eq-conveyor', label: 'Băng tải / thang máy' },
    { id: 'sx-eq-waterpump', label: 'Bơm nước' },
  ],
  savingsSolutions: [
    {
      id: 'sx-sv-led',
      label: 'Thay đèn LED + cảm biến (tiết kiệm ~50–70% điện chiếu sáng)',
      invest: 'Thấp',
    },
    {
      id: 'sx-sv-air',
      label: 'Sửa rò rỉ khí nén & giảm áp suất dư (~20–30% điện máy nén)',
      invest: 'Thấp',
    },
    {
      id: 'sx-sv-vsd',
      label: 'Lắp biến tần (VSD) cho bơm/quạt/động cơ tải biến đổi (~20–50%)',
      invest: 'Trung bình',
    },
    {
      id: 'sx-sv-hvac',
      label: 'Tối ưu nhiệt độ & bảo trì điều hòa/chiller (~5–15%)',
      invest: 'Thấp',
    },
    {
      id: 'sx-sv-shift',
      label: 'Quy trình tắt máy/không tải & dịch tải khỏi giờ cao điểm',
      invest: 'Thấp',
    },
    { id: 'sx-sv-pf', label: 'Bù hệ số công suất (cosφ) tránh phụ phí EVN', invest: 'Thấp' },
    {
      id: 'sx-sv-motor',
      label: 'Bảo trì phòng ngừa & thay động cơ hiệu suất cao (IE3/IE4)',
      invest: 'Trung bình',
    },
    { id: 'sx-sv-heat', label: 'Thu hồi nhiệt thải (heat recovery) từ máy nén/lò', invest: 'Cao' },
    { id: 'sx-sv-solar', label: 'Điện mặt trời mái nhà tự sản tự tiêu', invest: 'Cao' },
    { id: 'sx-sv-bess', label: 'Pin lưu trữ (BESS) cắt đỉnh phụ tải / dự phòng', invest: 'Cao' },
  ],
  planFields: [
    { label: 'Doanh nghiệp' },
    { label: 'Người phụ trách chung' },
    { label: 'Ngày lập kế hoạch', type: 'date' },
  ],
  actions: SUPPLY_ACTIONS,
  reviewMilestones: MILESTONES,
};

export const ENERGY_TOOLKITS: Record<string, EnergyToolkitConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
};

export function getEnergyToolkit(id: string | null): EnergyToolkitConfig | undefined {
  return id ? ENERGY_TOOLKITS[id] : undefined;
}
