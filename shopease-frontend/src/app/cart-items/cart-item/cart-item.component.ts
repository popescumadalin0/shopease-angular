// cart-item.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../cart-item';
import { CartItemService } from '../cart-items.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { OrderService } from 'src/app/orders/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  formInstance: FormGroup;
  cartItems: CartItem[] = [];
  currentUser: any;
  products: any[] = [];

  constructor(
    private cartItemService: CartItemService,
    private productService: ProductService,
    private authService: AuthService,
    private ordersService: OrderService,
    private router: Router
  ) {
    this.formInstance = new FormGroup({
      "quantity": new FormControl('', Validators.required),
      "productId": new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    // Fetch both cart items and products
    this.fetchCartItemsAndProducts();
  }

  private fetchCartItemsAndProducts(): void {
    // Fetch cart items
    this.cartItemService.getAllCartItems().subscribe(
      cartItems => {
        this.cartItems = cartItems;

        // Fetch products
        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
          },
          error => {
            console.error('Error fetching products', error);
          }
        );
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  save(): void {
    const newCartItem = new CartItem(
      NaN,
      this.formInstance.value.quantity,
      this.formInstance.value.productId
    );

    this.cartItemService.createCartItem(newCartItem).subscribe(
      createdCartItem => {
        this.cartItems.push(createdCartItem);
      },
      error => {
        console.error('Error creating cart item', error);
      }
    );
  }

  delete(cartItemId: number): void {
    this.cartItemService.deleteCartItem(cartItemId).subscribe(
      response => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      error => {
        console.error('Error deleting cart item', error);
      }
    );
  }

  deleteAll(): void {
    this.cartItemService.deleteAllCartItems().subscribe(
      response => {
        this.cartItems = [];
      },
      error => {
        console.error('Error deleting all cart items', error);
      }
    );
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.cartItems.forEach(cartItem => {
      const product = this.getProductById(cartItem.productId);
      if (product) {
        totalCost += cartItem.quantity * product.cost;
      }
    });
    return totalCost;
  }

  getProductById(productId: number): any {
    return this.products.find(product => product.id === productId);
  }

  createOrder(): void {
    // Call the createOrder method from OrderService
    this.ordersService.createOrder().subscribe(
      response => {
        console.log('Order created!');
        
        // Navigate to the orders route
        //this.router.navigateByUrl('/cart-items');
        window.location.reload();
      },
      error => {
        console.error('Error creating order', error);
      }
    );
  }
}
