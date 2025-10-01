import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart').then(c => c.Cart),
    canActivate: [authGuard],
    title: 'Cart'
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout').then(c => c.Checkout),
    title: 'Checkout'
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./features/order/order').then(c => c.Orders),
    title: 'Order'
  },
  { path: '**', redirectTo: '' }
];
