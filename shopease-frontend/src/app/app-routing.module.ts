import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CartItemComponent } from './cart-items/cart-item/cart-item.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'cart-items', component: CartItemComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
