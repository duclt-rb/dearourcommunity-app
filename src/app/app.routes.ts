import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { systemGuard } from './core/system.guard';
import { checkoutGuard } from './checkout/checkout.guard';
import { accountMatchGuard } from './checkout/account-match.guard';
import { receiptGuard } from './checkout/receipt.guard';

export const routes: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
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
      {
        path: 'organization',
        loadComponent: () => import('./profile/organization/organization'),
      },
    ],
  },
  {
    path: 'invitations/check',
    loadComponent: () => import('./invitations/check/check'),
  },
  {
    path: 'system',
    loadComponent: () => import('./system/system'),
    canActivate: [systemGuard],
    children: [
      {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full',
      },
      {
        path: 'packages',
        loadComponent: () => import('./system/packages/packages'),
      },
      {
        path: 'transactions',
        loadComponent: () => import('./system/transactions/transactions'),
      },
      {
        path: 'mentors',
        loadComponent: () => import('./system/mentors/mentors'),
      },
      {
        path: 'mentor-bookings',
        loadComponent: () => import('./system/mentor-bookings/mentor-bookings'),
      },
    ],
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
        canActivate: [checkoutGuard, accountMatchGuard],
        loadComponent: () => import('./checkout/billing/billing'),
      },
      {
        path: 'wrong-account',
        loadComponent: () => import('./checkout/wrong-account/wrong-account'),
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
