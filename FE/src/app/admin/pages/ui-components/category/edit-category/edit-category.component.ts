import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/services/apis/category.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  categoryId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      categoryName: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(+this.categoryId).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.form.patchValue({
            categoryName: res.data.categoryName,
            status: res.data.status
          });
        } else {
          console.error('Dữ liệu không hợp lệ');
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải category:', err);
      }
    });
  }

  

  submit(): void {

    const newCategory = {
      categoryName: this.form.value.categoryName!,
      status: this.form.value.status,
    };
    if (this.form.valid) {
      console.log("Submit data:", newCategory);
      
      this.categoryService.updateCategory(+this.categoryId, newCategory).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/categories']);
  }

  get categoryName() {
    return this.form.get('categoryName');
  }

  get status() {
    return this.form.get('status');
  }
}
