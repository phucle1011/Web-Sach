import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../../interface/comment.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ApiService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  // Lấy danh sách tất cả bình luận
  getComments(): Observable<IComment[]> {
    return this.get<IComment[]>(API_ENDPOINT.comment.base + API_ENDPOINT.comment.list);
  }

  // Lấy chi tiết bình luận theo ID
  getCommentById(commentId: number): Observable<IComment> {
    return this.get<IComment>(`${API_ENDPOINT.comment.base}/${commentId}`);
  }

  // Thêm mới bình luận
  createComment(data: IComment): Observable<IComment> {
    return this.post<IComment>(API_ENDPOINT.comment.base + API_ENDPOINT.comment.add, data);
  }

  // Cập nhật bình luận
  updateComment(id: number, data: IComment): Observable<IComment> {
    return this.put<IComment>(`${API_ENDPOINT.comment.base}/${id}`, data);
  }

  // Xoá bình luận
  deleteComment(id: number): Observable<any> {
    return this.delete(`${API_ENDPOINT.comment.base}/${id}`);
  }
}
