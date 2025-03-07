import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';
import { ProductCreateDialogComponent } from './product-create-dialog/product-create-dialog.component';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemService } from '../cart-items/cart-items.service';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  currentUser: any;
  categories: Category[] = [];
  quantity: number = 1; // Default value is 1

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartItemService: CartItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.productService.getProductsByCategoryId(categoryId).subscribe(
          products => {
            this.products = products;
          },
          error => {
            console.error('Error loading products for category:', error);
          }
        );
      } else {
        this.productService.getProducts().subscribe(data => {
          this.products = data;
        });
      }
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }

  edit(product: Product) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
          }
        );
        console.log('Product created successfully', result);
      }
    });
  }

  delete(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: string) => {
        console.log('Server response:', response);
        this.products = this.products.filter(product => product.id !== productId);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(ProductCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.getProducts().subscribe(
          products => {
            this.products = products;
          }
        );
        console.log('Product created successfully', result);
      }
    });
  }

  addToCart(product: Product): void {
        const newCartItem = {
      quantity: this.quantity,
      productId: product.id
    };

    this.cartItemService.createCartItem(newCartItem).subscribe(
      createdCartItem => {
        console.log('CartItem created successfully', createdCartItem);
        this.router.navigateByUrl('/cart-items');
      },
      error => {
        console.error('Error creating cart item', error);
      }
    );
  }
}
