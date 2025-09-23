import { Routes } from '@angular/router';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: Products, title: 'Products' },
  { path: ':id', component: ProductDetail, title: 'Product Detail' }
];
