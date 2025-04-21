import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/apis/contact.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private contactsSubject = new BehaviorSubject<any[]>([]); 
  contacts$: Observable<any[]> = this.contactsSubject.asObservable();  
  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts(); 
  }

  // Lấy tất cả các liên hệ
  getContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (response) => {
        const data = response && response.data ? response.data : response;
        this.contactsSubject.next(data); 
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }

  // Đánh dấu là đã trả lời
  markAsReplied(id: number): void {
    this.contactService.updateStatus(id).subscribe({
      next: () => this.getContacts(),  
      error: (err) => console.error('Lỗi khi cập nhật:', err),
    });
  }

  // Tìm kiếm liên hệ theo từ khóa
  searchContacts(): void {
    if (this.searchTerm) {
      this.contactService.searchContact(this.searchTerm).subscribe((res: any) => {
        this.contactsSubject.next(res.data); // Cập nhật danh sách tìm được
      });
    } else {
      this.getContacts();
    }
  }
}
