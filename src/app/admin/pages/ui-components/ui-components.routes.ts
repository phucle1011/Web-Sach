import { Routes } from '@angular/router';
<<<<<<< HEAD:src/app/admin/pages/ui-components/ui-components.routes.ts
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

import { AppProductComponent } from './product/product.component';
import { UserComponent} from './users/user.component';
import { AppFormsComponent } from './forms/forms.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {EditProductComponent} from './product/edit-product/edit-product.component';
import {EditUserComponent} from './users/edit-user/edit-user.component'

import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AppOrdersComponent } from './orders/orders.component';
import { OrdersDeatailComponent } from './orders/orders-deatail/orders-deatail.component';
import { OrdersHistoryComponent } from './orders/orders-history/orders-history.component';
import { OrdersHistoryDetailComponent } from './orders/orders-history-detail/orders-history-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { ProfilesComponent } from 'src/app/admin/layouts/full/top-strip/profiles/profiles.component';
=======
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

>>>>>>> 3bf42d088b64ac26fb350c0169abda57d52be108:src/app/pages/ui-components/ui-components.routes.ts

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
<<<<<<< HEAD:src/app/admin/pages/ui-components/ui-components.routes.ts
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
        path: 'profiles',
        component: ProfilesComponent
      }
=======
        path: 'orders_history_detail',
        component: OrdersHistoryDetailComponent,
      }
      
>>>>>>> 3bf42d088b64ac26fb350c0169abda57d52be108:src/app/pages/ui-components/ui-components.routes.ts
    ],
  },
];

export default routes;
