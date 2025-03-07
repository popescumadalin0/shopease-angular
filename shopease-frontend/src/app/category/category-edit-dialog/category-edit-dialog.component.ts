import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css']
})

export class CategoryEditDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService
  ) {
    this.formInstance = new FormGroup({
      "id": new FormControl('', Validators.required), 
      "name": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {}

  save(): void {
    const updatedCategory = new Category(
      this.data.id,
      this.formInstance.value.name,
      this.formInstance.value.description,
      ""
    );
  
    this.categoryService.updateCategory(updatedCategory).subscribe(
      createdProduct => {
        this.dialogRef.close(createdProduct);
      },
      error => {
        console.error('Error updating product', error);
      }
    );
  }
}
