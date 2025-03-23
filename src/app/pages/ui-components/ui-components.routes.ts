import { Routes } from '@angular/router';

// ui
import { AppChipsComponent } from './chips/chips.component';
import { UserComponent} from './users/user.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { CategoryComponent } from './category/category.component'
import { AddProductComponent } from './add-product/add-product.component';
import {AddUserComponent} from './add-user/add-user.component'

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
        component: AddUserComponent
      },
      
    ],
  },
];
