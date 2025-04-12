import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Tiểu thuyết', status: 'ẩn' },
  { position: 2, name: 'Khoa học', status: 'ẩn' },
  { position: 3, name: 'Kinh dị', status: 'hiện' },
  { position: 3, name: 'Khám phá', status: 'hiện' },
  { position: 3, name: 'Tư duy ngược', status: 'hiện' },
];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule, 
    FormsModule,
    CommonModule,
 
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {

  displayedColumns: string[] = ['position', 'name', 'status', 'actions'];
  dataSource = ELEMENT_DATA;

  onEdit(element: PeriodicElement) {
    console.log('Sửa:', element);
  }

  onDelete(element: PeriodicElement) {
    console.log('Xóa:', element);
  }

  changeStatus(element: PeriodicElement, event: any) {
    element.status = event.value;
  }
  confirmAndDelete(element: any) {
    if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
      this.onDelete(element);
      alert('Xóa thành công!');
    }
  }
  
  
}
