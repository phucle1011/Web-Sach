import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { PaymentComponent } from '../pages/cart/payment/payment.component';
import { HomeComponent } from '../pages/home/home.component';

export const routesClient: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
    ],
  },
];

export default routesClient; 
