import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/apis/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule, 
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }

  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.formData.get('email');
  }

  get password() {
    return this.formData.get('password');
  }

  submit() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      console.log('Form đăng nhập không hợp lệ');
      return;
    }
  
    const email = this.email?.value?.toString().trim() || '';
    const password = this.password?.value?.toString().trim() || '';
  
    this.authService.login({ email, password }).subscribe({
      next: () => {
        alert('Đăng nhập thành công');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Lỗi đăng nhập:', err);
        alert('Đăng nhập thất bại. Vui lòng thử lại!');
      },
    });
  }
  
}
