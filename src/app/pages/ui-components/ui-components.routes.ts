import { Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';

// ui
import { AppProductComponent } from './product/product.component';
import { UserComponent} from './users/user.component';
import { AppFormsComponent } from './forms/forms.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AppOrdersComponent } from './orders/orders.component';
import { CategoryComponent } from './category/category.component';
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
        path: 'product',
        component: AppProductComponent,
      },
      {
        path: 'users',
        component: UserComponent,
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
      }
      
    ],
  },
];

export default routes;
