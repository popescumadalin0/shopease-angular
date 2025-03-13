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

  selectedImage: string | ArrayBuffer | null = null;
  constructor(
    public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService
  ) {
    this.formInstance = new FormGroup({
      "name": new FormControl('', Validators.required),
      "description": new FormControl('', Validators.required),
      "image": new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  save(): void {
    const newCategory = new Category(
      NaN,
      this.formInstance.value.name,
      this.formInstance.value.description,
      this.formInstance.value.image,
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

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.formInstance.patchValue({image: reader.result}); // Salvăm imaginea în FormControl
      };
      reader.readAsDataURL(file);
    }
  }
}
