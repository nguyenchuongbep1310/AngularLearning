import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { OrdersEffects } from './order.effects';
import { OrdersApiService } from '../services/orders-api.service';
import * as OrdersActions from './orders.actions';
import { Order } from '../models/order.model';
import { cold, hot } from 'jasmine-marbles';

describe('OrdersEffects', () => {
    let actions$: Observable<Action>;
    let effects: OrdersEffects;
    let ordersApiService: jasmine.SpyObj<OrdersApiService>;

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

    const mockOrder: Order = {
        id: 3,
        productId: 3,
        userId: 102,
        quantity: 4,
        totalPrice: 60,
        status: 'pending',
        created: new Date('2025-09-25T12:15:00Z')
    };

    beforeEach(() => {
        const spy = jasmine.createSpyObj('OrdersApiService', [
            'getAll',
            'getById',
            'create',
            'update',
            'delete'
        ]);

        TestBed.configureTestingModule({
            providers: [
                OrdersEffects,
                provideMockActions(() => actions$),
                { provide: OrdersApiService, useValue: spy }
            ]
        });

        effects = TestBed.inject(OrdersEffects);
        ordersApiService = TestBed.inject(OrdersApiService) as jasmine.SpyObj<OrdersApiService>;
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('load$', () => {
        it('should return loadOrdersSuccess action on successful load', (done) => {
            ordersApiService.getAll.and.returnValue(of(mockOrders));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(action => {
                expect(action).toEqual(OrdersActions.loadOrdersSuccess({ orders: mockOrders }));
                expect(ordersApiService.getAll).toHaveBeenCalled();
                done();
            });
        });

        it('should return loadOrdersFailure action on error', (done) => {
            const error = { message: 'Failed to load orders' };
            ordersApiService.getAll.and.returnValue(throwError(() => error));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(action => {
                expect(action).toEqual(OrdersActions.loadOrdersFailure({ error }));
                expect(ordersApiService.getAll).toHaveBeenCalled();
                done();
            });
        });

        it('should handle empty orders list', (done) => {
            ordersApiService.getAll.and.returnValue(of([]));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(action => {
                expect(action).toEqual(OrdersActions.loadOrdersSuccess({ orders: [] }));
                done();
            });
        });

        it('should use switchMap to cancel previous requests', () => {
            ordersApiService.getAll.and.returnValue(cold('--a|', { a: mockOrders }));

            actions$ = hot('-a-b-c', {
                a: OrdersActions.loadOrders(),
                b: OrdersActions.loadOrders(),
                c: OrdersActions.loadOrders()
            });

            const expected = cold('-------b', {  // add 2 more dashes
                b: OrdersActions.loadOrdersSuccess({ orders: mockOrders })
            });

            expect(effects.load$).toBeObservable(expected);
        });
    });

    describe('create$', () => {
        it('should return createOrderSuccess action on successful creation', (done) => {
            ordersApiService.create.and.returnValue(of(mockOrder));

            actions$ = of(OrdersActions.createOrder({ order: mockOrder }));

            effects.create$.subscribe(action => {
                expect(action).toEqual(OrdersActions.createOrderSuccess({ order: mockOrder }));
                expect(ordersApiService.create).toHaveBeenCalledWith(mockOrder);
                done();
            });
        });

        it('should return createOrderFailure action on error', (done) => {
            const error = { message: 'Failed to create order' };
            ordersApiService.create.and.returnValue(throwError(() => error));

            actions$ = of(OrdersActions.createOrder({ order: mockOrder }));

            effects.create$.subscribe(action => {
                expect(action).toEqual(OrdersActions.createOrderFailure({ error }));
                expect(ordersApiService.create).toHaveBeenCalledWith(mockOrder);
                done();
            });
        });

        it('should handle multiple create requests independently', (done) => {
            const order1 = { ...mockOrder, id: 1 };
            const order2 = { ...mockOrder, id: 2 };

            ordersApiService.create.and.returnValues(
                of(order1),
                of(order2)
            );

            actions$ = of(
                OrdersActions.createOrder({ order: order1 }),
                OrdersActions.createOrder({ order: order2 })
            );

            const results: Action[] = [];
            effects.create$.subscribe({
                next: action => {
                    results.push(action);
                    if (results.length === 2) {
                        expect(results[0]).toEqual(OrdersActions.createOrderSuccess({ order: order1 }));
                        expect(results[1]).toEqual(OrdersActions.createOrderSuccess({ order: order2 }));
                        done();
                    }
                }
            });
        });
    });

    describe('update$', () => {
        it('should return updateOrderSuccess action on successful update', (done) => {
            const updatedOrder = { ...mockOrder, status: 'shipped' as const };
            ordersApiService.update.and.returnValue(of(updatedOrder));

            actions$ = of(OrdersActions.updateOrder({ order: updatedOrder }));

            effects.update$.subscribe(action => {
                expect(action).toEqual(OrdersActions.updateOrderSuccess({ order: updatedOrder }));
                expect(ordersApiService.update).toHaveBeenCalledWith(updatedOrder);
                done();
            });
        });

        it('should return updateOrderFailure action on error', (done) => {
            const error = { message: 'Failed to update order' };
            ordersApiService.update.and.returnValue(throwError(() => error));

            actions$ = of(OrdersActions.updateOrder({ order: mockOrder }));

            effects.update$.subscribe(action => {
                expect(action).toEqual(OrdersActions.updateOrderFailure({ error }));
                expect(ordersApiService.update).toHaveBeenCalledWith(mockOrder);
                done();
            });
        });

        it('should handle network errors', (done) => {
            const networkError = new Error('Network error');
            ordersApiService.update.and.returnValue(throwError(() => networkError));

            actions$ = of(OrdersActions.updateOrder({ order: mockOrder }));

            effects.update$.subscribe(action => {
                expect(action.type).toBe(OrdersActions.updateOrderFailure.type);
                done();
            });
        });
    });

    describe('delete$', () => {
        it('should return deleteOrderSuccess action on successful deletion', (done) => {
            const orderId = 1;
            ordersApiService.delete.and.returnValue(of(void 0));

            actions$ = of(OrdersActions.deleteOrder({ id: orderId }));

            effects.delete$.subscribe(action => {
                expect(action).toEqual(OrdersActions.deleteOrderSuccess({ id: orderId }));
                expect(ordersApiService.delete).toHaveBeenCalledWith(orderId);
                done();
            });
        });

        it('should return deleteOrderFailure action on error', (done) => {
            const orderId = 999;
            const error = { message: 'Order not found' };
            ordersApiService.delete.and.returnValue(throwError(() => error));

            actions$ = of(OrdersActions.deleteOrder({ id: orderId }));

            effects.delete$.subscribe(action => {
                expect(action).toEqual(OrdersActions.deleteOrderFailure({ error }));
                expect(ordersApiService.delete).toHaveBeenCalledWith(orderId);
                done();
            });
        });

        it('should handle 404 errors', (done) => {
            const orderId = 999;
            const error = { status: 404, message: 'Not found' };
            ordersApiService.delete.and.returnValue(throwError(() => error));

            actions$ = of(OrdersActions.deleteOrder({ id: orderId }));

            effects.delete$.subscribe(action => {
                expect(action.type).toBe(OrdersActions.deleteOrderFailure.type);
                done();
            });
        });
    });

    describe('Error handling', () => {
        it('should handle server errors gracefully', (done) => {
            const serverError = { status: 500, message: 'Internal server error' };
            ordersApiService.getAll.and.returnValue(throwError(() => serverError));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(action => {
                expect(action.type).toBe(OrdersActions.loadOrdersFailure.type);
                done();
            });
        });

        it('should handle timeout errors', (done) => {
            const timeoutError = { name: 'TimeoutError', message: 'Request timeout' };
            ordersApiService.getAll.and.returnValue(throwError(() => timeoutError));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(action => {
                expect(action.type).toBe(OrdersActions.loadOrdersFailure.type);
                done();
            });
        });
    });

    describe('Service interactions', () => {
        it('should call service methods with correct parameters', (done) => {
            ordersApiService.getAll.and.returnValue(of(mockOrders));

            actions$ = of(OrdersActions.loadOrders());

            effects.load$.subscribe(() => {
                expect(ordersApiService.getAll).toHaveBeenCalledTimes(1);
                expect(ordersApiService.getAll).toHaveBeenCalledWith();
                done();
            });
        });

        it('should pass order data to create service', (done) => {
            ordersApiService.create.and.returnValue(of(mockOrder));

            actions$ = of(OrdersActions.createOrder({ order: mockOrder }));

            effects.create$.subscribe(() => {
                expect(ordersApiService.create).toHaveBeenCalledWith(mockOrder);
                done();
            });
        });

        it('should pass correct id to delete service', (done) => {
            const orderId = 5;
            ordersApiService.delete.and.returnValue(of(void 0));

            actions$ = of(OrdersActions.deleteOrder({ id: orderId }));

            effects.delete$.subscribe(() => {
                expect(ordersApiService.delete).toHaveBeenCalledWith(orderId);
                done();
            });
        });
    });
});