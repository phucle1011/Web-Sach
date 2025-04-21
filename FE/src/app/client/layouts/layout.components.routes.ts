import { Routes } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { AboutComponent } from '../pages/about/about.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductDetailComponent } from '../pages/product/product-detail/product-detail.component';
import { CheckoutComponent } from '../pages/cart/checkout/checkout.component';
import { OrderClientComponent } from '../pages/order/order.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { BlogComponent } from '../pages/blog/blog.component';
import { ForgotPasswordComponent } from '../pages/auth/forgot-password/forgot-password.component';
import { OTPPasswordComponent } from '../pages/auth/otppassword/otppassword.component';
import { ResetPasswordComponent } from '../pages/auth/reset-password/reset-password.component';
import { ProfileComponent } from '../pages/profile/profile.component';

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
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'products/:productId',
        component: ProductDetailComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'orders/list',
        component: OrderClientComponent,
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
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      { path: 'otp', 
        component: OTPPasswordComponent
      },
      { path: 'reset-password', 
        component: ResetPasswordComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ],
  },
];

export default routesClient; 
