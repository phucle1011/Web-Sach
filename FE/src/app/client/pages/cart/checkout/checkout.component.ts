import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/apis/order.service';
import { CartService } from '../../../../services/apiClient/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  name: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService 
  ) { }

  ngOnInit(): void {
    const cartData = this.cookieService.get('checkout_cart');
    console.log('Giỏ hàng từ checkout_cart:', cartData);

    const cart = this.cookieService.get('cart');
    console.log('Giỏ hàng từ cart:', cart);

    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      console.log('Giỏ hàng sau khi parse:', this.cartItems);
      this.totalPrice = this.cartItems.reduce((total, item) => total + (item.total || 0), 0);
      console.log('Tổng giá trị giỏ hàng:', this.totalPrice);
    }

    const user = JSON.parse(this.cookieService.get('user') || '{}');
    this.name = user.name || '';
    this.phone = user.phone || '';
    this.email = user.email || '';
    this.address = user.address || '';
  }

  onSubmit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
  
    const checkoutCartItems = JSON.parse(this.cookieService.get('checkout_cart') || '[]');
    const cartItems = JSON.parse(this.cookieService.get('cart') || '[]');
  
    const fullCartItems = cartItems.map((cartItem: { product_id: number; quantity: number; }) => {
      const checkoutItem = checkoutCartItems.find((item: { product_id: number; }) => item.product_id === cartItem.product_id);
      if (checkoutItem) {
        return {
          product_id: cartItem.product_id,
          title: checkoutItem.title,
          price: checkoutItem.price,
          quantity: cartItem.quantity,
          total: checkoutItem.total
        };
      }
      return null;
    }).filter((item: null) => item !== null);
  
    console.log('Danh sách sản phẩm đầy đủ:', fullCartItems);
  
    const orderData = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      total_price: this.totalPrice,
      payment_method_id: 1,
      user_id: userId,
      products: cartItems.map((item: { product_id: any; quantity: any; }) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    };
  
    console.log('Dữ liệu gửi lên:', orderData);
  
    this.orderService.addOrder(orderData).subscribe({
      next: () => {
        alert('Đặt hàng thành công. Cảm ơn bạn đã ủng hộ!');
        
        this.cookieService.delete('cart'); 
        this.cookieService.delete('checkout_cart'); 
        this.cartItems = []; 
        this.cartService.notifyCartChanged();

        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Lỗi khi đặt hàng:', error);
        alert('Có lỗi xảy ra khi đặt hàng!');
      }
    });
  }
  
  formatPrice(value: number): string {
    return (value * 1000).toLocaleString('vi-VN') + ' VND';
  }

}
