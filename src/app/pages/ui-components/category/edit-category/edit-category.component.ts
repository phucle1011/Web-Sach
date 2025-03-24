import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule,MatCardModule,RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  category = {
    name: 'Truyện',
    status: 'Hiện'
  };

  onSave(): void {
    console.log('Lưu dữ liệu:', this.category);
  }

  onCancel(): void {
    console.log('Hủy chỉnh sửa');
  }
  
}
