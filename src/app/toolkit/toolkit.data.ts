export interface Toolkit {
  id: string;
  name: string;
  comingSoon?: boolean;
}

export const TOOLKITS: Toolkit[] = [
  { id: 'esg-quick-scan-fnb', name: 'Đánh giá nhanh ESG — Dịch vụ F&B' },
  { id: 'esg-quick-scan-supply-chain', name: 'Đánh giá nhanh ESG — Sản xuất' },
  { id: 'waste-toolkit', name: 'Bộ công cụ Chất thải' },
  { id: 'coming-soon-1', name: 'Bộ công cụ mới (sắp ra mắt)', comingSoon: true },
  { id: 'coming-soon-2', name: 'Bộ công cụ mới (sắp ra mắt)', comingSoon: true },
];

export function findToolkit(id: string | null): Toolkit | undefined {
  return TOOLKITS.find((t) => t.id === id);
}
