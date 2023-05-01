import { Component, Output } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EntriesService } from 'src/app/entries/entries.service';
import { Entry } from 'src/app/entries/entry.model';

@Component({
  selector: 'app-monthdashboard',
  templateUrl: './monthdashboard.component.html',
  styleUrls: ['./monthdashboard.component.css'],
})
export class MonthDashboardComponent {
  entries: Entry[] = [];
  userId: number;
  private entriesSub: Subscription;
  userisAuthenticated = false;
  private authStatusSub: Subscription;
  public totalEntries = 10;
  public entriesPerPage = 10;
  public pageSizeOptions = [1, 2, 5, 10];
  public selectedMonth: number;
  public selectedMonthName : string;
  public selectedYear: number;
  public totalExpanses = 0;
  mensch2 = 'Markus';
  categoriesSum: any[] = [];
  categoriesExpensesAndRevenues: any[] = [];
  categoriesExpensesAndRevenuesColors: any[] = [];
  monthStackBarChartData: any[] = [];
  today = new Date();
  toggleValue: boolean = false;
  public isToggleOn = false;
  constructor(
    public entriesService: EntriesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const today = new Date();
    this.selectedYear = today.getFullYear();
   // this.selectedMonth = new Date().getMonth() +1;
   this.selectedMonth = new Date().getMonth() -2;
    this.selectedMonthName = this.getMonthName(this.selectedMonth);

    this.entriesService.getSelectedEntries(
      this.userId,
      this.selectedYear,
      this.selectedMonth
    );

    this.userId = this.authService.getUserId();

    this.entriesSub = this.entriesService
      .getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;

        this.totalExpanses = 0;
        for (const entry of this.entries) {
          if (entry.revenue == 0) {
            this.totalExpanses += Number(entry.preis);
          }
        }

        const { categoriesExpensesAndRevenues, colors } =
          this.entriesService.calculateCategoryExpensesAndRevenues(
            this.categoriesSum
            //HIER WIRD ES AUSGERECHNET
          );
        this.categoriesExpensesAndRevenues = categoriesExpensesAndRevenues;
        this.categoriesExpensesAndRevenuesColors = colors;
        this.selectedMonthName = this.getMonthName(+this.selectedMonth);
        console.log("Montdashboard");
        console.log(this.entries);
      });

    this.userisAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userisAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

  }


  ngOnChange()
 {
  console.log("Montdashboard onchange");
  console.log(this.entries);
 }














  onMonthSelected(month: number) {
    this.selectedMonth = month;
    this.entriesService.getSelectedEntries(
      this.userId,
      this.selectedYear,
      this.selectedMonth
    );
  }

  onYearSelected(year: number) {
    this.selectedYear = year;
    this.entriesService.getSelectedEntries(
      this.userId,
      this.selectedYear,
      this.selectedMonth
    );
  }

  getMonthName(monthNumber: number): string {
    let monthName: string;
    switch (monthNumber) {
      case 1:
        monthName = "Januar";
        break;
      case 2:
        monthName = "Februar";
        break;
      case 3:
        monthName = "März";
        break;
      case 4:
        monthName = "April";
        break;
      case 5:
        monthName = "Mai";
        break;
      case 6:
        monthName = "Juni";
        break;
      case 7:
        monthName = "Juli";
        break;
      case 8:
        monthName = "August";
        break;
      case 9:
        monthName = "September";
        break;
      case 10:
        monthName = "Oktober";
        break;
      case 11:
        monthName = "November";
        break;
      case 12:
        monthName = "Dezember";
        break;
      default:
        monthName = "Ungültige Monatsnummer";
        break;
    }
    return monthName;
  }


  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }
}
