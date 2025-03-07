import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from 'src/shared/navbar/navbar.component';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from './authentication/auth.module';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { SharedModule } from "./shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
 import { MatMenuModule} from '@angular/material/menu';
import { OrderComponent } from './orders/order/order.component';
import { CartItemComponent } from './cart-items/cart-item/cart-item.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        OrderComponent,
        CartItemComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ProductModule,
        CategoryModule,
        HttpClientModule,
        MatDialogModule,
        AuthModule,
        SharedModule,
        MatIconModule,
        CommonModule, 
        MatButtonModule, 
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatMenuModule,
        MatGridListModule
    ]
})
export class AppModule { }
