import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { IComment } from '../../../../interface/comment.interface';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../../../../services/apis/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments', 
  imports: [MatCardModule, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {

  comments: IComment[] = []; 
  readonly dialog = inject(MatDialog);
  
  constructor(private commentService: CommentService) {
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentService.getComment().subscribe({
      next: (res: any) => {
        this.comments = res?.data ?? res;
        console.log(this.comments);
      },
      error: (err) => {
        console.error('Error fetching comments', err);
      }
    });
  }
}
