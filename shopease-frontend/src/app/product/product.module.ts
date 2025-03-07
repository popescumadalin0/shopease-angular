import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductEditDialogComponent } from './product-edit-dialog/product-edit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProductCreateDialogComponent } from './product-create-dialog/product-create-dialog.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductEditDialogComponent,
    ProductCreateDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
