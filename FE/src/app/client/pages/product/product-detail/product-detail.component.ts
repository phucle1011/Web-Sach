import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service'; 
import { CommonModule } from '@angular/common'; 
import { CommentService } from 'src/app/services/apiClient/comment.service';
import { FormsModule } from '@angular/forms';
import { IComment, ICreateComment } from 'src/app/interface/comment.interface';

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
