import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideGauge, LucideRecycle } from '@lucide/angular';
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
  imports: [CommonModule, RouterLink, LogoComponent, LucideArrowRight, LucideGauge, LucideRecycle],
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
  ];

  readonly comingSoon: Toolkit[] = TOOLKITS.filter((t) => t.comingSoon);
}
