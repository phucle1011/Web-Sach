import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, ICreateComment } from 'src/app/interface/comment.interface';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl: string = API_ENDPOINT.commentClient.base;

  constructor(private http: HttpClient) {}

  // Lấy comment theo productId
  getCommentsByProductId(productId: number): Observable<IComment[]> {
    const url = `${this.baseUrl}${API_ENDPOINT.commentClient.get}${productId}`;
    return this.http.get<IComment[]>(url);  // Return comments directly
  }

  // Tạo bình luận mới
  createComment(commentData: ICreateComment): Observable<IComment> {
    const url = `${this.baseUrl}${API_ENDPOINT.commentClient.add}`;
    return this.http.post<IComment>(url, commentData);  // Return the created comment
  }
}
