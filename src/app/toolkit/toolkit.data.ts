export type ToolkitGroup = 'quick-scan' | 'waste' | 'datagov' | 'energy';

export interface Toolkit {
  id: string;
  name: string;
  /** Category the card is grouped under on the index page. */
  group?: ToolkitGroup;
  /** Target sector chip (e.g. "Dịch vụ F&B", "Sản xuất"). */
  sector?: string;
  /** Short blurb shown on the card. */
  description?: string;
  comingSoon?: boolean;
}

export const TOOLKITS: Toolkit[] = [
  {
    id: 'esg-quick-scan-fnb',
    name: 'Đánh giá nhanh ESG — Dịch vụ F&B',
    group: 'quick-scan',
    sector: 'Dịch vụ F&B',
    description:
      'Bộ câu hỏi nhanh theo 3 trụ cột E–S–G cho nhà hàng, quán cà phê, foodservice. Cho điểm sẵn sàng & ưu tiên cải thiện.',
  },
  {
    id: 'esg-quick-scan-supply-chain',
    name: 'Đánh giá nhanh ESG — Sản xuất',
    group: 'quick-scan',
    sector: 'Sản xuất',
    description:
      'Bộ câu hỏi nhanh theo 3 trụ cột E–S–G cho nhà máy, xưởng sản xuất. Cho điểm sẵn sàng & ưu tiên cải thiện.',
  },
  {
    id: 'waste-toolkit-fnb',
    name: 'Bộ công cụ Chất thải — Dịch vụ F&B',
    group: 'waste',
    sector: 'Dịch vụ F&B',
    description:
      'Lập bản đồ rác, đánh giá thực hành (40 câu), chấm điểm nhà thầu, theo dõi food waste & chi phí, kế hoạch 90 ngày.',
  },
  {
    id: 'waste-toolkit-supply',
    name: 'Bộ công cụ Chất thải — Sản xuất',
    group: 'waste',
    sector: 'Sản xuất',
    description:
      'Lập bản đồ rác sản xuất, đánh giá thực hành (40 câu), chấm nhà thầu, theo dõi phế liệu, kiểm soát ô nhiễm & EPR.',
  },
  {
    id: 'datagov-toolkit-fnb',
    name: 'Quản trị Dữ liệu & Bảo vệ DLCN — Dịch vụ F&B',
    group: 'datagov',
    sector: 'Dịch vụ F&B',
    description:
      'Bản đồ dữ liệu cá nhân, đánh giá tuân thủ PDPL (40 câu), ứng phó sự cố 72 giờ, theo dõi nghĩa vụ pháp lý & kế hoạch 90 ngày.',
  },
  {
    id: 'datagov-toolkit-san-xuat',
    name: 'Quản trị Dữ liệu & Bảo vệ DLCN — Sản xuất',
    group: 'datagov',
    sector: 'Sản xuất',
    description:
      'Bản đồ dữ liệu (nhân viên, sinh trắc, CCTV), đánh giá tuân thủ PDPL (40 câu), ứng phó sự cố, theo dõi pháp lý & kế hoạch 90 ngày.',
  },
  {
    id: 'energy-toolkit-fnb',
    name: 'Bộ công cụ Hiệu quả Năng lượng — Dịch vụ F&B',
    group: 'energy',
    sector: 'Dịch vụ F&B',
    description:
      'Bản đồ năng lượng 12 tháng, đánh giá thực hành (40 câu), kiểm kê thiết bị (kWh), tìm cơ hội tiết kiệm (ROI), theo dõi cường độ & kế hoạch 90 ngày.',
  },
  {
    id: 'energy-toolkit-supply',
    name: 'Bộ công cụ Hiệu quả Năng lượng — Sản xuất',
    group: 'energy',
    sector: 'Sản xuất',
    description:
      'Bản đồ năng lượng, đánh giá thực hành (40 câu), kiểm kê thiết bị (máy nén khí, động cơ…), cơ hội tiết kiệm (ROI), theo dõi cường độ & kế hoạch 90 ngày.',
  },
  {
    id: 'coming-soon-1',
    name: 'Bộ công cụ mới',
    description: 'Công cụ tiếp theo đang được phát triển.',
    comingSoon: true,
  },
];

export function findToolkit(id: string | null): Toolkit | undefined {
  return TOOLKITS.find((t) => t.id === id);
}
