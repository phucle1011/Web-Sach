import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

const USER_DATA: User[] = [
  { name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0123456789', avatar: 'assets/images/products/product-2.png' },
  { name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0987654321', avatar: 'assets/images/products/product-2.png' },
  { name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0912345678', avatar: 'assets/images/products/product-2.png' },
  { name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0908765432', avatar: 'assets/images/products/product-2.png' }
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  dataSource = USER_DATA;
}