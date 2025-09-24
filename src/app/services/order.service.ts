import { Injectable } from '@angular/core';
import { ProductOrder } from '../models/product-order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: ProductOrder[] = [];

  submitOrder(order: ProductOrder) {
    this.orders.push(order);
    console.log('✅ Order saved in memory:', order);
    return true;
  }

  getOrders() {
    return this.orders;
  }
}
