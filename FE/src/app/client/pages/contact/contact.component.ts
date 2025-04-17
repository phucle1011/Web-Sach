import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/apis/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo = {
    address: 'Toà nhà FPT Polytechnic, phường Thường Thạnh, quận Cái Răng, TP Cần Thơ;',
    email: 'phuc628780gmail.com',
    phone: '+ 0379 169 731'
  };

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    console.log('Form đã được khởi tạo:', this.contactForm);
  }

  onSubmit(): void {
    console.log('Form hợp lệ:', this.contactForm.valid);

    if (this.contactForm.valid) {
      const data = this.contactForm.value;
      console.log('📤 Dữ liệu form gửi đi:', data); 


      this.contactService.sendContactEmail(data).subscribe({
        next: () => {
          alert('🎉 Gửi liên hệ thành công!');
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Lỗi gửi email:', err);
          alert('Bạn Đã Vượt Quá Giới Hạn Gửi Email!');
        }
      });
    } else {
      console.warn('⚠️ Form không hợp lệ');
    }
  }
}
