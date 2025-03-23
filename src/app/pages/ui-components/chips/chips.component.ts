import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

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
  selector: 'app-chips',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent {
  dataSource = BOOK_DATA;
}
