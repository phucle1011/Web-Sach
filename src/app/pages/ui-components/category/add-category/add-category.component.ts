import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  formData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    status: new FormControl('', [
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

    console.log('Form dữ liệu:', this.formData.value);

    this.router.navigate(['/admin/categories']);
  }

  // Các getter cho form controls
  get name() {
    return this.formData.get('name');
  }

  get status() {
    return this.formData.get('status');
  }
}
