import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

import { AppProductComponent } from './product/product.component';
import { UserComponent} from './users/user.component';
import { AppFormsComponent } from './forms/forms.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import {AddUserComponent} from './add-user/add-user.component';
import {EditProductComponent} from './product/edit-product/edit-product.component';
import {EditUserComponent} from './edit-user/edit-user.component'

import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AppOrdersComponent } from './orders/orders.component';
import { OrdersDeatailComponent } from './orders/orders-deatail/orders-deatail.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { OrdersHistoryDetailComponent } from './orders/orders-history-detail/orders-history-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { EditComponent } from './comments/edit/edit.component';

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
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'edit-product',
        component: EditProductComponent,
      },
      {
        path: 'edit-user',
        component: EditUserComponent,
      },
      {
        path: 'comments',
        component: CommentsComponent,
      },
      {
        path: 'edit-comments',
        component: EditComponent,
      }
    ],
  },
];

export default routes;
