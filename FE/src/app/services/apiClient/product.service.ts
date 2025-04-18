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

  getProduct(categoryId?: number, priceRange?: string, name?: string): Observable<IProduct[]> {
    let apiUrl = API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list;
    const queryParams = [];

    if (categoryId !== undefined) {
      queryParams.push(`categoryId=${categoryId}`);
    }
    if (priceRange !== undefined) {
      queryParams.push(`priceRange=${priceRange}`);
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join('&')}`;
    }
    if (name !== undefined && name !== '') {
      queryParams.push(`name=${name}`);
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

  searchProductsByName(name: string): Observable<any> {
    return this.getProduct(undefined, undefined, name);
  }

  getProductDetail(productId: string): Observable<any> {
    return this.get<any>(`${API_ENDPOINT.productClient.base}${API_ENDPOINT.productClient.list}/${productId}`);
  }
}
