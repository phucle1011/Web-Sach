import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  imports: [MatCardModule, MatTableModule, RouterModule],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss'
})
export class OrdersHistoryComponent {

}
