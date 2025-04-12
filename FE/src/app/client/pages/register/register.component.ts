import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CoreService } from 'src/app/admin/services/core.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router) { }

  form = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  formData = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      console.log('Form đăng nhập không hợp lệ');
      this.form.markAllAsTouched();
      return;
    }

    console.log('Dữ liệu đăng nhập:', this.form.value);
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
}
