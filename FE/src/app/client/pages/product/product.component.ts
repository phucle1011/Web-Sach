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
  searchName: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      const name = params['name'];
      if (categoryId) {
        this.loadProductsByCategory(categoryId);
      } else if (name) {
        this.searchProductByName(name); // Call search function if 'name' is in query params
      }
      else {
        this.loadProducts();
      }
    });

    this.loadCagory(); 
  }
searchProductByName(name: string): void {
  const keyword = name.trim();
  this.productService.getProduct(undefined, undefined, keyword).subscribe({
    next: (res: any) => {
      this.products = res.data;
      console.log('Search by URL param thành công:', this.products);
    },
    error: (err: any) => {
      console.error('Lỗi khi tìm kiếm sản phẩm từ URL:', err);
    }
  });
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
      this.loadProducts();
    }
  }

  searchProduct(): void {
    console.log('Search button clicked!');
    console.log('Search Term:', this.searchName);
    if (this.searchName && typeof this.searchName === 'string' && this.searchName.trim()) {
      this.productService.getProduct(undefined, undefined, this.searchName.trim()).subscribe({
        next: (res: any) => {
          this.products = res.data;
          console.log('Search Results:', res);
          if (this.products && this.products.length > 0) {
            console.log('Tìm kiếm thành công! Sản phẩm tìm thấy:', this.products);
          } else {
            console.log('Không tìm thấy sản phẩm nào phù hợp.');
          }
        },
        error: (err: any) => {
          console.error('Error searching products:', err);
        }
      });
    } else {
      this.loadProducts();
      console.log('Không có từ khóa tìm kiếm, tải lại tất cả sản phẩm.');
    }
  }
}
