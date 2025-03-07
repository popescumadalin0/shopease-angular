import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl : string;

  constructor(private http: HttpClient) { 
    this.categoriesUrl = "http://localhost:8080/api/categories";
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  public deleteCategory(categoryId: number): Observable<string> {
    const url = `${this.categoriesUrl}/${categoryId}`;
    return this.http.delete<string>(url);
  }

  public updateCategory(updatedCategory: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, updatedCategory);
  }

  public createCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, newCategory);
  }
}
