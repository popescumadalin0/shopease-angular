import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['./category-create-dialog.component.css']
})
export class CategoryCreateDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService
  ) {
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  save(): void {
    const newCategory = new Category(
      NaN,
      this.formInstance.value.name,
      this.formInstance.value.description,
      ""
    );

    this.categoryService.createCategory(newCategory).subscribe(
      createdCategory => {
        this.dialogRef.close(createdCategory);
      },
      error => {
        console.error('Error creating category', error);
      }
    );
  }
}
