import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideGauge, LucideRecycle, LucideZap } from '@lucide/angular';
import LogoComponent from '../shared/logo/logo';
import { Toolkit, ToolkitGroup, TOOLKITS } from './toolkit.data';

interface ToolkitSection {
  key: ToolkitGroup;
  title: string;
  subtitle: string;
  items: Toolkit[];
}

@Component({
  selector: 'app-toolkit-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LogoComponent,
    LucideArrowRight,
    LucideGauge,
    LucideRecycle,
    LucideZap,
  ],
  templateUrl: './toolkit-list.html',
})
export default class ToolkitListComponent {
  readonly sections: ToolkitSection[] = [
    {
      key: 'quick-scan',
      title: 'Đánh giá nhanh ESG',
      subtitle: 'Quét nhanh mức độ sẵn sàng ESG theo 3 trụ cột Môi trường – Xã hội – Quản trị.',
      items: TOOLKITS.filter((t) => t.group === 'quick-scan'),
    },
    {
      key: 'waste',
      title: 'Bộ công cụ Chất thải',
      subtitle: 'Lập bản đồ, đánh giá, theo dõi và xây kế hoạch 90 ngày cho quản lý chất thải.',
      items: TOOLKITS.filter((t) => t.group === 'waste'),
    },
    {
      key: 'datagov',
      title: 'Quản trị Dữ liệu & Bảo vệ DLCN',
      subtitle:
        'Lập bản đồ dữ liệu, đánh giá tuân thủ PDPL 2025, ứng phó sự cố và theo dõi nghĩa vụ pháp lý.',
      items: TOOLKITS.filter((t) => t.group === 'datagov'),
    },
    {
      key: 'energy',
      title: 'Bộ công cụ Hiệu quả Năng lượng',
      subtitle:
        'Lập bản đồ năng lượng, đánh giá thực hành, kiểm kê thiết bị, tìm cơ hội tiết kiệm (ROI) và kế hoạch 90 ngày.',
      items: TOOLKITS.filter((t) => t.group === 'energy'),
    },
  ];

  readonly comingSoon: Toolkit[] = TOOLKITS.filter((t) => t.comingSoon);
}
