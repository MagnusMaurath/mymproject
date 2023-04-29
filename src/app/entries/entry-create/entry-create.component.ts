import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/categories/category.model';
import { EntriesService } from '../entries.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css'],
})
export class EntryCreateComponent {
  categories: Category[] = [];
  private categoriesSub: Subscription;
  userId: number;

  constructor(
    public entriesService: EntriesService,
    public categoriesService: CategoriesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.categoriesService.getCategories(this.userId);
    this.categoriesSub = this.categoriesService
      .getCategoryUpdateListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.entriesService.addEntry(
      form.value.name,
      form.value.preis,
      form.value.datum,
      form.value.revenue
    );
    form.resetForm();
  }
}
