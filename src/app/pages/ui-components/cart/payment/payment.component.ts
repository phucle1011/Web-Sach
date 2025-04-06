import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']  // Đảm bảo sử dụng styleUrls thay vì styleUrl
})
export class PaymentComponent {
  // Mảng thông tin sản phẩm trong giỏ hàng
  cartItems = [
    { name: 'Đắc Nhân Tâm', price: 120000, quantity: 2 },
    { name: 'Nhà Giả Kim', price: 950000, quantity: 1 },
    { name: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 150000, quantity: 1 }
  ];
  
  // Tính tổng tiền sản phẩm
  get totalAmount() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Phí vận chuyển
  shippingFee = 50000;

  // Tổng tiền thanh toán
  get grandTotal() {
    return this.totalAmount + this.shippingFee;
  }

  // Dữ liệu form khách hàng (cập nhật với đủ thông tin)
  customer = {
    name: '',
    address: '',
    phone: '',
    email: ''
  };

  // Xử lý thanh toán
  processPayment() {
    console.log('Thông tin thanh toán:', this.customer);
    console.log('Tổng tiền thanh toán:', this.grandTotal);
  }
}

