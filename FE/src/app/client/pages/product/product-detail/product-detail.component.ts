import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service'; 
import { CommonModule } from '@angular/common'; 

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
