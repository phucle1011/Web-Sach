import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

export interface IUser {
    data: any;
    userId?: 0;
    name: string;
    email: string;
    password?: string;
    phoneNumber: string;
    avatar: string;
    address?: string;
    role?:string;
    createdAt?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${API_ENDPOINT.user.base + API_ENDPOINT.user.list}`);
    }

    getUserById(id: number): Observable<IUser> {
        return this.http.get<IUser>(`${API_ENDPOINT.user.base}/${id}`);
    }

    addUser(data: Partial<IUser>): Observable<any> {
        return this.http.post(`${API_ENDPOINT.user.base + API_ENDPOINT.user.add}`,data);
    }

    // updateUser(id: number, data: Partial<IUser>): Observable<any> {
    //     return this.http.put(`${API_ENDPOINT.user.base}/${id}`, data);
    // }
    updateUser(id: number, userData: { role: string }): Observable<IUser> {
        return this.http.put<IUser>(`${API_ENDPOINT.user.base}/${id}`, userData);
      }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${API_ENDPOINT.user.base}/${id}`);
    }
}
