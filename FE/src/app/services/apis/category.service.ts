// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

export interface ICategory {
    name: any;
    data: ICategory;
    categoryId: number;
    categoryName: string;
    status: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${API_ENDPOINT.category.base + API_ENDPOINT.category.list}`);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${API_ENDPOINT.category.base}/${id}`);
  }

  addCategory(data: { categoryName: string }): Observable<any> {
    return this.http.post(`${API_ENDPOINT.category.base + API_ENDPOINT.category.add}`, data);
  }

  updateCategory(categoryId: number, data: { categoryName: string }): Observable<any> {
    return this.http.put(`${API_ENDPOINT.category.base}/${categoryId}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINT.category.base}/${id}`);
  }
}
