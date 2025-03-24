import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-history-detail',
  imports: [MatCardModule, MatTableModule, RouterModule],
  templateUrl: './orders-history-detail.component.html',
  styleUrl: './orders-history-detail.component.scss'
})
export class OrdersHistoryDetailComponent {

}
