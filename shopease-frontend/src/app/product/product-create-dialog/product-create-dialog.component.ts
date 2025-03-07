// product-create-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/category/category';
import { ProductService } from '../product.service';
import { CategoryService } from 'src/app/category/category.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: './product-create-dialog.component.html',
  styleUrls: ['./product-create-dialog.component.css']
})

export class ProductCreateDialogComponent implements OnInit {
  formInstance: FormGroup;
  categories: Category[] = []; // Add this property to store categories

  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "specifications": new FormControl('', Validators.required),
      "stock": new FormControl('', Validators.required),
      "provider": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "cost": new FormControl('', Validators.required),
      "categoryId": new FormControl('', Validators.required),
    });
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
    const newProduct = new Product(
      NaN,
      this.formInstance.value.name,
      this.formInstance.value.specifications,
      this.formInstance.value.stock,
      this.formInstance.value.provider,
      this.formInstance.value.description,
      this.formInstance.value.cost,
      this.formInstance.value.categoryId,
      ""
    );

    this.productService.createProduct(newProduct).subscribe(
      createdProduct => {
        this.dialogRef.close(createdProduct);
      },
      error => {
        console.error('Error creating product', error);
      }
    );
  }
}
