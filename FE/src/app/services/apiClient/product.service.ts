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

  getProduct(categoryId?: number, priceRange?: string): Observable<IProduct[]> {
    let apiUrl = API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list;
    const queryParams = [];

    if (categoryId !== undefined) { // Check if categoryId is provided
      queryParams.push(`categoryId=${categoryId}`);
    }
    if (priceRange !== undefined) { // Check if priceRange is provided
      queryParams.push(`priceRange=${priceRange}`);
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join('&')}`;
    }

    return this.get<IProduct[]>(apiUrl);
  }
  getProductByCategory(categoryId: number): Observable<any> {
    return this.get<any>(API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list + `?categoryId=${categoryId}`);
  }
  
  getProductByPriceRange(priceRange: string): Observable<any> {
    return this.getProduct(undefined, priceRange);
  }

  getProductDetail(productId: string): Observable<any> {
    return this.get<any>(`${API_ENDPOINT.productClient.base}${API_ENDPOINT.productClient.list}/${productId}`);
  }
}
