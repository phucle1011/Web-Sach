import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { IOrder } from 'src/app/interface/order.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/apis/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common'; 

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [DecimalPipe] 
})
export class AppOrdersComponent{
  list: IOrder[] = [];
  readonly dialog = inject(MatDialog);
  searchTerm: string = '';
  dataSource: any;
  
  constructor(private orderService: OrderService) {
    this.getAll();
  }

  private decimalPipe = inject(DecimalPipe);

  getAll() {
    this.orderService.getOrder().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
        console.log(this.list);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteOrder(order: IOrder): void {
    if (order.status !== "Chờ xác nhận") {
      alert('Chỉ có thể hủy các đơn hàng có trạng thái là "Chờ xác nhận"!');
      return;
    }
    
    if (confirm(`Bạn có chắc muốn hủy đơn hàng có ID ${order.id} và tên là ${order.name}?`)) {
      this.orderService.deleteOrder(order.id).subscribe({
        next: () => {
          alert('Đã hủy đơn hàng thành công!');
          this.getAll();
        },
        error: (err) => {
          console.error('Lỗi khi hủy đơn hàng:', err);
          alert('Hủy đơn hàng thất bại!');
        }
      });
    }
  }

  updateStatus(order: IOrder): void {
    this.orderService.updateOrder(order.id, order).subscribe({
      next: () => {
        console.log(`Cập nhật trạng thái đơn hàng ${order.id} thành công`);
      },
      error: (err) => {
        console.error(`Lỗi cập nhật trạng thái đơn hàng ${order.id}:`, err);
        alert('Cập nhật trạng thái thất bại!');
        this.getAll(); 
      }
    });
  }
  
  statuses: string[] = [
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang giao',
    'Hoàn thành',
    'Đã giao hàng thành công',
    'Đã hủy'
  ];
  
  getValidStatuses(currentStatus: string): string[] {
    const index = this.statuses.indexOf(currentStatus);
    return index >= 0 ? this.statuses.slice(index) : [];
  }
  
  formatCurrency(value: number): string {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  }

  searchProducts(): void {
    if (this.searchTerm) {
      this.orderService.searchOrder(this.searchTerm).subscribe({
        next: (res: any) => {
          this.list = res.data; // ✅ Gán vào list để hiển thị
        },
        error: (err) => {
          console.error(err);
          alert('Không tìm thấy đơn hàng hoặc xảy ra lỗi!');
        }
      });
    } else {
      this.getAll();
    }
  }
  
}
