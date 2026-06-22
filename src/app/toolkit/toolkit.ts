import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findToolkit, Toolkit } from './toolkit.data';
import { getQuickScan } from './quick-scan/quick-scan.data';
import { QuickScanComponent } from './quick-scan/quick-scan';
import WasteToolkitComponent from './waste/waste';
import { getWasteToolkit } from './waste/waste.data';
import DataGovToolkitComponent from './datagov/datagov';
import { getDataGov } from './datagov/datagov.data';
import EnergyToolkitComponent from './energy/energy';
import { getEnergyToolkit } from './energy/energy.data';

@Component({
  selector: 'app-toolkit',
  standalone: true,
  imports: [
    CommonModule,
    QuickScanComponent,
    WasteToolkitComponent,
    DataGovToolkitComponent,
    EnergyToolkitComponent,
  ],
  templateUrl: './toolkit.html',
})
export default class ToolkitComponent implements OnInit {
  private route = inject(ActivatedRoute);

  id = signal<string | null>(null);
  toolkit = computed<Toolkit | undefined>(() => findToolkit(this.id()));
  quickScan = computed(() => getQuickScan(this.id()));
  wasteToolkit = computed(() => getWasteToolkit(this.id()));
  dataGovToolkit = computed(() => getDataGov(this.id()));
  energyToolkit = computed(() => getEnergyToolkit(this.id()));

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id.set(params.get('id'));
    });
  }
}
