import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UserService } from 'src/app/services/apis/user.service';

export interface DialogData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-delete',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(
    private UserService: UserService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  deleted() {
    console.log(this.data.id);
    this.UserService.deleteUser(this.data.id).subscribe({
      next: (res: any) => {
        this.dialogRef.close(true);
      },
    })
  }

  
}
