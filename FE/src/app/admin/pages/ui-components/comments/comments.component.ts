import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CommentService } from 'src/app/services/apis/comment.service'; // 🔹 Service bạn cần có
import { IComment } from 'src/app/interface/comment.interface'; // 🔹 Interface nếu có

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MaterialModule, RouterModule, MatCardModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: IComment[] = []; // ✅ Danh sách comment

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe({
      next: (res: any) => {
        this.comments = res?.data ?? res;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách bình luận', err);
      }
    });
  }
}
