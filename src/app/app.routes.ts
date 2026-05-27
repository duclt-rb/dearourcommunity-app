import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
