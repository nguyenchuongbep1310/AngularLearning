import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersApiService } from './orders-api.service';
import { Order } from '../models/order.model';

describe('OrdersApiService', () => {
    let service: OrdersApiService;
    let httpMock: HttpTestingController;
    const baseUrl = 'http://localhost:3000/orders';

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

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrdersApiService]
        });
        service = TestBed.inject(OrdersApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getAll', () => {
        it('should retrieve all orders', () => {
            service.getAll().subscribe(orders => {
                expect(orders).toEqual(mockOrders);
                expect(orders.length).toBe(2);
            });

            const req = httpMock.expectOne(baseUrl);
            expect(req.request.method).toBe('GET');
            req.flush(mockOrders);
        });

        it('should handle empty response', () => {
            service.getAll().subscribe(orders => {
                expect(orders).toEqual([]);
                expect(orders.length).toBe(0);
            });

            const req = httpMock.expectOne(baseUrl);
            req.flush([]);
        });

        it('should handle error', () => {
            service.getAll().subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.status).toBe(500);
                }
            });

            const req = httpMock.expectOne(baseUrl);
            req.flush('Server error', { status: 500, statusText: 'Server Error' });
        });
    });

    describe('getById', () => {
        it('should retrieve order by id', () => {
            const orderId = 1;
            const mockOrder = mockOrders[0];

            service.getById(orderId).subscribe(order => {
                expect(order).toEqual(mockOrder);
                expect(order.id).toBe(orderId);
            });

            const req = httpMock.expectOne(`${baseUrl}/${orderId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockOrder);
        });

        it('should handle not found error', () => {
            const orderId = 999;

            service.getById(orderId).subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.status).toBe(404);
                }
            });

            const req = httpMock.expectOne(`${baseUrl}/${orderId}`);
            req.flush('Not found', { status: 404, statusText: 'Not Found' });
        });
    });

    describe('create', () => {
        it('should create new order', () => {
            const newOrder: Order = {
                id: 0,
                productId: 3,
                userId: 102,
                quantity: 3,
                totalPrice: 150,
                status: 'pending',
                created: new Date()
            };

            const createdOrder: Order = { ...newOrder, id: 3 };

            service.create(newOrder).subscribe(order => {
                expect(order).toEqual(createdOrder);
                expect(order.id).toBe(3);
            });

            const req = httpMock.expectOne(baseUrl);
            expect(req.request.method).toBe('POST');
            expect(req.request.body.productId).toBe(newOrder.productId);
            expect(req.request.body.created).toBeTruthy();
            req.flush(createdOrder);
        });

        it('should add created date to new order', () => {
            const newOrder: Order = {
                id: 0,
                productId: 3,
                userId: 102,
                quantity: 3,
                totalPrice: 150,
                status: 'pending',
                created: new Date()
            };

            service.create(newOrder).subscribe();

            const req = httpMock.expectOne(baseUrl);
            expect(req.request.body.created).toBeDefined();
            expect(req.request.body.created instanceof Date).toBe(true);
            req.flush(newOrder);
        });
    });

    describe('update', () => {
        it('should update existing order', () => {
            const updatedOrder: Order = {
                ...mockOrders[0],
                status: 'shipped',
                quantity: 3
            };

            service.update(updatedOrder).subscribe(order => {
                expect(order).toEqual(updatedOrder);
                expect(order.status).toBe('shipped');
                expect(order.quantity).toBe(3);
            });

            const req = httpMock.expectOne(`${baseUrl}/${updatedOrder.id}`);
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updatedOrder);
            req.flush(updatedOrder);
        });
    });

    describe('delete', () => {
        it('should delete order', () => {
            const orderId = 1;

            service.delete(orderId).subscribe(response => {
                expect(response).toBeNull();   // HttpClient flush(null) → response = null
            });

            const req = httpMock.expectOne(`${baseUrl}/${orderId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });

        it('should handle delete error', () => {
            const orderId = 999;

            service.delete(orderId).subscribe({
                next: () => fail('should have failed'),
                error: (error) => {
                    expect(error.status).toBe(404);
                }
            });

            const req = httpMock.expectOne(`${baseUrl}/${orderId}`);
            req.flush('Not found', { status: 404, statusText: 'Not Found' });
        });
    });
});