import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

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
    path: 'profile',
    loadComponent: () => import('./profile/profile'),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
