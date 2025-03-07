// order.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl: string;

  constructor(private http: HttpClient) {
    this.ordersUrl = 'http://localhost:8080/api/orders';
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  public cancelOrder(orderId: number): Observable<string> {
    const url = `${this.ordersUrl}/cancel/${orderId}`;
    return this.http.delete<string>(url);
  }

  createOrder(): Observable<any> {
    return this.http.post<any>(`${this.ordersUrl}/create`, {});
  }
}
