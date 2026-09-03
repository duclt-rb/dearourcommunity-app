import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { systemGuard } from './core/system.guard';
import { checkoutGuard } from './checkout/checkout.guard';
import { accountMatchGuard } from './checkout/account-match.guard';
import { receiptGuard } from './checkout/receipt.guard';
import { bankConfirmationGuard } from './checkout/bank-confirmation/bank-confirmation.guard';
import { toolkitAccessGuard, toolkitCatalogRedirectGuard } from './toolkit/toolkit-access.guard';

export const routes: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    title: 'titles.login',
    loadComponent: () => import('./auth/login/login'),
  },
  {
    path: 'auth/register',
    title: 'titles.register',
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
        title: 'titles.dashboard',
        loadComponent: () => import('./profile/dashboard/dashboard'),
      },
      {
        path: 'courses',
        title: 'titles.myCourses',
        loadComponent: () => import('./profile/courses/courses'),
      },
      {
        path: 'certificates',
        title: 'titles.certificates',
        loadComponent: () => import('./profile/certificates/certificates'),
      },
      {
        path: 'edit-profile',
        title: 'titles.editProfile',
        loadComponent: () => import('./profile/edit-profile/edit-profile'),
      },
      {
        path: 'password',
        title: 'titles.changePassword',
        loadComponent: () => import('./profile/password/password'),
      },
      {
        path: 'organization',
        title: 'titles.organization',
        loadComponent: () => import('./profile/organization/organization'),
      },
    ],
  },
  {
    path: 'invitations/check',
    title: 'titles.invitationCheck',
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
        title: 'titles.systemPackages',
        loadComponent: () => import('./system/packages/packages'),
      },
      {
        path: 'transactions',
        title: 'titles.systemTransactions',
        loadComponent: () => import('./system/transactions/transactions'),
      },
      {
        path: 'mentors',
        title: 'titles.systemMentors',
        loadComponent: () => import('./system/mentors/mentors'),
      },
      {
        path: 'mentor-bookings',
        title: 'titles.systemMentorBookings',
        loadComponent: () => import('./system/mentor-bookings/mentor-bookings'),
      },
      {
        path: 'credits',
        title: 'titles.systemCredits',
        loadComponent: () => import('./system/credits/credits'),
      },
      {
        // CR-012 — giá bán lẻ khoá / Quick Scan / Toolkit tại checkout
        path: 'addon-prices',
        title: 'titles.systemAddonPrices',
        loadComponent: () => import('./system/addon-prices/addon-prices'),
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
        title: 'titles.checkout',
        canActivate: [checkoutGuard, accountMatchGuard],
        loadComponent: () => import('./checkout/billing/billing'),
      },
      {
        path: 'wrong-account',
        title: 'titles.wrongAccount',
        loadComponent: () => import('./checkout/wrong-account/wrong-account'),
      },
      {
        // UX 15/07 — màn xác nhận sau "Tôi đã chuyển khoản" (thông báo 72h + chứng từ
        // + form hoá đơn VAT) tách khỏi billing; vào bằng ?orderId=
        path: 'bank-confirmation',
        title: 'titles.bankConfirmation',
        canActivate: [bankConfirmationGuard],
        loadComponent: () => import('./checkout/bank-confirmation/bank-confirmation'),
      },
      {
        path: 'receipt',
        title: 'titles.receipt',
        canActivate: [receiptGuard],
        loadComponent: () => import('./checkout/receipt/receipt'),
      },
    ],
  },
  {
    // CR-003: app không còn trang danh sách toolkit — catalog nằm ở Frontpage.
    path: 'toolkit',
    pathMatch: 'full',
    canActivate: [toolkitCatalogRedirectGuard],
    children: [],
  },
  {
    path: 'toolkit/locked',
    title: 'titles.toolkit',
    loadComponent: () => import('./toolkit/toolkit-locked'),
  },
  {
    path: 'toolkit/:id',
    title: 'titles.toolkit',
    canActivate: [toolkitAccessGuard],
    loadComponent: () => import('./toolkit/toolkit'),
  },
  {
    path: 'course/:courseId/lesson/:lessonId',
    title: 'titles.lesson',
    loadComponent: () => import('./courses/lesson-player/lesson-player'),
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];
