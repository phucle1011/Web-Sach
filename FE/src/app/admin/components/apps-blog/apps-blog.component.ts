import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { StatisticsService } from 'src/app/services/apiClient/statistics.service'; 
import { Chart } from 'chart.js/auto';  // Import Chart.js

interface Stats {
  users: number;
  categories: number;
  products: number;
  comments: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
  ],
  templateUrl: './apps-blog.component.html',
  styleUrls: ['./apps-blog.component.scss'],
})
export class AppBlogComponent implements OnInit, AfterViewInit {
  stats: Stats = {
    users: 0,
    categories: 0,
    products: 0,
    comments: 0,
  };
  totalRevenue = 0;
  totalOrders = 0;
  productcards: any[] = [];
  pieChart: any;  // Biểu đồ sẽ được lưu trữ ở đây

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  ngAfterViewInit(): void {
    this.updateChartData();  // Gọi khi Angular đã hoàn thành việc render DOM
  }
  getStatistics(): void {
    let done = 0;
    const checkDone = () => {
      done++;
      if (done === 4) {
        this.updateChartData(); // Gọi khi đã có đủ dữ liệu
      }
    };
  
    this.statisticsService.getUserCount().subscribe((res) => {
      this.stats.users = res.totalUsers;
      checkDone();
    });
  
    this.statisticsService.getCategoryCount().subscribe((res) => {
      this.stats.categories = res.totalCategories;
      checkDone();
    });
  
    this.statisticsService.getProductCount().subscribe((res) => {
      this.stats.products = res.totalProducts;
      checkDone();
    });
  
    this.statisticsService.getCommentCount().subscribe((res) => {
      this.stats.comments = res.totalComments;
      checkDone();
    });
  
    // Các API không liên quan đến biểu đồ thì không cần chờ:
    this.statisticsService.getTotalRevenue().subscribe((res) => {
      this.totalRevenue = res.totalRevenue;
    });
  
    this.statisticsService.getTotalOrders().subscribe((res) => {
      this.totalOrders = res.totalOrders;
    });
  
    this.statisticsService.getTopSellingProducts().subscribe((res) => {
      this.productcards = res.data.map((item: any) => ({
        id: item.product_id,
        imgSrc: item.product?.image || 'https://via.placeholder.com/150',
        title: item.product?.title || 'Sản phẩm không tên',
        price: item.product?.price || 0,
        rprice: item.product?.price ? item.product.price + 20000 : 0,
      }));
    });
  }
  

  updateChartData(): void {
    const data = [
      this.stats.users,
      this.stats.categories,
      this.stats.products,
      this.stats.comments,
    ];
    console.log("Chart data:", data);
  
    setTimeout(() => {
      const ctx = <HTMLCanvasElement>document.getElementById('pieChart');
      if (ctx) {
        if (this.pieChart) {
          this.pieChart.data.datasets[0].data = data;
          this.pieChart.update();
        } else {
          // Tạo biểu đồ mới
          this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Users', 'Categories', 'Products', 'Comments'],
              datasets: [{
                data: data,
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
                hoverBackgroundColor: ['#ff6666', '#3399ff', '#66cc66', '#ff9966'],
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false, // Quan trọng để biểu đồ có thể co giãn
              plugins: {
                legend: {
                  position: 'top',
                },
              }
            }
          });
        }
      }
    }, 0);
  }
  
  
  
}
