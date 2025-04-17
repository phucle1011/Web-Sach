import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const cartData = this.cookieService.get('checkout_cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.totalPrice = this.cartItems.reduce((total, item) => total + item.total, 0);
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.name = user.name || '';
    this.phone = user.phone || '';
    this.email = user.email || '';
    this.address = user.address || '';
  }

  formatPrice(value: number): string {
    return (value * 1000).toLocaleString('vi-VN') + ' VND';
  }
}
