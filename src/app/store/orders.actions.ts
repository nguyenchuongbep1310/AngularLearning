import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order.model';

export const loadOrders = createAction('[Orders] Load');
export const loadOrdersSuccess = createAction('[Orders] Load Success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[Orders] Load Failure', props<{ error: any }>());

export const createOrder = createAction('[Orders] Create', props<{ order: Order }>());
export const createOrderSuccess = createAction('[Orders] Create Success', props<{ order: Order }>());
export const createOrderFailure = createAction('[Orders] Create Failure', props<{ error: any }>());

export const updateOrder = createAction('[Orders] Update', props<{ order: Order }>());
export const updateOrderSuccess = createAction('[Orders] Update Success', props<{ order: Order }>());
export const updateOrderFailure = createAction('[Orders] Update Failure', props<{ error: any }>());

export const deleteOrder = createAction('[Orders] Delete', props<{ id: number }>());
export const deleteOrderSuccess = createAction('[Orders] Delete Success', props<{ id: number }>());
export const deleteOrderFailure = createAction('[Orders] Delete Failure', props<{ error: any }>());
