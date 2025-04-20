import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service'; 
import { CommonModule } from '@angular/common'; 
import { CommentService } from 'src/app/services/apiClient/comment.service';
import { FormsModule } from '@angular/forms';
import { IComment, ICreateComment } from 'src/app/interface/comment.interface';
import { CartService } from 'src/app/services/apiClient/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,  
  imports: [CommonModule, FormsModule] 
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  data: any = null; 
  isLoading: boolean = true;

  comments: any[] = [];
  commentContent: string = '';
  // userId: number = 29;
  userId: number = Number(''); // Giả sử bạn đang hard-code userId, sau này sẽ lấy từ Auth
  
 
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private CartService: CartService,
    private router: Router,
    private cookieService: CookieService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      if (this.productId) {
        this.getProductDetail();
        this.getComments();
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

  getComments(): void {
    if (!this.productId) return;
  
    this.commentService.getCommentsByProductId(+this.productId).subscribe({
      next: (res: any) => {
        console.log('✅ Bình luận từ server:', res.data);
        this.comments = res.data;  // ✅ lấy đúng mảng
      },
      error: (err: any) => {
        console.error('❌ Lỗi khi lấy bình luận:', err);
      }
    });
  }
  submitComment(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    if (!this.commentContent.trim()) return;
  
    const comment: ICreateComment = {
      content: this.commentContent,
      productId: +this.productId!,
      userId: userId
    };
    console.log('Bình luận đang gửi:', comment);
    this.commentService.createComment(comment).subscribe({
      next: () => {
        this.commentContent = '';
        this.getComments();
      },
      error: (err: any) => console.error('Lỗi khi gửi bình luận:', err)
    });
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
    if (!this.data || !Array.isArray(this.data)) return 0;
    return this.data.reduce((total: number, product: any) => {
      return total + this.convertToNumber(product.price);
    }, 0);
  }

  formatPriceVN(value: string | number): string {
    const num = typeof value === 'string'
      ? parseFloat(value.replace(/,/g, '').replace(/\./g, '').replace(/[^\d]/g, ''))
      : value;

    return num.toLocaleString('vi-VN') + ' VND';
  }

  convertToNumber(value: string | number): number {
    if (typeof value === 'number') return value;
    return parseFloat(value.replace(/\./g, '').replace('đ', '').trim()) || 0;
  }
}
