import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/apis/contact.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  imports: [CommonModule ],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private contactsSubject = new BehaviorSubject<any[]>([]); 
  contacts$: Observable<any[]> = this.contactsSubject.asObservable();  

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts(); 
  }

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
  markAsReplied(id: number): void {
    this.contactService.updateStatus(id).subscribe({
      next: () => this.getContacts(),  
      error: (err) => console.error('Lỗi khi cập nhật:', err),
    });
  }
}
  

