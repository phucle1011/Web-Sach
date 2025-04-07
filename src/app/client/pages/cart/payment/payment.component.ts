import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  user = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  // Mảng phương thức thanh toán
  paymentMethods = ['Credit Card', 'PayPal', 'Cash on Delivery'];

  selectedPaymentMethod = 'Credit Card'; // Mặc định là "Credit Card"

  // Hàm xử lý khi người dùng submit form thanh toán
  submitPayment() {
    // Xử lý logic thanh toán ở đây
    console.log('Payment submitted', this.user, this.selectedPaymentMethod);
    alert('Thanh toán thành công!');
  }
}
