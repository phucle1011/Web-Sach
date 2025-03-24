import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppFormsComponent } from './forms/forms.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AppOrdersComponent } from './orders/orders.component';
import { OrdersDeatailComponent } from './orders/orders-deatail/orders-deatail.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { OrdersHistoryDetailComponent } from './orders/orders-history-detail/orders-history-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        component: CategoryComponent,
      },
      {
        path: 'categories/add',
        component: AddCategoryComponent,
      },
      {
        path: 'categories/edit',
        component: EditCategoryComponent,
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

export default routes;
