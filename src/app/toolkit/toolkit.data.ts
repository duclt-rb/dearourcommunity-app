export interface Toolkit {
  id: string;
  name: string;
  comingSoon?: boolean;
}

export const TOOLKITS: Toolkit[] = [
  { id: 'esg-quick-scan-fnb', name: 'ESG Quick Scan — F&B' },
  { id: 'esg-quick-scan-supply-chain', name: 'ESG Quick Scan — Chuỗi Cung Ứng' },
  { id: 'waste-toolkit', name: 'Waste Toolkit' },
  { id: 'coming-soon-1', name: 'Toolkit mới (coming soon)', comingSoon: true },
  { id: 'coming-soon-2', name: 'Toolkit mới (coming soon)', comingSoon: true },
];

export function findToolkit(id: string | null): Toolkit | undefined {
  return TOOLKITS.find((t) => t.id === id);
}
