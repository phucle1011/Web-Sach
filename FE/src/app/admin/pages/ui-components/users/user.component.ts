import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUser, UserService } from 'src/app/services/apis/user.service';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog } from '@angular/material/dialog';


export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  dataSource: IUser[] = [];
  readonly dialog = inject(MatDialog);
  constructor(private userService: UserService) {
    this.ngOnInit();
  }
  

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: name, id: id },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        console.log('Reloading users after deletion');
        this.ngOnInit();
      }
    });
  }
}