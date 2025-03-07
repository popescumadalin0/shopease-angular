import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl : string;

  constructor(private http: HttpClient) { 
    this.productsUrl = "http://localhost:8080/api/products";
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  public deleteProduct(productId: number): Observable<string> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.delete<string>(url);
  }

  public updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(this.productsUrl, updatedProduct);
  }

  public createProduct(newProduct: any): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct);
  }

  public getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    const url = `${this.productsUrl}/category/${categoryId}`;
    return this.http.get<Product[]>(url);
  }
}
