import { Routes } from '@angular/router';

import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppOrdersComponent } from './orders/orders.component';
import { CategoryComponent } from './category/category.component';
import { OrdersDeatailComponent } from './orders/orders-deatail/orders-deatail.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { OrdersHistoryDetailComponent } from './orders/orders-history-detail/orders-history-detail.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'orders',
        component: AppOrdersComponent,
      },
      {
        path: 'orders_detail',
        component: OrdersDeatailComponent,
      },
      {
        path: 'orders_history',
        component: OrdersHistoryComponent,
      },
      {
        path: 'orders_history_detail',
        component: OrdersHistoryDetailComponent,
      },
    ],
  },
];
