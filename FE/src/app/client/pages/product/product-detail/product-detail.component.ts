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

  currentPage = 1;
  totalPages = 1;
  commentsPerPage = 5;


  comments: any[] = [];
  commentContent: string = '';
  userId: number = Number('');


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commentService: CommentService
  ) { }

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

    this.commentService.getCommentsByProductId(+this.productId, this.currentPage, this.commentsPerPage)
      .subscribe({
        next: (res: any) => {
          console.log('Bình luận từ server:', res);
          // Kiểm tra cấu trúc của response
          this.comments = res.comments || [];
          this.totalPages = res.totalPages || 1;
        },
        error: (err: any) => console.error('Lỗi khi lấy bình luận:', err)
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
      next: (res: any) => {
        console.log('Bình luận đã gửi:', res);
        this.commentContent = '';
        this.getComments();
      },
      error: (err: any) => console.error('Lỗi khi gửi bình luận:', err)
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getComments();
    }
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

  formatCurrency(value: number | string): string {
    const numericValue = typeof value === 'string'
      ? parseFloat(value.replace(/\./g, '').replace('đ', '').replace(/[^0-9]/g, ''))
      : value;
  
    return new Intl.NumberFormat('vi-VN').format(numericValue) + ' VND';
  }
  
}
