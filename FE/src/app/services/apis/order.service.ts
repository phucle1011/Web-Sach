import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../../interface/order.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) { 
    super(_http);
  }

  getOrder(): Observable<IOrder[]> {
    return this.get<IOrder[]>(API_ENDPOINT.order.base + API_ENDPOINT.order.list);
  }
  

  getOrderById(orderId: number): Observable<IOrder> {
    return this.get<IOrder>(`${API_ENDPOINT.order.base}/${orderId}`);
  }

  deleteOrder(id: number){
    return this.delete(API_ENDPOINT.order.base + '/' + id);
  }

  updateOrder(id: number, data: IOrder) {
    return this.put(API_ENDPOINT.order.base + '/' + id, data);
  }

}
