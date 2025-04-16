import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICategory } from 'src/app/interface/category.interface';
import { IProduct } from 'src/app/interface/product.interface';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class AppProductComponent  {
  // dataSource: IProduct[] = [];
  // products: any[] = [];
  // categories: any[] = [];
  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.productService.getAllProducts().subscribe({
  //     next: (res) => {
  //       console.log('Kết quả API sản phẩm:', res);
  //       if (res.data && Array.isArray(res.data)) {
  //         this.dataSource = res.data;
  //         this.dataSource.forEach(product => {

  //           product.categoryName = product.Category && product.Category.categoryName
  //             ? product.Category.categoryName
  //             : 'Chưa có danh mục';
  //         });
  //       } else {
  //         console.error('Dữ liệu không hợp lệ:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi lấy sản phẩm:', err);
  //     },
  //   });
  // }

  // deleteProduct(productId: number): void {
  //   if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
  //     this.productService.deleteProduct(productId).subscribe({
  //       next: () => {

  //         this.dataSource = this.dataSource.filter(product => product.productId !== productId);
  //       },
  //       error: (err) => {
  //         console.error('Lỗi khi xóa sản phẩm:', err);
  //       }
  //     });
  //   }
  // }



}
