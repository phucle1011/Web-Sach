  import { Component, OnInit } from '@angular/core';
  import { MatCardModule } from '@angular/material/card';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { ProductService } from 'src/app/services/apis/product.service';
  import { Category } from 'src/app/interface/category.interface';

  export interface Book {
    productId: number;
    title: string;
    author: string;
    price: number;
    images: string;
    categoryName: string;
    Category?: Category;  
  }

  @Component({
    selector: 'app-product',
    standalone: true,
    imports: [MatCardModule, CommonModule, RouterModule],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
  })
  export class AppProductComponent implements OnInit {
    dataSource: Book[] = [];
    products: any[] = [];
    categories: any[] = [];
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
      // Lấy danh sách sản phẩm
      this.productService.getAllProducts().subscribe({
        next: (res) => {
          console.log('Kết quả API sản phẩm:', res);
    
          // Kiểm tra nếu res.data là một mảng sản phẩm
          if (res.data && Array.isArray(res.data)) {
            this.dataSource = res.data;  // Lưu trực tiếp sản phẩm vào dataSource
    
            // Duyệt qua mỗi sản phẩm và kiểm tra Category
            this.dataSource.forEach(product => {
              // Nếu Category tồn tại và có categoryName thì gán categoryName cho sản phẩm
              product.categoryName = product.Category && product.Category.categoryName
                ? product.Category.categoryName
                : 'Chưa có danh mục';
            });
          } else {
            console.error('Dữ liệu không hợp lệ:', res);
          }
        },
        error: (err) => {
          console.error('Lỗi khi lấy sản phẩm:', err);
        },
      });
    }
    
    deleteProduct(productId: number): void {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            
            this.dataSource = this.dataSource.filter(product => product.productId !== productId);
          },
          error: (err) => {
            console.error('Lỗi khi xóa sản phẩm:', err);
          }
        });
      }
    }


    
  }
