import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
 // Mảng chứa sản phẩm trong giỏ hàng
 cartItems = [
  {
    name: 'Đắc Nhân Tâm',
    category: 'Sách Phát Triển Bản Thân',
    quantity: 1,
    price: 150000, // Giá sách Đắc Nhân Tâm
     imageUrl: 'assets/images/products/datnhantam.png'
  },
  {
    name: 'Hạt Giống Tâm Hồn',
    category: 'Sách Phát Triển Tâm Hồn',
    quantity: 1,
    price: 120000, // Giá sách Hạt Giống Tâm Hồn
    imageUrl: 'assets/images/products/hatgiongtamhon.png' 
  }
];

// Tính tổng tiền của giỏ hàng
get total() {
  return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Xóa sản phẩm khỏi giỏ hàng
removeItem(index: number) {
  this.cartItems.splice(index, 1);
}

// Tăng số lượng sản phẩm
increaseQuantity(index: number) {
  this.cartItems[index].quantity++;
}

// Giảm số lượng sản phẩm
decreaseQuantity(index: number) {
  if (this.cartItems[index].quantity > 1) {
    this.cartItems[index].quantity--;
  }
}
}
