import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../interface/product.interface'; 
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(API_ENDPOINT.productClient.base + API_ENDPOINT.productClient.list);
  }
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${API_ENDPOINT.product.base}/${productId}`);
  }
  

  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(API_ENDPOINT.product.base + '/add', formData);
  }

  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(API_ENDPOINT.product.base + `/${productId}`, formData);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.product.base + `/${productId}`);
  }
  searchProducts(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${API_ENDPOINT.productClient.base}/admin/product/search?searchTerm=${searchTerm}`);
  }
  
  
  
  
}
