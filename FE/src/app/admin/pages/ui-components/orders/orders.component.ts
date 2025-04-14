import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { IOrder } from 'src/app/interface/order.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/apis/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class AppOrdersComponent{
  list: IOrder[] = [];
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
 
}
