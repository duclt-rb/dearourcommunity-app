import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { checkoutGuard } from './checkout/checkout.guard';
import { receiptGuard } from './checkout/receipt.guard';

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
        path: 'plans',
        loadComponent: () => import('./profile/plans/plans'),
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
    path: 'system',
    loadComponent: () => import('./system/system'),
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'billing',
        pathMatch: 'full',
      },
      {
        path: 'billing',
        canActivate: [checkoutGuard],
        loadComponent: () => import('./checkout/billing/billing'),
      },
      {
        path: 'receipt',
        canActivate: [receiptGuard],
        loadComponent: () => import('./checkout/receipt/receipt'),
      },
    ],
  },
  {
    path: 'course/:courseId/lesson/:lessonId',
    loadComponent: () => import('./courses/lesson-player/lesson-player'),
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];
