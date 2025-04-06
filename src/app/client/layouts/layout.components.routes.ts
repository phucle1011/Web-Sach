import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { CartComponent } from 'src/app/pages/ui-components/cart/cart.component';


export const routesClient: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
    
    ],
  },
];

export default routesClient;
