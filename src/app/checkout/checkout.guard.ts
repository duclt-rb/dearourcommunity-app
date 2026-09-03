import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CheckoutStore } from './checkout.store';
import { PackagesService } from '../core/services/packages.service';
import { frontpageUrl } from '../core/i18n/locale';

export const checkoutGuard: CanActivateFn = async (route) => {
  const store = inject(CheckoutStore);
  const packagesService = inject(PackagesService);

  // CR-001 5.3b: link mail thanh toán booking mentor có dạng
  // /checkout/billing?packageId=..&email=..&bookingId=.. — giữ bookingId vào state để
  // gửi kèm khi tạo thanh toán (MoMo create / bank confirm). Luôn set theo query hiện
  // tại: không có bookingId thì xoá ref cũ, tránh gắn nhầm vào lượt checkout khác.
  store.setBookingRef(route.queryParams['bookingId'] ?? null);

  // CR-012 D8 — Frontpage bấm "+" ở trang gói dẫn sang đây kèm
  // `?addons=extra_course:9890` (nhiều món cách nhau bằng dấu phẩy). Chỉ là GỢI Ý:
  // store lọc lại theo danh sách bán được do server trả về trong checkout-plan.
  store.setPendingAddons(route.queryParams['addons'] ?? null);

  // Focus solely on selected package validation.
  // Assumes authentication check is already handled by authGuard.
  // CR-012 — `?packageId=` THẮNG state cũ: khách đang xem dở gói A rồi bấm "+" ở trang gói B
  // phải vào checkout gói B (nếu không, món mua lẻ của B bị loại vì không thuộc gói A).
  const packageId = route.queryParams['packageId'];
  if (store.selectedPackage() && (!packageId || store.selectedPackage()?.id === packageId)) {
    return true;
  }

  if (packageId) {
    try {
      const pkg = await packagesService.findById(packageId);
      if (pkg) {
        store.selectPackage(pkg);
        return true;
      }
    } catch (err) {
      console.error('Failed to load package by id in checkoutGuard', err);
    }
  }

  // Redirect back to package selection (app chính) if no package has been selected
  window.location.href = frontpageUrl('/packages');
  return false;
};
