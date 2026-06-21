export type ToolkitGroup = 'quick-scan' | 'waste';

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
    id: 'coming-soon-1',
    name: 'Bộ công cụ mới',
    description: 'Công cụ tiếp theo đang được phát triển.',
    comingSoon: true,
  },
];

export function findToolkit(id: string | null): Toolkit | undefined {
  return TOOLKITS.find((t) => t.id === id);
}
