import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from 'src/app/services/apis/category.service';
import { ICategory } from 'src/app/services/apis/category.service'; 
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, FormsModule, DeleteComponent],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  list: ICategory[] = []; 
  selectedCategory: ICategory | null = null;

  readonly dialog = inject(MatDialog);

  constructor(private categoryService: CategoryService) {
    this.getAll();
  }

  getAll() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.list = res?.data ?? res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
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
      if(result) {
        this.getAll();
      }
    });
  }
}
