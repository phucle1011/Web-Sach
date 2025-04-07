import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  // Xử lý khi người dùng gửi form
  submitForm() {
    console.log('Thông tin liên hệ:', this.contactInfo);
  }
}
