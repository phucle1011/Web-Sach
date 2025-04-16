import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser, UserService } from 'src/app/services/apis/user.service';

@Component({
  selector: 'app-forms',
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
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],

})
export class AddUserComponent {
  fromData = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    vaitro: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    address: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    if (this.fromData.valid) {
      console.log('Form data:', this.fromData.value);
      const newUser: IUser = {
        name: this.fromData.get('name')?.value ?? '',
        email: this.fromData.get('email')?.value ?? '',
        password: this.fromData.get('password')?.value ?? '',
        phoneNumber: this.fromData.get('phone')?.value ?? '',
        address: this.fromData.get('address')?.value ?? '',
        role: this.fromData.get('vaitro')?.value ?? '',
        avatar: '',
        data: undefined
      };

      this.userService.addUser(newUser).subscribe({
        next: (res: any) => {
          console.log('Thêm người dùng thành công', res);
          this.router.navigate(['/admin/users']);
        },
        error: (err) => {
          console.error('Lỗi khi thêm người dùng', err);
        }
      });
    }
  }
  // onSubmit() {
  //   console.warn(this.fromData.value);
  // }
  get name() {
    return this.fromData.get('name');
  }
  get email() {
    return this.fromData.get('email');
  }
  get password() {
    return this.fromData.get('password');
  }
  get vaitro() {
    return this.fromData.get('vaitro');
  }
  get phone() {
    return this.fromData.get('phone');
  }
  get address() {
    return this.fromData.get('address');
  }
}
