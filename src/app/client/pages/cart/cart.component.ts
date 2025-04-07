import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
 cartItems = [
  {
    name: 'Đắc Nhân Tâm',
    category: 'Sách Phát Triển Bản Thân',
    quantity: 1,
    price: 150000, 
     imageUrl: 'assets/images/products/datnhantam.png'
  },
  {
    name: 'Hạt Giống Tâm Hồn',
    category: 'Sách Phát Triển Tâm Hồn',
    quantity: 1,
    price: 120000,
    imageUrl: 'assets/images/products/hatgiongtamhon.png' 
  }
];

get total() {
  return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

removeItem(index: number) {
  this.cartItems.splice(index, 1);
}

increaseQuantity(index: number) {
  this.cartItems[index].quantity++;
}

decreaseQuantity(index: number) {
  if (this.cartItems[index].quantity > 1) {
    this.cartItems[index].quantity--;
  }
}
}
