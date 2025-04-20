import { Component } from '@angular/core';
import { AuthService } from '../../../../services/apis/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email) {
      alert('Vui lòng nhập email.');
      return;
    }

    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/otp'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        alert(err.error?.message || 'Gửi OTP thất bại.');
      }
    });
  }
}
