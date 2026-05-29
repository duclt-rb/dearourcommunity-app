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
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./profile/dashboard/dashboard'),
      },
      {
        path: 'courses',
        loadComponent: () => import('./profile/courses/courses'),
      },
      {
        path: 'certificates',
        loadComponent: () => import('./profile/certificates/certificates'),
      },
      {
        path: 'edit-profile',
        loadComponent: () => import('./profile/edit-profile/edit-profile'),
      },
      {
        path: 'password',
        loadComponent: () => import('./profile/password/password'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];
