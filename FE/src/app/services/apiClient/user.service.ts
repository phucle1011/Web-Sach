import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { IUser } from 'src/app/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: string | number): Observable<any> {
    return this.http.get<any>(`${API_ENDPOINT.user.base}/${userId}`);
  }
  updateUser(id: number, userData: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${API_ENDPOINT.user.base}/${id}`, userData);
  }
  
  
  
}
