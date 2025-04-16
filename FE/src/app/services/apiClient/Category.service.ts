import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { IProduct } from 'src/app/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  // Lấy danh sách tất cả bình luận
  getcategory(): Observable<IProduct[]> {
    return this.get<IProduct[]>(API_ENDPOINT.category.base + API_ENDPOINT.category.list);
  }

  
}