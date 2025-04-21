import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { IComment } from '../../../../interface/comment.interface';
import { MatDialog } from '@angular/material/dialog';
import { CommentService } from '../../../../services/apis/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatCardModule, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments: IComment[] = [];
  currentPage = 1;
  totalPages = 1;
  searchTerm: string = '';

  readonly dialog = inject(MatDialog);

  constructor(private commentService: CommentService) {
    this.getAllComments(this.currentPage);
  }

  getAllComments(page: number = 1): void {
    this.commentService.getComment(page, 10).subscribe({
      next: (res: any) => {
        this.comments = res.data;
        this.currentPage = res.currentPage;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.error('Error fetching comments', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.getAllComments(page);
    }
  }

  searchProducts(): void {
    if (this.searchTerm) {
      this.commentService.searchComment(this.searchTerm).subscribe({
        next: (res: any) => {
          this.comments = res.data;  // ✅ Cập nhật danh sách đang hiển thị
        },
        error: (err: any) => {
          console.error(err);
          alert('Không tìm thấy bình luận hoặc xảy ra lỗi!');
        }
      });      
    } else {
      this.getAllComments();
    }
  }
}