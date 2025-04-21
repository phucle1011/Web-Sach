import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, ICommentResponse, ICreateComment } from 'src/app/interface/comment.interface';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl: string = API_ENDPOINT.commentClient.base;

  constructor(private http: HttpClient) { }

  getCommentsByProductId(productId: number, page: number = 1, limit: number = 5): Observable<ICommentResponse> {
    const url = `${this.baseUrl}${API_ENDPOINT.commentClient.get}${productId}?page=${page}&limit=${limit}`;
    return this.http.get<ICommentResponse>(url);
  }

  createComment(commentData: ICreateComment): Observable<IComment> {
    const url = `${this.baseUrl}${API_ENDPOINT.commentClient.add}`;
    return this.http.post<IComment>(url, commentData); 
  }
}
