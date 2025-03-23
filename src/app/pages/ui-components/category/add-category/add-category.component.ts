import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  constructor(private router: Router) {}

  onSubmit() {
    console.log('Đã thêm loại sản phẩm');
    this.router.navigate(['/admin/categories']); 
  }
}
