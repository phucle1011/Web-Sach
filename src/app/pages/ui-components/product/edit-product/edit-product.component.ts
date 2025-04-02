import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],

})
export class EditProductComponent {
  fromData = new FormGroup({
    tensanpham: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    nhasanxuat: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    gia: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    soluong: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    danhmuc: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    tacgia: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    images: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    motangan: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  });
  onSubmit() {
    console.warn(this.fromData.value);
  }

  get tensanpham() {
    return this.fromData.get('tensanpham');
  }

  get nhasanxuat() {
    return this.fromData.get('nhasanxuat');
  }
  get gia() {
    return this.fromData.get('gia');
  }
  get soluong() {
    return this.fromData.get('soluong');
  }
  get danhmuc() {
    return this.fromData.get('danhmuc');
  }
  get tacgia() {
    return this.fromData.get('tacgia');
  }
  get images() {
    return this.fromData.get('images');
  }
  get motangan() {
    return this.fromData.get('motangan');
  }
}
