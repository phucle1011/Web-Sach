import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { PaymentComponent } from '../pages/cart/payment/payment.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { CheckoutComponent } from '../pages/cart/checkout/checkout.component';
import { OrderComponent } from '../pages/order/order.component';

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
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'products/1',
        component: ProductDetailComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
    ],
  },
];

export default routesClient; 
