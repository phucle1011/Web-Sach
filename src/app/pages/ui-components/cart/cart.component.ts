import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
   // Giả sử đây là dữ liệu mẫu trong giỏ hàng
   cartItems = [
    { 
      id: 1, 
      name: 'Đắc Nhân Tâm', 
      price: 120000, 
      quantity: 2, 
      image: 'assets/images/products/datnhantam.png' 
    },
    { 
      id: 2, 
      name: 'Nhà Giả Kim', 
      price: 950000, 
      quantity: 1, 
      image: 'assets/images/products/nhakim.png' 
    },
    { 
      id: 3, 
      name: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', 
      price: 150000, 
      quantity: 1, 
      image: 'assets/images/products/tuoitre.png' 
    }
  ];
  

  // Hàm tính tổng giá trị giỏ hàng
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Hàm tăng số lượng sản phẩm trong giỏ hàng
  increaseQuantity(item: any) {
    item.quantity++;
  }

  // Hàm giảm số lượng sản phẩm trong giỏ hàng
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }
}

