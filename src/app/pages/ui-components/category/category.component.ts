import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface PeriodicElement {
  name: string;
  position: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Tình Cảm', status: 'ẩn' },
  { position: 2, name: '18+', status: 'ẩn' },
  { position: 3, name: 'Truyện', status: 'hiện' },
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
  constructor(private router: Router) {}

  goToAddCategory() {
    this.router.navigate(['/admin/categories/add']);
  }

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
}
