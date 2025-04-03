import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, MatCardModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  category = {
    name: 'Truyện',
    status: 'Hiện'
  };

  formData = new FormGroup({
    name: new FormControl(this.category.name, [
      Validators.required,
    ]),
    status: new FormControl(this.category.status, [
      Validators.required,
    ]),
  });

  constructor(private router: Router) {}

  onSubmit() {
    // Kiểm tra tính hợp lệ của form
    if (this.formData.invalid) {
      console.log('Form không hợp lệ');
      return;
    }

    // Cập nhật category và thực hiện lưu dữ liệu
    console.log('Form dữ liệu:', this.formData.value);

    // Cập nhật thông tin category khi form hợp lệ
    this.category = {
      name: this.formData.value.name ?? '',
      status: this.formData.value.status ?? ''
    };

    // Sau khi lưu thành công, chuyển về trang danh mục
    console.log('Lưu thành công, Category:', this.category);

    // Chuyển hướng về trang danh mục
    this.router.navigate(['/admin/categories']);
  }

  // Các getter cho form controls
  get name() {
    return this.formData.get('name');
  }

  get status() {
    return this.formData.get('status');
  }

  onCancel(): void {
    console.log('Hủy chỉnh sửa');
    // Chuyển hướng về trang danh mục khi hủy
    this.router.navigate(['/admin/categories']);
  }
}
