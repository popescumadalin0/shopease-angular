import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryService } from './category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CategoryEditDialogComponent } from './category-edit-dialog/category-edit-dialog.component';
import { CategoryCreateDialogComponent } from './category-create-dialog/category-create-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryEditDialogComponent,
    CategoryCreateDialogComponent
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
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
