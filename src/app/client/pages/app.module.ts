import { Routes } from '@angular/router';
import { AppOrdersComponent } from 'src/app/admin/pages/ui-components/orders/orders.component';


const modules: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: AppOrdersComponent,
      },
    ],
  },
];

export default modules;
