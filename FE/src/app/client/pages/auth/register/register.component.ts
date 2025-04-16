import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CoreService } from 'src/app/admin/services/core.service';
import { IRegister } from 'src/app/interface/register.interface';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/apis/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService
  ) {}

  formData = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  get Name() {
    return this.formData.get('Name');
  }

  get password() {
    return this.formData.get('password');
  }

  get email() {
    return this.formData.get('email');
  }

  get f() {
    return this.formData.controls;
  }

  submit() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    const { Name, email, password } = this.formData.value!;
    const formValue: IRegister = {
      name: Name?.trim() || '',
      email: email?.trim() || '',
      password: password?.trim() || '',
    };

    if (!formValue.name || !formValue.email || !formValue.password) {
      console.error('Thông tin đăng ký không hợp lệ!');
      return;
    }

    this.authService.register(formValue).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Lỗi trong quá trình đăng ký:', err);
        alert('Đã xảy ra lỗi khi đăng ký');
      },
    });
  }
}
