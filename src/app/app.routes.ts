import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { authGuard, roleGuard, guestGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  
  // Authentication routes (only for guests)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login),
    canActivate: [guestGuard],
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(c => c.Register),
    canActivate: [guestGuard],
    title: 'Register'
  },
  
  // Public routes
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes')
        .then(m => m.PRODUCTS_ROUTES)
  },
  
  // Protected routes (require authentication)
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
    canActivate: [authGuard],
    title: 'Checkout'
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./features/order/order').then(c => c.Orders),
    canActivate: [authGuard],
    title: 'Order'
  },
  
  // Admin only routes
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-dashboard').then(c => c.AdminDashboard),
    canActivate: [roleGuard],
    data: { roles: ['admin'] },
    title: 'Admin Dashboard'
  },
  
  // Unauthorized page
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/auth/unauthorized/unauthorized').then(c => c.Unauthorized),
    title: 'Unauthorized'
  },
  
  { path: '**', redirectTo: '' }
];