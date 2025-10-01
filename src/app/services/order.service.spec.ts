import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { ProductOrder } from '../models/product-order.model';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty orders', () => {
    const orders = service.getOrders();
    expect(orders).toEqual([]);
  });

  it('should add order successfully', () => {
    const order: ProductOrder = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      quantity: 2
    };

    const result = service.submitOrder(order);
    expect(result).toBe(true);
    
    const orders = service.getOrders();
    expect(orders.length).toBe(1);
    expect(orders[0]).toEqual(order);
  });

  it('should add multiple orders', () => {
    const order1: ProductOrder = {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      quantity: 2
    };

    const order2: ProductOrder = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: '456 Oak Ave',
      quantity: 1
    };

    service.submitOrder(order1);
    service.submitOrder(order2);

    const orders = service.getOrders();
    expect(orders.length).toBe(2);
    expect(orders[0]).toEqual(order1);
    expect(orders[1]).toEqual(order2);
  });

  it('should maintain order history', () => {
    const order: ProductOrder = {
      name: 'Test User',
      email: 'test@example.com',
      address: '789 Pine Rd',
      quantity: 3
    };

    service.submitOrder(order);
    
    const firstRetrieval = service.getOrders();
    const secondRetrieval = service.getOrders();
    
    expect(firstRetrieval).toEqual(secondRetrieval);
    expect(firstRetrieval.length).toBe(1);
  });
});