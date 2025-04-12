import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { PaymentComponent } from '../pages/cart/payment/payment.component';
import { AboutComponent } from '../pages/about/about.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';

export const routesClient: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

export default routesClient; 
