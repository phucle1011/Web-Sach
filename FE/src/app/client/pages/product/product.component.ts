import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/apiClient/product.service';
import { CategoryService } from 'src/app/services/apiClient/Category.service';

import { IProduct } from 'src/app/interface/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICategory } from 'src/app/interface/category.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  priceRange: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.loadProductsByCategory(categoryId);
      } else {
        this.loadProducts();
      }
    });

    this.loadCagory(); 
  }

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


  getTotalPrice(): number {
    return this.products.reduce((total, product) => {
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

  loadProductsByPriceRange(priceRange: string): void {
    this.productService.getProductByPriceRange(priceRange).subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: any) => {
        console.error('Lỗi khi lọc sản phẩm theo giá:', err);
      }
    });
  }

  filterProducts(): void {
    if (this.priceRange) {
      this.loadProductsByPriceRange(this.priceRange);
    } else {
      this.loadProducts(); // Load all products if no price range is selected
    }
  }
}
