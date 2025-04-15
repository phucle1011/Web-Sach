import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) { 
    super(_http);
  }

  getCategory(): Observable<ICategory[]> {
    return this.get<ICategory[]>(API_ENDPOINT.category.base + API_ENDPOINT.category.list);
  }
  

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.get<ICategory>(`${API_ENDPOINT.category.base}/${categoryId}`);
  }

  deleteCategory(id: number){
    return this.delete(API_ENDPOINT.category.base + '/' + id)
  }

  updateCategory(id: number, data: ICategory) {
    return this.put(API_ENDPOINT.category.base + '/' + id, data);
  }

  createCategory(data: ICategory): Observable<ICategory> {
    return this.post<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.add, data);
  }
}
