import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckoutStore } from './checkout.store';

export const checkoutGuard: CanActivateFn = () => {
  const store = inject(CheckoutStore);
  const router = inject(Router);

  // Focus solely on selected package validation.
  // Assumes authentication check is already handled by authGuard.
  if (store.selectedPackage()) {
    return true;
  }

  // Redirect back to plans selection if no package has been selected
  return router.createUrlTree(['/profile/plans']);
};
