import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-year-filter-list',
  templateUrl: './year-filter-list.component.html',
  styleUrls: ['./year-filter-list.component.css']
})
export class YearFilterListComponent {

  public selectedYear: number;

  constructor() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
  }


  years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];
  @Output() yearSelected = new EventEmitter<number>();


  onYearSelected() {
    this.yearSelected.emit(this.selectedYear);
  }
}
