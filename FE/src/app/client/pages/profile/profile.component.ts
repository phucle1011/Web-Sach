import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/apiClient/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
 
})
export class ProfileComponent implements OnInit {
  user: any = {};
  isEditing = false;
  updatedPhone = '';
  updatedAddress = '';
  updatedEmail = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const userInfo = JSON.parse(userStorage);
      const userId = userInfo.userId;

      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.updatedPhone = data.phoneNumber || '';
          this.updatedAddress = data.address || '';
          this.updatedEmail = data.email || '';  
        },
        error: (err) => console.error('Lỗi tải người dùng:', err),
      });
    }
  }

  saveChanges() {
    const updateData = {
      phoneNumber: this.updatedPhone,
      address: this.updatedAddress,
      email: this.updatedEmail  
    };

    this.userService.updateUser(this.user.userId, updateData).subscribe({
      next: () => {
        this.user.phoneNumber = this.updatedPhone;
        this.user.address = this.updatedAddress;
        this.user.email = this.updatedEmail; 
        this.isEditing = false;
      },
      error: (err) => console.error('Lỗi cập nhật:', err)
    });
  }
}
