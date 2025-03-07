import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private cartItemsUrl: string;

  constructor(private http: HttpClient) {
    this.cartItemsUrl = "http://localhost:8080/api/cart-items";
  }

  public getAllCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.cartItemsUrl);
  }

  public createCartItem(newCartItem: any): Observable<CartItem> {
    return this.http.post<CartItem>(this.cartItemsUrl, newCartItem);
  }

  public deleteCartItem(cartItemId: number): Observable<string> {
    const url = `${this.cartItemsUrl}/${cartItemId}`;
    return this.http.delete<string>(url);
  }

  public deleteAllCartItems(): Observable<string> {
    const url = `${this.cartItemsUrl}/all`;
    return this.http.delete<string>(url);
  }
}