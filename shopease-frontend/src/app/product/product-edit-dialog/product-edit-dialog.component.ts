// product-edit-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})

export class ProductEditDialogComponent implements OnInit {
  formInstance: FormGroup;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.formInstance = new FormGroup({
      "id": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "specifications": new FormControl('', Validators.required),
      "stock": new FormControl('', Validators.required),
      "provider": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "categoryId": new FormControl('', Validators.required),
      "cost": new FormControl('', Validators.required) // Add cost field
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  save(): void {
    const updatedProduct = new Product(
      this.data.id,
      this.formInstance.value.name,
      this.formInstance.value.specifications,
      this.formInstance.value.stock,
      this.formInstance.value.provider,
      this.formInstance.value.description,
      this.formInstance.value.categoryId,
      this.formInstance.value.cost,
      ""
    );

    this.productService.updateProduct(updatedProduct).subscribe(
      createdProduct => {
        this.dialogRef.close(createdProduct);
      },
      error => {
        console.error('Error updating product', error);
      }
    );
  }
}
