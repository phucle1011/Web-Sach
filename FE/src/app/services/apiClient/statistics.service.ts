import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private _http: HttpClient) {}

  // 👉 Lấy tổng doanh thu
  getTotalRevenue(): Observable<{ totalRevenue: number }> {
    return this._http.get<{ totalRevenue: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.totalRevenue
    );
  }

  // 👉 Lấy tổng số lượng đơn hàng
  getTotalOrders(): Observable<{ totalOrders: number }> {
    return this._http.get<{ totalOrders: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.totalOrders
    );
  }

  // 👉 Lấy top 5 sản phẩm bán chạy nhất
  getTopSellingProducts(): Observable<{ data: any[] }> {
    return this._http.get<{ data: any[] }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.topSelling
    );
  }

  // 👉 Lấy tổng số người dùng
  getUserCount(): Observable<{ totalUsers: number }> {
    return this._http.get<{ totalUsers: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.userCount
    );
  }

  // 👉 Lấy tổng số loại sản phẩm
  getCategoryCount(): Observable<{ totalCategories: number }> {
    return this._http.get<{ totalCategories: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.categoryCount
    );
  }

  // 👉 Lấy tổng số sản phẩm
  getProductCount(): Observable<{ totalProducts: number }> {
    return this._http.get<{ totalProducts: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.productCount
    );
  }

  // 👉 Lấy tổng số bình luận
  getCommentCount(): Observable<{ totalComments: number }> {
    return this._http.get<{ totalComments: number }>(
      API_ENDPOINT.statistics.base + API_ENDPOINT.statistics.commentCount
    );
  }
}
