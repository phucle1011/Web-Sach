import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';

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
