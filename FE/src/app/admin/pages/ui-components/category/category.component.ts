import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from 'src/app/services/apis/category.service';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { ICategory } from 'src/app/interface/category.interface';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, FormsModule, DeleteComponent],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  list: ICategory[] = [];
  selectedCategory: ICategory | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService) {
    this.getAll();
  }
  getAll() {
    this.categoryService.getCategories(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.list = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAll();
    }
  }

  selectCategory(category: ICategory) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }

  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: name, id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.getAll();
      }
    });
  }
}
