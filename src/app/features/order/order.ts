import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor } from '@angular/common';
import * as OrdersActions from '../../store/orders.actions';
import { OrdersState } from '../../store/orders.reducer';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h3>Orders</h3>
    <button (click)="reload()">Reload</button>
    <ul>
      <li *ngFor="let o of orders$ | async">
        Order #{{ o.id }} – {{ o.status }} – {{ o.totalPrice }}$
      </li>
    </ul>
  `
})
export class Orders implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private store: Store<{ orders: OrdersState }>) {
    this.orders$ = this.store.select(s => s.orders.items);
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.store.dispatch(OrdersActions.loadOrders());
  }
}
