import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { CartComponent } from 'src/app/pages/ui-components/cart/cart.component';
import { PaymentComponent } from 'src/app/pages/ui-components/cart/payment/payment.component';
import { ContactComponent } from 'src/app/pages/ui-components/contact/contact.component';


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
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

export default routesClient;
