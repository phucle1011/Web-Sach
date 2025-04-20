import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/apis/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  re_password: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit(resetForm: any) {
    console.log("email:", this.email);
    console.log("password:", this.password);
    console.log("re_password:", this.re_password);
  
    if (resetForm.invalid) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
  
    if (this.password !== this.re_password) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }
  
    this.authService.resetPassword(this.email, this.password).subscribe({
      next: (res) => {
        alert(res.message || 'Đặt lại mật khẩu thành công.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Lỗi khi đặt lại mật khẩu.');
      }
    });
  }
}
