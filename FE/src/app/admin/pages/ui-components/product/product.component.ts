import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interface/product.interface';
import { ProductService } from '../../../../services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class AppProductComponent implements OnInit {
  dataSource: Array<IProduct> = [];
  categories: Array<{ categoryId: number; categoryName: string }> = [];
  searchTerm: string = '';  // Biến lưu từ khóa tìm kiếm

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  // Lấy tất cả sản phẩm
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((res: any) => {
      const products: IProduct[] = res.data;
      this.dataSource = products.map((product: IProduct) => {
        const category = this.categories.find((cat) => cat.categoryId === product.categoryId);
        return {
          ...product,
          categoryName: category ? category.categoryName : 'Chưa có danh mục',
        };
      });
    });
  }

  // Lấy tất cả danh mục
  getCategories(): void {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      this.getAllProducts();
    });
  }

  // Xóa sản phẩm
  deleteProduct(productId: number): void {
    alert('Bạn chắc chắn muốn xóa ???');
    console.log('Xóa sản phẩm ID:', productId);
    this.productService.deleteProduct(productId).subscribe(() => {
      this.getAllProducts();
    });
  }

  searchProducts(): void {
    if (this.searchTerm) {
      this.productService.searchProducts(this.searchTerm).subscribe((res: any) => {
        this.dataSource = res.data; // Cập nhật danh sách sản phẩm tìm được
      });
    } else {
      this.getAllProducts();
    }
  }

  formatCurrency(value: any): string {
    const numberValue = typeof value === 'string'
      ? parseFloat(value.replace(/\D/g, '')) || 0
      : value;
  
    return new Intl.NumberFormat('vi-VN').format(numberValue) + ' VND';
  }
  
};
