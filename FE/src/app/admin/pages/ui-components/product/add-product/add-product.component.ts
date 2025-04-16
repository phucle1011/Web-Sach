import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/apis/product.service';
import { CategoryService } from 'src/app/services/apis/category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CloudinaryService } from 'src/app/services/common/cloudinary.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatCardModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile!: File;
  categories: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService, 
    private cloudinary: CloudinaryService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      author: ['',Validators.required],
      publisher: ['',Validators.required],
      price: ['', Validators.required],
      description: ['',Validators.required],
      shortDescription: ['',Validators.required],
      publicationDate: ['',Validators.required],
      categoryId: ['', Validators.required],
      images: ['',Validators.required]
    });

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.cloudinary.uploadImage(file).subscribe((res: any) => {
        this.selectedFile = res.secure_url;
        console.log('Uploaded:', this.selectedFile);
      });
    }
  }
  
    onSubmit() {
      if (this.productForm.invalid) return;
    
      const formData = new FormData();
    
      Object.entries(this.productForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (this.selectedFile) {
        formData.append('images', this.selectedFile);
      } else {
        console.warn('Chưa chọn ảnh!');
      }
      this.productForm.value['images']= this.selectedFile;
    console.log(this.productForm);
    
      this.productService.createProduct(this.productForm.value).subscribe({
        next: res => {
          alert('Thêm sản phẩm thành công!');
          console.log("Thêm thành công", res);
        },
        error: err => {
          console.error("Lỗi khi thêm sản phẩm:", err);
        }
      });
    }
}
