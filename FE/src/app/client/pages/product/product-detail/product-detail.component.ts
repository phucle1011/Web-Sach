import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service'; 
import { CommonModule } from '@angular/common';  // Đảm bảo import CommonModule

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,  // Đảm bảo sử dụng standalone nếu component không được khai báo trong module chính
  imports: [CommonModule] // Đảm bảo đã thêm CommonModule để sử dụng các chỉ thị cơ bản như ngIf, ngFor
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  data: any = null; // Thay productDetail thành data
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

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
          // Kiểm tra cấu trúc dữ liệu API và gán giá trị đúng
          this.data = response.data || response; // Gán dữ liệu vào biến data
          console.log("Dữ liệu sản phẩm: ", this.data);  // Kiểm tra dữ liệu
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching product details', error);
          this.isLoading = false;
        }
      );
    }
  }

  // Hàm tính tổng giá trị sản phẩm nếu có một danh sách sản phẩm
  getTotalPrice(): number {
    if (!this.data || !Array.isArray(this.data)) return 0;
    return this.data.reduce((total: number, product: any) => {
      return total + this.convertToNumber(product.price);
    }, 0);
  }

  // Hàm định dạng giá theo chuẩn Việt Nam (dấu . và thêm 'VND')
  formatPriceVN(value: string | number): string {
    const num = typeof value === 'string'
      ? parseFloat(value.replace(/,/g, '').replace(/\./g, '').replace(/[^\d]/g, ''))
      : value;

    return num.toLocaleString('vi-VN') + ' VND';
  }

  // Hàm chuyển giá từ chuỗi -> số (nếu cần)
  convertToNumber(value: string | number): number {
    if (typeof value === 'number') return value;
    return parseFloat(value.replace(/\./g, '').replace('đ', '').trim()) || 0;
  }
}
