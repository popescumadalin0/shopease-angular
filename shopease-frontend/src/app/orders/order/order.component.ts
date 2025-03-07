// order.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders.service';
import { Order } from '../order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.error('Error fetching orders', error);
      }
    );
  }

  delete(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe(
      response => {
        this.orders = this.orders.filter(order => order.id !== orderId);
      },
      error => {
        console.error('Error canceling order', error);
      }
    );
  }
}
