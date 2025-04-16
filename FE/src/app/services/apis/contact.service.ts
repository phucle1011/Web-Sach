import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Hàm gửi thông tin liên hệ tới backend
  sendContactEmail(contactData: any): Observable<any> {
    return this.http.post(`${API_ENDPOINT.contact.base}`, {
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
    });
  }
   // Hàm lấy danh sách liên hệ
   getAllContacts(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.contact.list);  
  }
  updateStatus(id: number): Observable<any> {
    const url = `${API_ENDPOINT.contact.base}/${id}/status`;
    return this.http.put(url, {}); 
  }
  
  
  
}