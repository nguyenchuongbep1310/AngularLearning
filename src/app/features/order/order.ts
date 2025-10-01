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
  templateUrl: './order.html',
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
