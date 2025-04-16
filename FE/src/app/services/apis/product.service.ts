

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${ API_ENDPOINT.product.base}`);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${API_ENDPOINT.product.id(id)}`, product);
  }
  
  getProductById(productId: number | string): Observable<any> {
    const url = API_ENDPOINT.product.id(productId);  
    return this.http.get<any>(url);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINT.product.id(id)}`);
  }
  createProduct(data: FormData): Observable<any> {
    return this.http.post(API_ENDPOINT.product.add, data);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${API_ENDPOINT.product.base}/categories`);
  }
}
