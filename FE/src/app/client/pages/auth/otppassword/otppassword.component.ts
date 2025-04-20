import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/apis/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otppassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './otppassword.component.html',
  styleUrls: ['./otppassword.component.scss']
})
export class OTPPasswordComponent {
  otp: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Lấy email từ query param
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    console.log('OTP:', this.otp);
    console.log('Email:', this.email);
    
    this.authService.verifyOtp(this.email, this.otp).subscribe({
        next: (res) => {
            alert(res.message);
            this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
        },
        error: (err) => {
            alert(err.error?.message || 'Xác nhận OTP thất bại.');
        }
    });
}

}
