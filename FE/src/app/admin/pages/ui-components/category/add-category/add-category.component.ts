import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/apis/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private categoryService: CategoryService) {}

  onSubmit() {
  if (this.formData.invalid) {
    console.log('Form không hợp lệ');
    return;
  }

  const newCategory = {
    categoryName: this.formData.value.name!, // dùng ! để khẳng định không null
    status: this.formData.value.status === 'hiện' ? 1 : 0,
  };

  this.categoryService.addCategory(newCategory).subscribe({
    next: () => {
      alert('Thêm thành công!');
      this.router.navigate(['/admin/categories']);
    },
    error: (err) => {
      console.error('Thêm thất bại:', err);
      alert('Đã có lỗi xảy ra khi thêm');
    }
  });
}


  get name() {
    return this.formData.get('name');
  }

  get status() {
    return this.formData.get('status');
  }
}
