import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EntriesService } from '../../entries.service';
import { Entry } from '../../entry.model';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
})
export class EntryTableComponent {
  entries: Entry[] = [];
  userId: number;
  private entriesSub: Subscription;
  userisAuthenticated = false;
  private authStatusSub: Subscription;
  public totalEntries = 10;
  public entriesPerPage = 10;
  public pageSizeOptions = [1, 2, 5, 10];
  public selectedMonth: number;
  public selectedYear: number;
  public totalExpanses = 0;
  today = new Date();

  constructor(
    public entriesService: EntriesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const today = new Date();
    this.selectedMonth = today.getMonth() + 1;
    this.selectedYear = today.getFullYear();

    this.selectedMonth = new Date().getMonth() + 1;
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
          this.totalExpanses += Number(entry.preis);
        }
      });
    this.userisAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userisAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    //totalExpanses
  }

  onChangePage(pageData: PageEvent) {
    console.log(pageData);
  }

  onPreviousMonth() {
    if (this.selectedMonth === 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.entriesService.getSelectedEntries(
      this.userId,
      this.selectedYear,
      this.selectedMonth
    );
  }

  onNextMonth() {
    if (this.selectedMonth === 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.entriesService.getSelectedEntries(
      this.userId,
      this.selectedYear,
      this.selectedMonth
    );
  }

  isEntryForSelectedMonth(entry) {
    const entryMonth = new Date(entry.datum).getMonth() + 1;
    return entryMonth === this.selectedMonth;
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }
}
