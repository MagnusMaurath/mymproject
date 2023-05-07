import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Category } from 'src/app/categories/category.model';
import { EntriesService } from '../entries.service';
import { AuthService } from 'src/app/auth/auth.service';

import {FormGroup, FormControl} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css'],
})
export class EntryCreateComponent {
  categories: Category[] = [];
  private categoriesSub: Subscription;
  userId: number;
  isButton1Selected = true;
  typeOfcreatedEntry: number;
  vertrag: number;
  @ViewChild('picker') picker: MatDatepicker<Date>;
  pickedDate = new Date();

  constructor(
    public entriesService: EntriesService,
    public categoriesService: CategoriesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.typeOfcreatedEntry = 0;
    this.categoriesService.getExpensesCategories(this.userId, this.typeOfcreatedEntry);
    this.categoriesSub = this.categoriesService
      .getCategoryUpdateListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }


  onButton1Click() {
    this.typeOfcreatedEntry = 0;
    this.categoriesService.getExpensesCategories(this.userId,   this.typeOfcreatedEntry);
  }

  onButton2Click() {
    this.typeOfcreatedEntry = 1;
    this.categoriesService.getExpensesCategories(this.userId,   this.typeOfcreatedEntry);

  }


  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log("COMPONENTTEST");
    console.log(this.picker.datepickerInput);
    console.log(form.value.preis);
    console.log(this.pickedDate);
    this.vertrag = 0;
    this.entriesService.addEntry(
      this.userId,
      form.value.name,
      form.value.preis,
      this.pickedDate,
      form.value.category,
      this.typeOfcreatedEntry,
      null,
      this.vertrag,

    );
    form.resetForm();
  }
}
