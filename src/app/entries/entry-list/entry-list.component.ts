import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/categories/category.model';
import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';
@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent {
  // entries = [
  //   { name: 'first entry', content: 'First Content' },
  //   { name: 'second entry', content: 'S Content' },
  //   { name: 'third entry', content: 'T Content' },
  // ];

  entries: Entry[] = [];
  userId: number;
  private entriesSub: Subscription;
  userisAuthenticated = false;
  private authStatusSub: Subscription;

  //   entriesService: EntriesService;
  // constructor(entriesService: EntriesService) {
  //   this.entriesService = entriesService;
  // } das hier ist das gleiche wie das unten drunter nur die lange schreibweise
  constructor(public entriesService: EntriesService, private authService: AuthService) {}

  ngOnInit() {
    this.entriesService.getEntries();
    this.userId = this.authService.getUserId();

    this.entriesSub = this.entriesService
      .getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
      });
      this.userisAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userisAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      })

    /*this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService
      .getCategoryUpdateListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });*/
  }

  onDelete(entryId: number) {
    this.entriesService.deleteEntry(entryId);
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }
}
