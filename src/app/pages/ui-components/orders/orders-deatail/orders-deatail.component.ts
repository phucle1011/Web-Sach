import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-deatail',
  imports: [MatTableModule, MatCardModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './orders-deatail.component.html',
  styleUrl: './orders-deatail.component.scss'
})
export class OrdersDeatailComponent {

}
