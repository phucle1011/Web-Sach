import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoryService } from 'src/app/services/apis/category.service';

@Component({
  selector: 'app-edit-product',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  // productForm!: FormGroup;
  // categories: any[] = []; 
  // productId!: number;  
  // selectedFile: File | null = null;
  // previewImage: string = '';

  // constructor(
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private productService: ProductService,
  //   private categoryService: CategoryService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   this.productForm = this.fb.group({
  //     title: ['', Validators.required],
  //     author: ['',Validators.required],
  //     publisher: ['',Validators.required],
  //     price: ['', Validators.required],
  //     description: ['',Validators.required],
  //     shortDescription: ['',Validators.required],
  //     publicationDate: ['',Validators.required],
  //     categoryId: ['', Validators.required], 
  //     images: ['',Validators.required]
  //   });

  //   this.route.paramMap.subscribe(params => {
  //     this.productId = +params.get('id')!;
  //     if (isNaN(this.productId)) {
  //       console.error('ID sản phẩm không hợp lệ');
  //       return;
  //     }
  //     this.getCategories();  
  //     this.loadProduct(); 
  //   });
  // }

  // loadProduct() {
  //   this.productService.getProductById(this.productId).subscribe({
  //     next: (res) => {
  //       if (!res.data) {
  //         console.error('Sản phẩm không tồn tại!');
  //         return;
  //       }
  
  //       const product = res.data;
  //       this.productForm.patchValue({
  //         title: product.title,
  //         author: product.author,
  //         publisher: product.publisher,
  //         price: product.price,
  //         description: product.description,
  //         shortDescription: product.shortDescription,
  //         publicationDate: product.publicationDate?.split('T')[0],
  //         categoryId: product.categoryId,
  //       });
  //       this.previewImage = product.images;
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi lấy sản phẩm:', err);
  //     },
  //   });
  // }

  // onSubmit() {
  //   if (this.productForm.invalid) return;

  //   const formData = new FormData();
  //   Object.entries(this.productForm.value).forEach(([key, value]) => {
  //     formData.append(key, value as string);
  //   });

  //   if (this.selectedFile) {
  //     formData.append('images', this.selectedFile);
  //   }

  //   this.productService.updateProduct(this.productId, formData).subscribe({
  //     next: () => {
  //       alert('Cập nhật thành công!');
  //       this.router.navigate(['/admin/products']);
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi cập nhật sản phẩm:', err);
  //     },
  //   });
  // }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;

  //     const reader = new FileReader();
  //     reader.onload = e => this.previewImage = reader.result as string;
  //     reader.readAsDataURL(file);
  //   }
  // }

  // getCategories() {
  //   this.categoryService.getCategories().subscribe({
  //     next: (res) => {
  //       this.categories = res;  
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi lấy danh mục:', err);
  //     },
  //   });
  // }
  // onFileSelected(event: any) {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     this.productForm.patchValue({ images: files });
  //     this.productForm.get('images')?.updateValueAndValidity();
  //   }
  // }
  
}
