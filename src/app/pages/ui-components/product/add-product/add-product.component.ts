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
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  fromData = new FormGroup({
    tensach: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    tacgia: new FormControl('', [
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
    publisher: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    images: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    publicationDate: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    description: new FormControl('', [
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

  get tensach() {
    return this.fromData.get('tensach');
  }

  get tacgia() {
    return this.fromData.get('tacgia');
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
  get publisher() {
    return this.fromData.get('publisher');
  }
  get images() {
    return this.fromData.get('images');
  }
  get publicationDate() {
    return this.fromData.get('publicationDate');
  }
  get description() {
    return this.fromData.get('description');
  }
  get motangan() {
    return this.fromData.get('motangan');
  }
}
