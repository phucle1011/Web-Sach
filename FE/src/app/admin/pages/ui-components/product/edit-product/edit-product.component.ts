import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ProductService } from '../../../../../services/apis/product.service';
import { CloudinaryService } from '../../../../../services/common/cloudinary.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: any[] = [];
  productId!: number;
  selectedFile: File | null = null;
  previewImage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cloudinary: CloudinaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      shortDescription: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id')!;
      if (isNaN(this.productId)) {
        console.error('ID sản phẩm không hợp lệ');
        return;
      }
      this.getCategories(); 
      this.loadProduct(); 
    });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        console.log('Dữ liệu sản phẩm: ', res.data);
        if (!res.data) {
          console.error('Sản phẩm không tồn tại!');
          return;
        }
  
        const product = res.data;
        this.productForm.patchValue({
          title: product.title || '',
          author: product.author || '',
          publisher: product.publisher || '',
          price: product.price || '',
          shortDescription: product.shortDescription || '',
          categoryId: product.categoryId || '', 
          images: product.images || '', 
        });
  
     
        
      },
      error: (err) => {
        console.error('Lỗi khi lấy sản phẩm:', err);
      },
    });
  }
  

  onSubmit() {
    if (this.productForm.invalid) return;
  
    const productData = this.productForm.value;
  
    // Nếu có ảnh mới, upload lên Cloudinary trước
    if (this.selectedFile) {
      this.cloudinary.uploadImage(this.selectedFile).subscribe({
        next: (response: any) => {
          const imageUrl = response.secure_url;
          productData.images = imageUrl;
  
          this.submitUpdate(productData);
        },
        error: (err) => {
          console.error('Lỗi khi upload ảnh:', err);
          alert('Lỗi upload ảnh. Vui lòng thử lại!');
        }
      });
    } else {
      // Không chọn ảnh mới, giữ ảnh cũ (nếu có)
      productData.images = this.previewImage;
      this.submitUpdate(productData);
    }
  }
  
  submitUpdate(productData: any) {
    this.productService.updateProduct(this.productId, productData).subscribe({
      next: () => {
        alert('Cập nhật thành công!');
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        alert('Cập nhật thất bại!');
      }
    });
  }
  

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories.data;
      console.log("ứdwadsd",this.categories);
    });
  }
  
  
  
}
