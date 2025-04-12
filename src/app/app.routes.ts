import { Routes } from '@angular/router';
import { BlankComponent } from './admin/layouts/blank/blank.component';
import { FullComponent } from './admin/layouts/full/full.component';
import routesClient from './client/layouts/layout.components.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./client/layouts/layout.components.routes').then(m => m.routesClient),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./client/layouts/layout.components.routes').then(m => m.routesClient),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
<<<<<<< HEAD
        path: 'admin',
=======
        path: 'admin', 
>>>>>>> 3bf42d088b64ac26fb350c0169abda57d52be108
        loadChildren: () =>
          import('./admin/pages/ui-components/ui-components.routes').then((m) => m.default), 
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./admin/pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./admin/pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
