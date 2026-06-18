import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findToolkit, Toolkit } from './toolkit.data';
import { getQuickScan } from './quick-scan/quick-scan.data';
import { QuickScanComponent } from './quick-scan/quick-scan';

@Component({
  selector: 'app-toolkit',
  standalone: true,
  imports: [CommonModule, QuickScanComponent],
  templateUrl: './toolkit.html',
})
export default class ToolkitComponent implements OnInit {
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  toolkit = computed<Toolkit | undefined>(() => findToolkit(this.id()));
  quickScan = computed(() => getQuickScan(this.id()));

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id.set(params.get('id'));
    });
  }
}
