import { Routes } from '@angular/router';

// ui
import { AppProductComponent } from './product/product.component';
import { UserComponent} from './users/user.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { CategoryComponent } from './category/category.component'
import { AddProductComponent } from './add-product/add-product.component';
import {AddUserComponent} from './add-user/add-user.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {EditUserComponent} from './edit-user/edit-user.component'

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'categories',
        component: CategoryComponent,
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
        path: 'tables',
        component: AppTablesComponent,
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
      
    ],
  },
];
