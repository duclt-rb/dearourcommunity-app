import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckoutStore } from './checkout.store';
import { PackagesService } from '../core/services/packages.service';

export const checkoutGuard: CanActivateFn = async (route) => {
  const store = inject(CheckoutStore);
  const router = inject(Router);
  const packagesService = inject(PackagesService);

  // Focus solely on selected package validation.
  // Assumes authentication check is already handled by authGuard.
  if (store.selectedPackage()) {
    return true;
  }

  // Check if query parameter has packageId
  const packageId = route.queryParams['packageId'];
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

  // Redirect back to plans selection if no package has been selected
  router.navigate(['/profile/plans']);
  return false;
};
