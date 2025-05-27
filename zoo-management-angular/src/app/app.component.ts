import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OltpModuleComponent } from './components/oltp-module/oltp-module.component';
import { DataWarehouseComponent } from './components/data-warehouse/data-warehouse.component';
import { ReportingModuleComponent } from './components/reporting-module/reporting-module.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    OltpModuleComponent, 
    DataWarehouseComponent, 
    ReportingModuleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  activeModule: 'oltp' | 'warehouse' | 'reporting' = 'oltp';

  ngOnInit() {
  }

  setActiveModule(module: 'oltp' | 'warehouse' | 'reporting') {
    this.activeModule = module;
  }

  getModuleTitle(): string {
    switch (this.activeModule) {
      case 'oltp':
        return 'OLTP Module';
      case 'warehouse':
        return 'Data Warehouse Module';
      case 'reporting':
        return 'Reporting Module';
      default:
        return '';
    }
  }

  getModuleDescription(): string {
    switch (this.activeModule) {
      case 'oltp':
        return 'Database operations and data management.';
      case 'warehouse':
        return 'Data warehousing and ETL processes.';
      case 'reporting':
        return 'Analytics and reporting dashboard.';
      default:
        return '';
    }
  }
}
