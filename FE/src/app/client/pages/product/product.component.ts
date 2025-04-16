import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service';
import { CategoryService } from 'src/app/services/apiClient/Category.service';

import { IProduct } from 'src/app/interface/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICategory } from 'src/app/interface/category.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lắng nghe thay đổi query params để lọc theo categoryId
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.loadProductsByCategory(categoryId);
      } else {
        this.loadProducts(); // Nếu không có categoryId thì load tất cả sản phẩm
      }
    });

    this.loadCagory(); // Luôn luôn tải danh mục
  }

  // Hàm tải tất cả sản phẩm
  loadProducts(): void {
    this.productService.getProduct().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: any) => {
        console.error('Lỗi tải sản phẩm:', err);
      }
    });
  }

  // Hàm tải sản phẩm theo danh mục
  loadProductsByCategory(categoryId: number): void {
    this.productService.getProductByCategory(categoryId).subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: any) => {
        console.error('Lỗi khi lọc sản phẩm theo danh mục:', err);
      }
    });
  }

  // Hàm tải danh mục
  loadCagory(): void {
    this.categoryService.getcategory().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err: any) => {
        console.error('Lỗi tải danh mục:', err);
      }
    });
  }

  // Hàm tính tổng giá trị sản phẩm
  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
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
