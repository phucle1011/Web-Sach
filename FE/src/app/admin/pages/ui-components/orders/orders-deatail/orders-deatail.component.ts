import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IOrder, IOrderItem } from 'src/app/interface/order.interface';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/apis/order.service';
import { CommonModule } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { DecimalPipe } from '@angular/common'; 

@Component({
  selector: 'app-orders-deatail',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './orders-deatail.component.html',
  styleUrls: ['./orders-deatail.component.scss'],
  providers: [DecimalPipe] 
})
export class OrdersDeatailComponent {
  statusList: string[] = [
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang giao',
    'Hoàn thành',
    'Đã giao hàng thành công',
    'Đã hủy'
  ];

  selectedOrder: IOrder | null = null;
  readonly dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private decimalPipe = inject(DecimalPipe);

  constructor() {
    registerLocaleData(localeVi);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getOrderById(+id);
      }
    });
  }

  getOrderById(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        
        if (res?.data) {
          this.selectedOrder = res.data;
          console.log('Đơn hàng:', this.selectedOrder);  
        } else {
          console.error('Không tìm thấy đơn hàng');
        }
      },
      error: (err) => {
        console.error('Lỗi khi lấy đơn hàng:', err);
      }
    });
  }

  convertToNumber(value: any): number {
    const cleanedValue = String(value)
      .replace(/\./g, '') 
      .replace(',', '.')  
      .replace('đ', '')
      .trim();
    return parseFloat(cleanedValue) || 0;
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.selectedOrder?.orderDetails) { 
      this.selectedOrder.orderDetails.forEach((item: IOrderItem) => {
        total += item.quantity * this.convertToNumber(item.product.price);
      });
    }
    return total;
  }
  formatCurrency(value: number): string {
    return value.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  }
}
