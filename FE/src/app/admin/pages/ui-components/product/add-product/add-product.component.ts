import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from '../../../../../services/apis/product.service';
import { CloudinaryService } from '../../../../../services/common/cloudinary.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      publicationDate: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: ['', Validators.required],
    });

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      console.log("ứdwadsd",this.categories);
       // Lưu danh sách danh mục
    });
  }
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Bắt đầu upload ảnh lên Cloudinary
      this.cloudinary.uploadImage(file).subscribe({
        next: (res: any) => {
          // Lưu URL ảnh từ Cloudinary vào `this.selectedFile`
          this.selectedFile = res.secure_url;
          console.log('✅ Đã upload ảnh:', this.selectedFile);
  
          // Sau khi upload xong, gán URL vào form
          this.productForm.patchValue({
            images: this.selectedFile
          });
        },
        error: err => {
          console.error('❌ Upload thất bại:', err);
          alert('Không thể upload ảnh.');
        }
      });
    }
  }
  
  
  
  
  onSubmit() {
    if (this.productForm.invalid) return;
  
    const productData = { ...this.productForm.value };
  
    // Kiểm tra nếu chưa có ảnh được upload
    if (!productData.images) {
      alert('Vui lòng đợi ảnh upload xong hoặc chọn ảnh trước khi gửi!');
      return;
    }
  
    // Gửi dữ liệu lên server
    this.productService.createProduct(productData).subscribe({
      next: res => {
        alert('✅ Thêm sản phẩm thành công!');
        console.log("Kết quả thêm sản phẩm:", res);
      },
      error: err => {
        console.error("❌ Lỗi khi thêm sản phẩm:", err);
      }
    });
  }
  
  
  
  
}
