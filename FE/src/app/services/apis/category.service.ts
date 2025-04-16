import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { Category } from 'src/app/interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${API_ENDPOINT.category.base}`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.category.base);
}
getCategories(): Observable<any> {
    return this.http.get(API_ENDPOINT.category.adminList);
  }
}