import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { OrderService } from 'src/app/services/apis/order.service';
import { IOrder } from 'src/app/interface/order.interface';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [MatCardModule, MatTableModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent  {
  orders: IOrder[] = [];  
  statusList: string[] = [
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang giao',
    'Hoàn thành',
    'Đã giao hàng thành công',
    'Đã hủy'
  ];
  list: any;

  constructor(private orderService: OrderService) {
    this.getAll();
  }


  getAll() {
    this.orderService.getOrder().subscribe({
      next: (res: any) => {
        const allOrders = res?.data ?? res;
        this.orders = allOrders.filter((order: IOrder) => String(order.status) === 'Đã giao hàng thành công');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
