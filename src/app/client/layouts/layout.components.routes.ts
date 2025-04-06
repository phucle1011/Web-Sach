import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const routesClient: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HeaderComponent,
      },
      {
        path: '',
        component: FooterComponent,
      }
    ],
  },
];

export default routesClient; 
