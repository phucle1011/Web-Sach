import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICartItem } from 'src/app/interface/cart-item.interface';
import { CartService } from 'src/app/services/apiClient/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;

    if (userId) {
      this.loadCart(userId);
    } else {
      console.warn('Không tìm thấy userId trong localStorage');
    }
  }

  loadCart(userId: number): void {
    this.cartService.getCartByUser(userId).subscribe({
      next: (res) => {
        this.cartItems = res.data;
        console.log("Dữ liệu giỏ hàng:", this.cartItems);
      },
      error: (err) => {
        console.error('Lỗi tải giỏ hàng:', err);
      }
    });
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;

    if (!userId) {
      console.error('Không tìm thấy user_id trong localStorage');
      return;
    }

    this.cartService.deleteCart(item.id, userId).subscribe({
      next: () => {
        this.cartItems.splice(index, 1);
      },
      error: (err) => {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', err);
      }
    });
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    item.quantity++;
    this.updateQuantity(item);
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: ICartItem): void {
    this.cartService.putCart(item).subscribe({
      next: (res) => {
        console.log('Cập nhật giỏ hàng thành công:', res);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật giỏ hàng:', err);
      }
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total: number, item: any) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  formatPriceVN(value: string | number): string {
    const num = typeof value === 'string' ? this.convertToNumber(value) : value;
    const adjusted = num * 1000;
    return adjusted.toLocaleString('vi-VN') + ' VND';
  }

  convertToNumber(value: string | number): number {
    if (typeof value === 'number') return value;
    const cleanedValue = value.replace(/[^\d.-]/g, '');
    return parseFloat(cleanedValue) || 0;
  }

  saveCartToCookie(): void {
    const cartData = this.cartItems.map(item => ({
      productId: item.product.id,
      title: item.product.title,
      quantity: item.quantity,
      price: item.product.price,
      total: item.quantity * item.product.price
    }));
  
    const jsonData = JSON.stringify(cartData);
    this.cookieService.set('checkout_cart', jsonData);
    console.log('Đã lưu giỏ hàng vào cookie:', jsonData);
  }
  handleCheckout(): void {
    this.saveCartToCookie();
    this.router.navigate(['/checkout']);
  }
  
}
