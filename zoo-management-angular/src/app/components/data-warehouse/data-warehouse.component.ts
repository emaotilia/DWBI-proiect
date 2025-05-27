import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZooDataService } from '../../services/zoo-data.service';
import { forkJoin } from 'rxjs';

interface DWOperation {
  id: number;
  operation: string;
  timestamp: string;
  status: 'In Progress' | 'Completed' | 'Error';
  records: number;
  details?: string;
}

interface AnalyticsData {
  zooStatistics: any[];
  revenueData: any[];
  visitorDemographics: any[];
  employeeDistribution: any[];
  animalDiversity: any[];
  etlSummary: any;
}

@Component({
  selector: 'app-data-warehouse',
  imports: [CommonModule],
  templateUrl: './data-warehouse.component.html',
  styleUrl: './data-warehouse.component.scss'
})
export class DataWarehouseComponent implements OnInit {
  dwOperations: DWOperation[] = [];
  analyticsData: AnalyticsData | null = null;
  isLoadingAnalytics = false;

  constructor(private zooDataService: ZooDataService) {}

  ngOnInit() {
    this.loadAnalyticsData();
    // Subscribe to ETL logs from the service
    this.zooDataService.etlLogs$.subscribe(logs => {
      // Convert ETL logs to DW operations format
      this.dwOperations = logs.map(log => ({
        id: log.id,
        operation: `${log.operation} - ${log.sourceTable}`,
        timestamp: log.timestamp,
        status: log.status === 'success' ? 'Completed' : log.status === 'error' ? 'Error' : 'In Progress',
        records: log.recordCount,
        details: log.details
      }));
    });
  }

  loadAnalyticsData() {
    this.isLoadingAnalytics = true;
    
    forkJoin({
      zooStatistics: this.zooDataService.getZooStatistics(),
      revenueData: this.zooDataService.getRevenueByMonth(),
      visitorDemographics: this.zooDataService.getVisitorDemographics(),
      employeeDistribution: this.zooDataService.getEmployeeDistribution(),
      animalDiversity: this.zooDataService.getAnimalDiversity(),
      etlSummary: this.zooDataService.getETLSummary()
    }).subscribe({
      next: (data) => {
        this.analyticsData = data;
        this.isLoadingAnalytics = false;
      },
      error: (error) => {
        console.error('Error loading analytics data:', error);
        this.isLoadingAnalytics = false;
      }
    });
  }

  handleDWOperation(operation: string) {
    const timestamp = new Date().toLocaleString('ro-RO');
    const newOperation: DWOperation = {
      id: this.dwOperations.length + 1,
      operation,
      timestamp,
      status: 'In Progress',
      records: 0
    };
    
    this.dwOperations.unshift(newOperation);
    
    if (operation === 'Extract Transform Load') {
      // Simulate real ETL process with backend
      this.zooDataService.simulateBackendETL().subscribe({
        next: (result) => {
          const index = this.dwOperations.findIndex(op => op.id === newOperation.id);
          if (index !== -1) {
            this.dwOperations[index].status = result.success ? 'Completed' : 'Error';
            this.dwOperations[index].records = result.recordsProcessed || 0;
            this.dwOperations[index].details = result.message;
          }
          // Reload analytics data after ETL
          if (result.success) {
            this.loadAnalyticsData();
          }
        },
        error: (error) => {
          const index = this.dwOperations.findIndex(op => op.id === newOperation.id);
          if (index !== -1) {
            this.dwOperations[index].status = 'Error';
            this.dwOperations[index].details = `ETL failed: ${error.message}`;
          }
        }
      });
    } else if (operation === 'Data Validation') {
      // Use existing data validation simulation
      this.zooDataService.simulateDataValidation().subscribe({
        next: (log) => {
          const index = this.dwOperations.findIndex(op => op.id === newOperation.id);
          if (index !== -1) {
            this.dwOperations[index].status = log.status === 'success' ? 'Completed' : 'Error';
            this.dwOperations[index].records = log.recordCount;
            this.dwOperations[index].details = log.details;
          }
        }
      });
    } else if (operation === 'Sync Modifications') {
      // Use existing sync simulation
      this.zooDataService.simulateSyncModifications().subscribe({
        next: (log) => {
          const index = this.dwOperations.findIndex(op => op.id === newOperation.id);
          if (index !== -1) {
            this.dwOperations[index].status = log.status === 'success' ? 'Completed' : 'Error';
            this.dwOperations[index].records = log.recordCount;
            this.dwOperations[index].details = log.details;
          }
          // Reload analytics data after sync
          this.loadAnalyticsData();
        }
      });
    }
  }
}
