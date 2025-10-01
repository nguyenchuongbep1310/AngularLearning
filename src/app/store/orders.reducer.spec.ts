import { ordersReducer, OrdersState } from './orders.reducer';
import * as OrdersActions from './orders.actions';
import { Order } from '../models/order.model';

describe('OrdersReducer', () => {
  const initialState: OrdersState = {
    items: [],
    loading: false,
    error: null
  };

  const mockOrders: Order[] = [
    {
      id: 1,
      productId: 1,
      userId: 100,
      quantity: 2,
      totalPrice: 398,
      status: 'pending',
      created: new Date('2025-09-24T10:00:00Z')
    },
    {
      id: 2,
      productId: 2,
      userId: 101,
      quantity: 1,
      totalPrice: 49,
      status: 'confirmed',
      created: new Date('2025-09-25T09:30:00Z')
    }
  ];

  it('should return initial state', () => {
    const action = { type: 'Unknown' };
    const state = ordersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  describe('Load Orders', () => {
    it('should set loading to true on loadOrders', () => {
      const action = OrdersActions.loadOrders();
      const state = ordersReducer(initialState, action);
      
      expect(state.loading).toBe(true);
      expect(state.items).toEqual([]);
      expect(state.error).toBeNull();
    });

    it('should load orders successfully', () => {
      const action = OrdersActions.loadOrdersSuccess({ orders: mockOrders });
      const state = ordersReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockOrders);
      expect(state.items.length).toBe(2);
      expect(state.error).toBeNull();
    });

    it('should handle load failure', () => {
      const error = { message: 'Failed to load' };
      const action = OrdersActions.loadOrdersFailure({ error });
      const state = ordersReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.items).toEqual([]);
      expect(state.error).toEqual(error);
    });
  });

  describe('Create Order', () => {
    it('should add new order on createOrderSuccess', () => {
      const newOrder: Order = {
        id: 3,
        productId: 3,
        userId: 102,
        quantity: 4,
        totalPrice: 60,
        status: 'pending',
        created: new Date()
      };

      const stateWithOrders = { ...initialState, items: mockOrders };
      const action = OrdersActions.createOrderSuccess({ order: newOrder });
      const state = ordersReducer(stateWithOrders, action);
      
      expect(state.items.length).toBe(3);
      expect(state.items[2]).toEqual(newOrder);
    });

    it('should add order to empty state', () => {
      const newOrder: Order = {
        id: 1,
        productId: 1,
        userId: 100,
        quantity: 2,
        totalPrice: 100,
        status: 'pending',
        created: new Date()
      };

      const action = OrdersActions.createOrderSuccess({ order: newOrder });
      const state = ordersReducer(initialState, action);
      
      expect(state.items.length).toBe(1);
      expect(state.items[0]).toEqual(newOrder);
    });
  });

  describe('Update Order', () => {
    it('should update existing order on updateOrderSuccess', () => {
      const updatedOrder: Order = {
        ...mockOrders[0],
        status: 'shipped',
        quantity: 5
      };

      const stateWithOrders = { ...initialState, items: mockOrders };
      const action = OrdersActions.updateOrderSuccess({ order: updatedOrder });
      const state = ordersReducer(stateWithOrders, action);
      
      expect(state.items.length).toBe(2);
      expect(state.items[0].status).toBe('shipped');
      expect(state.items[0].quantity).toBe(5);
      expect(state.items[1]).toEqual(mockOrders[1]);
    });

    it('should not affect other orders when updating', () => {
      const updatedOrder: Order = {
        ...mockOrders[1],
        status: 'delivered'
      };

      const stateWithOrders = { ...initialState, items: mockOrders };
      const action = OrdersActions.updateOrderSuccess({ order: updatedOrder });
      const state = ordersReducer(stateWithOrders, action);
      
      expect(state.items[0]).toEqual(mockOrders[0]);
      expect(state.items[1].status).toBe('delivered');
    });
  });

  describe('Delete Order', () => {
    it('should remove order on deleteOrderSuccess', () => {
      const stateWithOrders = { ...initialState, items: mockOrders };
      const action = OrdersActions.deleteOrderSuccess({ id: 1 });
      const state = ordersReducer(stateWithOrders, action);
      
      expect(state.items.length).toBe(1);
      expect(state.items[0].id).toBe(2);
    });

    it('should handle deleting non-existent order', () => {
      const stateWithOrders = { ...initialState, items: mockOrders };
      const action = OrdersActions.deleteOrderSuccess({ id: 999 });
      const state = ordersReducer(stateWithOrders, action);
      
      expect(state.items.length).toBe(2);
      expect(state.items).toEqual(mockOrders);
    });

    it('should handle deleting from empty state', () => {
      const action = OrdersActions.deleteOrderSuccess({ id: 1 });
      const state = ordersReducer(initialState, action);
      
      expect(state.items.length).toBe(0);
      expect(state.items).toEqual([]);
    });
  });

  describe('State immutability', () => {
    it('should not mutate original state on loadOrdersSuccess', () => {
      const action = OrdersActions.loadOrdersSuccess({ orders: mockOrders });
      const stateBefore = { ...initialState };
      ordersReducer(initialState, action);
      
      expect(initialState).toEqual(stateBefore);
    });

    it('should not mutate original state on createOrderSuccess', () => {
      const newOrder: Order = {
        id: 3,
        productId: 3,
        userId: 102,
        quantity: 1,
        totalPrice: 50,
        status: 'pending',
        created: new Date()
      };

      const stateWithOrders = { ...initialState, items: [...mockOrders] };
      const stateBefore = { ...stateWithOrders, items: [...stateWithOrders.items] };
      const action = OrdersActions.createOrderSuccess({ order: newOrder });
      ordersReducer(stateWithOrders, action);
      
      expect(stateWithOrders.items).toEqual(stateBefore.items);
    });
  });
});