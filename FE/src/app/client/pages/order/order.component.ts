import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/apis/order.service';
import { IOrder } from '../../../interface/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderClientComponent implements OnInit {
  list: IOrder[] = [];
  selectedOrderId: number | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    const userId = this.getUserIdFromSession();
    console.log(userId);

    this.orderService.getOrderClient(userId).subscribe({
      next: (res: any) => {
        this.list = res?.orders ?? [];
        console.log("list", this.list);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUserIdFromSession(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.userId ?? 0;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN') + ' VND';
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN');
  }

  deleteOrderClient(order: IOrder): void {
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

  toggleDetails(orderId: number) {
    if (this.selectedOrderId === orderId) {
      this.selectedOrderId = null; // Nếu đã chọn rồi, bỏ chọn
    } else {
      this.selectedOrderId = orderId; // Chọn đơn hàng mới
    }
  }

  getSelectedOrder(): IOrder | undefined {
    return this.list.find(order => order.id === this.selectedOrderId);
  }

  confirmCompletion(orderId: number) {
    this.orderService.confirmCompletion(orderId).subscribe({
      next: (res) => {
        alert(res.message);
        const order = this.list.find(o => o.id === orderId);
        if (order) {
          order.status = 'Đã giao hàng thành công';
        }
      },
      error: (err) => {
        alert(err.error.message || 'Đã xảy ra lỗi!');
      }
    });
  }  
  
  loadOrders() {
    throw new Error('Method not implemented.');
  }
  
}
