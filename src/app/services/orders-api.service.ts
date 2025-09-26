import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private baseUrl = 'http://localhost:3000/orders'; // API endpoint

  constructor(private http: HttpClient) {}

  /** Get all orders */
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  /** Get order by ID */
  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  /** Create order */
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, {
      ...order,
      created: new Date()
    });
  }

  /** Update order */
  update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${order.id}`, order);
  }

  /** Delete order */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
