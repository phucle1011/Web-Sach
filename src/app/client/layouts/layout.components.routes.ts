import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { PaymentComponent } from '../pages/cart/payment/payment.component';
import { AboutComponent } from '../pages/about/about.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { CheckoutComponent } from '../pages/cart/checkout/checkout.component';
import { OrderComponent } from '../pages/order/order.component';
import { ContactComponent } from '../pages/blog/contact/contact.component';
import { BlogComponent } from '../pages/blog/blog.component';

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
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
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
