import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntriesService } from 'src/app/entries/entries.service';
import { Entry } from 'src/app/entries/entry.model';

@Component({
  selector: 'app-month-filter-list',
  templateUrl: './month-filter-list.component.html',
  styleUrls: ['./month-filter-list.component.css']
})
export class MonthFilterListComponent {

  public selectedMonth: number;
  public selectedYear: number;

  constructor() {
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth() + 1;
    this.selectedYear = currentDate.getFullYear();
  }

  public months: any[] = [
    { value: 1, name: 'Januar' },
    { value: 2, name: 'Februar' },
    { value: 3, name: 'März' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juni' },
    { value: 7, name: 'Juli' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'Oktober' },
    { value: 11, name: 'November' },
    { value: 12, name: 'Dezember' }
  ];

  years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];
  @Output() yearSelected = new EventEmitter<number>();
  @Output() monthSelected = new EventEmitter<number>();


  onMonthSelected() {
    this.monthSelected.emit(this.selectedMonth);
  }

  onYearSelected() {
    this.yearSelected.emit(this.selectedYear);
  }
}
