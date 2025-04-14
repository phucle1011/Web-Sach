import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IOrder } from 'src/app/interface/order.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/apis/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-deatail',
  imports: [MatTableModule, MatCardModule, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './orders-deatail.component.html',
  styleUrls: ['./orders-deatail.component.scss']
})
export class OrdersDeatailComponent {
  list: IOrder[] = [];
  selectedOrder: IOrder | null = null; // Lưu đơn hàng được chọn
  readonly dialog = inject(MatDialog);

  constructor(private orderService: OrderService) {
    this.getAll();
  }

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

  // Chọn đơn hàng khi nhấp vào
  selectOrder(order: IOrder) {
    this.selectedOrder = order;
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.selectedOrder) {
      this.selectedOrder.items?.forEach((item: { quantity: number; price: number; }) => {
        total += item.quantity * item.price;
      });
    }
    return total;
  }
}
