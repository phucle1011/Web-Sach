import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

export interface IUser {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    address?: string;
    role?: 'Admin' | 'User';
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

    // getUserById(id: number): Observable<IUser> {
    //     return this.http.get<IUser>(`${this.baseUrl}/${id}`);
    // }

    // addUser(data: Partial<IUser>): Observable<any> {
    //     return this.http.post(this.baseUrl, data);
    // }

    // updateUser(id: number, data: Partial<IUser>): Observable<any> {
    //     return this.http.put(`${this.baseUrl}/${id}`, data);
    // }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${API_ENDPOINT.user.base}/${id}`);
    }
}
