import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/apiClient/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  data: any = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private CartService: CartService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      if (this.productId) {
        this.getProductDetail();
      }
    });
  }

  getProductDetail(): void {
    if (this.productId) {
      this.productService.getProductDetail(this.productId).subscribe(
        (response: any) => {
          this.data = response.data || response;
          console.log("Dữ liệu sản phẩm: ", this.data);
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching product details', error);
          this.isLoading = false;
        }
      );
    }
  }

  addToCart(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user_id = user.userId;

    if (!user_id) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }

    const product_id = Number(this.productId);
    const quantity = 1;

    console.log('product_id:', product_id);

    let cart = JSON.parse(this.cookieService.get('cart') || '[]');

    const existingItemIndex = cart.findIndex((item: { product_id: number; }) => item.product_id === product_id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ product_id, quantity });
    }

    this.cookieService.set('cart', JSON.stringify(cart));

    this.CartService.postCart({ user_id, product_id, quantity }).subscribe({
      next: (res) => {
        console.log('Đã thêm vào giỏ hàng:', res);
        alert('Thêm sản phẩm vào giỏ hàng thành công!');

        let checkoutCart = JSON.parse(this.cookieService.get('checkout_cart') || '[]');

        const checkoutItemIndex = checkoutCart.findIndex((item: { product_id: number; }) => item.product_id === product_id);
        if (checkoutItemIndex === -1) {
          checkoutCart.push({ product_id, quantity });
        }

        this.cookieService.set('checkout_cart', JSON.stringify(checkoutCart));
      },
      error: (err) => {
        console.error('Lỗi khi thêm vào giỏ hàng:', err);
        alert('Thêm giỏ hàng thất bại');
      }
    });
  }


  getCartFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCartToLocalStorage(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getTotalPrice(): number {
    const cart = this.getCartFromLocalStorage();
    return cart.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  formatPriceVN(value: string | number): string {
    const num = typeof value === 'string' ? this.convertToNumber(value) : value;
    const adjusted = num * 1000;
    return adjusted.toLocaleString('vi-VN') + ' VND';
  }

  convertToNumber(value: string | number): number {
    if (typeof value === 'number') return value;
    return parseFloat(value.replace(/\./g, '').replace('đ', '').trim()) || 0;
  }
}
