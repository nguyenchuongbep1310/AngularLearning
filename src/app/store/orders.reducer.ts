import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { Order } from '../models/order.model';

export interface OrdersState {
  items: Order[];
  loading: boolean;
  error: any;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, state => ({ ...state, loading: true })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    items: orders
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    items: [...state.items, order]
  })),
  on(OrdersActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    items: state.items.map(o => (o.id === order.id ? order : o))
  })),
  on(OrdersActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(o => o.id !== id)
  }))
);
