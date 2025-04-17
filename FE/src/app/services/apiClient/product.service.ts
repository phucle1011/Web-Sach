import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { IProduct } from 'src/app/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProduct(): Observable<IProduct[]> {
    return this.get<IProduct[]>(API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list);
  }
  getProductByCategory(categoryId: number): Observable<any> {
    return this.get<any>(API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list + `?categoryId=${categoryId}`);
  }

  getProductDetail(productId: string): Observable<any> {
    return this.get<any>(`${API_ENDPOINT.productClient.base}${API_ENDPOINT.productClient.list}/${productId}`);
  }
}
