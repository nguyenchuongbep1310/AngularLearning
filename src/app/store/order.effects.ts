import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as OrdersActions from './orders.actions';
import { OrdersApiService } from '../services/orders-api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private service: OrdersApiService) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() =>
        this.service.getAll().pipe(
          map(orders => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ order }) =>
        this.service.create(order).pipe(
          map(o => OrdersActions.createOrderSuccess({ order: o })),
          catchError(error => of(OrdersActions.createOrderFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      mergeMap(({ order }) =>
        this.service.update(order).pipe(
          map(o => OrdersActions.updateOrderSuccess({ order: o })),
          catchError(error => of(OrdersActions.updateOrderFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      mergeMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => OrdersActions.deleteOrderSuccess({ id })),
          catchError(error => of(OrdersActions.deleteOrderFailure({ error })))
        )
      )
    )
  );
}
