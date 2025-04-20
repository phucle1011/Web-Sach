import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ICategory, IPaginatedCategoryResponse } from 'src/app/interface/category.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(page: number = 1, limit: number = 10): Observable<IPaginatedCategoryResponse> {
    const url = `${API_ENDPOINT.category.base + API_ENDPOINT.category.list}?page=${page}&limit=${limit}`;
    return this.http.get<IPaginatedCategoryResponse>(url);
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
