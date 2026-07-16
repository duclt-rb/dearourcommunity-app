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
    title: 'Đăng nhập',
    loadComponent: () => import('./auth/login/login'),
  },
  {
    path: 'auth/register',
    title: 'Đăng ký',
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
        title: 'Trang chủ',
        loadComponent: () => import('./profile/dashboard/dashboard'),
      },
      {
        path: 'courses',
        title: 'Khóa học của tôi',
        loadComponent: () => import('./profile/courses/courses'),
      },
      {
        path: 'certificates',
        title: 'Chứng chỉ',
        loadComponent: () => import('./profile/certificates/certificates'),
      },
      {
        path: 'edit-profile',
        title: 'Chỉnh sửa hồ sơ',
        loadComponent: () => import('./profile/edit-profile/edit-profile'),
      },
      {
        path: 'password',
        title: 'Đổi mật khẩu',
        loadComponent: () => import('./profile/password/password'),
      },
      {
        path: 'organization',
        title: 'Tổ chức',
        loadComponent: () => import('./profile/organization/organization'),
      },
    ],
  },
  {
    path: 'invitations/check',
    title: 'Kiểm tra lời mời',
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
        title: 'Quản lý gói',
        loadComponent: () => import('./system/packages/packages'),
      },
      {
        path: 'transactions',
        title: 'Quản lý giao dịch',
        loadComponent: () => import('./system/transactions/transactions'),
      },
      {
        path: 'mentors',
        title: 'Quản lý mentor',
        loadComponent: () => import('./system/mentors/mentors'),
      },
      {
        path: 'mentor-bookings',
        title: 'Quản lý lịch hẹn mentor',
        loadComponent: () => import('./system/mentor-bookings/mentor-bookings'),
      },
      {
        path: 'credits',
        title: 'Điều chỉnh credit',
        loadComponent: () => import('./system/credits/credits'),
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
        title: 'Thanh toán',
        canActivate: [checkoutGuard, accountMatchGuard],
        loadComponent: () => import('./checkout/billing/billing'),
      },
      {
        path: 'wrong-account',
        title: 'Sai tài khoản',
        loadComponent: () => import('./checkout/wrong-account/wrong-account'),
      },
      {
        // UX 15/07 — màn xác nhận sau "Tôi đã chuyển khoản" (thông báo 72h + chứng từ
        // + form hoá đơn VAT) tách khỏi billing; vào bằng ?orderId=
        path: 'bank-confirmation',
        title: 'Xác nhận chuyển khoản',
        canActivate: [bankConfirmationGuard],
        loadComponent: () => import('./checkout/bank-confirmation/bank-confirmation'),
      },
      {
        path: 'receipt',
        title: 'Hóa đơn',
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
    title: 'Bộ công cụ',
    loadComponent: () => import('./toolkit/toolkit-locked'),
  },
  {
    path: 'toolkit/:id',
    title: 'Bộ công cụ',
    canActivate: [toolkitAccessGuard],
    loadComponent: () => import('./toolkit/toolkit'),
  },
  {
    path: 'course/:courseId/lesson/:lessonId',
    title: 'Bài học',
    loadComponent: () => import('./courses/lesson-player/lesson-player'),
  },
  {
    path: '**',
    redirectTo: 'profile',
  },
];
