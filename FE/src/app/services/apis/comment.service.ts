import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, ICreateComment } from '../../interface/comment.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ApiService {
  // createComment(commentData: ICreateComment) {
  //   throw new Error('Method not implemented.');
  // }
  // getCommentsByProductId(arg0: number) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(
    private _http: HttpClient,
  ) { 
    super(_http);
  }

  getComment(page: number = 1, limit: number = 10): Observable<any> {
    return this._http.get<any>(
      `${API_ENDPOINT.comment.base + API_ENDPOINT.comment.list}?page=${page}&limit=${limit}`
    );
  }
  
  searchComment(searchTerm: string): Observable<any> {
    return this.get<any>(`${API_ENDPOINT.comment.base}/search?searchTerm=${searchTerm}`);
  }
  
}
