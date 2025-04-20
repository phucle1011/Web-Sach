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

  getComment(): Observable<IComment[]> {
    return this.get<IComment[]>(API_ENDPOINT.comment.base + API_ENDPOINT.comment.list);
  }
  

}
