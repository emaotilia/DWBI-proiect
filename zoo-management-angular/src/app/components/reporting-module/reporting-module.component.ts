import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { ZooDataService } from '../../services/zoo-data.service';
import { forkJoin, Subscription } from 'rxjs';

Chart.register(...registerables);

interface ChartDataSet {
  ticketSales: any[];
  zooPerformance: any[];
  eventTypes: any[];
}

@Component({
  selector: 'app-reporting-module',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './reporting-module.component.html',
  styleUrl: './reporting-module.component.scss'
})
export class ReportingModuleComponent implements OnInit, OnDestroy {
  reportData: ChartDataSet | null = null;
  private subscriptions: Subscription[] = [];
  isLoading = true;
  
  // Chart configurations
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';
  
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  eventBarChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private zooDataService: ZooDataService) {}

  ngOnInit() {
    this.loadRealData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadRealData() {
    this.isLoading = true;
    
    // Load all analytics data in parallel
    const analytics$ = forkJoin({
      monthlyTrends: this.zooDataService.getMonthlyTrends(),
      zooPerformance: this.zooDataService.getZooPerformanceMetrics(),
      ticketSales: this.zooDataService.getTicketSalesSummary(),
      eventStats: this.zooDataService.getEventStatistics(),
      revenueByMonth: this.zooDataService.getRevenueByMonth(),
      visitorDemographics: this.zooDataService.getVisitorDemographics()
    });

    const subscription = analytics$.subscribe({
      next: (data) => {
        this.processAnalyticsData(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading analytics data:', error);
        this.generateFallbackData();
        this.isLoading = false;
      }
    });

    this.subscriptions.push(subscription);
  }

  private processAnalyticsData(data: any) {
    // Process monthly trends for ticket sales chart
    const ticketSales = data.monthlyTrends.map((trend: any) => ({
      month: this.formatMonth(trend.month),
      vanzari: trend.revenue || 0,
      evenimente: trend.events || 0,
      vizitatori: trend.visits || 0
    }));

    // Process zoo performance metrics
    const zooPerformance = data.zooPerformance.map((zoo: any) => ({
      zoo: zoo.zoo_name || zoo.nume,
      vanzari: zoo.total_revenue || 0,
      vizitatori: zoo.total_visits || 0
    }));

    // Process visitor demographics for event types pie chart
    const eventTypes = data.visitorDemographics.map((demo: any, index: number) => ({
      name: demo.age_group,
      value: demo.percentage || 0,
      color: this.getChartColor(index)
    }));

    this.reportData = { ticketSales, zooPerformance, eventTypes };
    this.updateCharts();
  }

  private generateFallbackData() {
    // Fallback to mock data if backend fails
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'];
    const ticketSales = months.map(month => ({
      month,
      vanzari: Math.floor(Math.random() * 1000) + 200,
      evenimente: Math.floor(Math.random() * 50) + 10,
      vizitatori: Math.floor(Math.random() * 2000) + 500
    }));

    const zooPerformance = [
      { zoo: 'Bucuresti', vanzari: 15420, vizitatori: 3240 },
      { zoo: 'Timisoara', vanzari: 12800, vizitatori: 2890 },
      { zoo: 'Cluj-Napoca', vanzari: 11200, vizitatori: 2456 }
    ];

    const eventTypes = [
      { name: 'Educationale', value: 35, color: '#8884d8' },
      { name: 'Divertisment', value: 25, color: '#82ca9d' },
      { name: 'Speciale', value: 20, color: '#ffc658' },
      { name: 'Sezoniere', value: 20, color: '#ff7300' }
    ];

    this.reportData = { ticketSales, zooPerformance, eventTypes };
    this.updateCharts();
  }

  private formatMonth(monthString: string): string {
    if (!monthString) return '';
    const [year, month] = monthString.split('-');
    const monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
    return monthNames[parseInt(month) - 1] || month;
  }

  private getChartColor(index: number): string {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];
    return colors[index % colors.length];
  }

  updateCharts() {
    if (!this.reportData) return;

    // Line Chart - Ticket Sales
    this.lineChartData = {
      labels: this.reportData.ticketSales.map(item => item.month),
      datasets: [
        {
          label: 'Vânzări',
          data: this.reportData.ticketSales.map(item => item.vanzari),
          borderColor: '#8884d8',
          backgroundColor: '#8884d8',
          tension: 0.1
        },
        {
          label: 'Vizitatori',
          data: this.reportData.ticketSales.map(item => item.vizitatori),
          borderColor: '#82ca9d',
          backgroundColor: '#82ca9d',
          tension: 0.1
        }
      ]
    };

    // Bar Chart - Zoo Performance
    this.barChartData = {
      labels: this.reportData.zooPerformance.map(item => item.zoo),
      datasets: [
        {
          label: 'Vânzări',
          data: this.reportData.zooPerformance.map(item => item.vanzari),
          backgroundColor: '#8884d8'
        },
        {
          label: 'Vizitatori',
          data: this.reportData.zooPerformance.map(item => item.vizitatori),
          backgroundColor: '#82ca9d'
        }
      ]
    };

    // Event Bar Chart
    this.eventBarChartData = {
      labels: this.reportData.ticketSales.map(item => item.month),
      datasets: [
        {
          label: 'Evenimente',
          data: this.reportData.ticketSales.map(item => item.evenimente),
          backgroundColor: '#ff7300'
        }
      ]
    };

    // Pie Chart - Event Types
    this.pieChartData = {
      labels: this.reportData.eventTypes.map(item => item.name),
      datasets: [
        {
          data: this.reportData.eventTypes.map(item => item.value),
          backgroundColor: this.reportData.eventTypes.map(item => item.color)
        }
      ]
    };
  }

  refreshData() {
    this.loadRealData();
  }

  getTotalSales(): number {
    return this.reportData?.zooPerformance.reduce((sum, zoo) => sum + zoo.vanzari, 0) || 0;
  }

  getTotalVisitors(): number {
    return this.reportData?.zooPerformance.reduce((sum, zoo) => sum + zoo.vizitatori, 0) || 0;
  }

  getTotalEvents(): number {
    return this.reportData?.ticketSales.reduce((sum, month) => sum + month.evenimente, 0) || 0;
  }

  getZooCount(): number {
    return this.reportData?.zooPerformance.length || 0;
  }
}
