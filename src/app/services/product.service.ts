import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Phone', price: 199, created: new Date(2025, 8, 1) },
    { id: 2, name: 'Headphones', price: 49, created: new Date(2025, 7, 15) },
    { id: 3, name: 'Book', price: 15, created: new Date(2025, 6, 10) },
    { id: 4, name: 'Shoes', price: 120, created: new Date(2025, 8, 18) },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
