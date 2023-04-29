import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient) {}
  /*
  getCategories(userId) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; categories: Category[] }>(
        'http://localhost:3000/api/categories/user/' + userId
      )
      .subscribe((categoryData) => {
        console.log(categoryData);
        this.categories = categoryData.categories;
        console.log(this.categories);
        this.categoriesUpdated.next([...this.categories]);
      });
  }*/

  /*
  getCategories(userId) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; categories: any }>(
        'http://localhost:3000/api/categories/user/' + userId
      )
      .pipe(
        map((categoryData) => {
          return {
            categories: categoryData.categories.map((category) => {
              return {
                id: category.id,
                name: category.name,
                color: category.color,
                revenue: category.revenue,
                icon: category.icn,
                userId: category.userId,
              };
            }),
          };
        })
      )
      .subscribe((transformedCategoryData) => {
        if()
        console.log(transformedCategoryData);
        this.categories = transformedCategoryData.categories;

        this.categoriesUpdated.next([...this.categories]);
      });
  }*/

  getCategories(userId: any) {
    this.http
      .get<{ message: string; categories: any }>(
        'http://localhost:3000/api/categories/user/' + userId
      )
      .subscribe((categoryData) => {
        console.log(categoryData);
        if (categoryData.categories) {
          this.categories = categoryData.categories;
          this.categoriesUpdated.next([...this.categories]);
        } else {
          console.log('Error: No categories found in response.');
        }
      });
  }

  getCategoryUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }
}
