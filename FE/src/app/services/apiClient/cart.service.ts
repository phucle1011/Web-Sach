import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';
import { ICartItem } from 'src/app/interface/cart-item.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService {
  clearCart(userId: number): Observable<any> {
    return this._http.delete(`${API_ENDPOINT.cart.base}/clear/${userId}`);
  }


  constructor(private _http: HttpClient) {
    super(_http);
  }
  private cartChangedSource = new BehaviorSubject<void>(undefined);
  cartChanged$ = this.cartChangedSource.asObservable();


  getCartByUser(userId: number): Observable<{ data: ICartItem[] }> {
    return this._http.get<{ data: ICartItem[] }>(`${API_ENDPOINT.cart.base + API_ENDPOINT.cart.list}/${userId}`);
  }


  postCart(data: { user_id: number, product_id: number, quantity: number }): Observable<any> {
    return this._http.post(
      API_ENDPOINT.cart.base + API_ENDPOINT.cart.add,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  putCart(data: ICartItem): Observable<any> {
    return this._http.put(
      API_ENDPOINT.cart.base + API_ENDPOINT.cart.edit,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  deleteCart(cartItemId: number, userId: number): Observable<any> {
    return this._http.delete(
      `${API_ENDPOINT.cart.base}${API_ENDPOINT.cart.delete}/${cartItemId}`,
      {
        body: { user_id: userId },
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  notifyCartChanged(): void {
    this.cartChangedSource.next(); // Phát tín hiệu để các component biết cart đã thay đổi
  }

}

