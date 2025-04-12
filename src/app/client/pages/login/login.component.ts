import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor( private router: Router) {}

  form = new FormGroup({
    Username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }
  formData = new FormGroup({
    Username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get Username() {
    return this.formData.get('Username');
  }

  get password() {
    return this.formData.get('password');
  }

  submit() {
    if (this.form.invalid) {
      console.log('Form đăng nhập không hợp lệ');
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dữ liệu đăng nhập:', this.form.value);
    this.router.navigate(['/']);
    // console.log(this.form.value);
  }
}
