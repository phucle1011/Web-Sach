import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export interface Book {
  title: string;
  author: string;
  price: number;
  image: string;
}

const BOOK_DATA: Book[] = [
  { title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 120000, image: 'assets/images/products/datnhantam.png' },
  { title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 95000, image: 'assets/images/products/nhakim.png' },
  { title: 'Hạt Giống Tâm Hồn', author: 'Nhiều Tác Giả', price: 80000, image: 'assets/images/products/hatgiongtamhon.png' },
  { title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: 105000, image: 'assets/images/products/tuoitre.png' }
];

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class AppProductComponent {
  dataSource = BOOK_DATA;
}
