import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EntriesService } from 'src/app/entries/entries.service';
import { Entry } from 'src/app/entries/entry.model';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';


@Component({
  selector: 'app-yeardashboard',
  templateUrl: './yeardashboard.component.html',
  styleUrls: ['./yeardashboard.component.css']
})
export class YeardashboardComponent {
  entries: Entry[] = [];
  userId: number;
  private entriesSub: Subscription;
  userisAuthenticated = false;
  public selectedYear: number;
  private authStatusSub: Subscription;

//
@ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

orders: Entry[];

saleAmountHeaderFilter: any;

applyFilterTypes: any;

currentFilter: any;

showFilterRow: boolean;

showHeaderFilter: boolean;

showPageSizeSelector = true;

showInfo = true;

displayMode = 'full';

showNavButtons = true;

readonly allowedPageSizes = [25, 50,100, 'all'];

readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];

//


  constructor(
    public entriesService: EntriesService,
    private authService: AuthService
  ) {
//


    this.showFilterRow = true;
    this.showHeaderFilter = true;
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];
    this.saleAmountHeaderFilter = [{
      text: 'Less than $3000',
      value: ['SaleAmount', '<', 3000],
    }, {
      text: '$3000 - $5000',
      value: [
        ['SaleAmount', '>=', 3000],
        ['SaleAmount', '<', 5000],
      ],
    }, {
      text: '$5000 - $10000',
      value: [
        ['SaleAmount', '>=', 5000],
        ['SaleAmount', '<', 10000],
      ],
    }, {
      text: '$10000 - $20000',
      value: [
        ['SaleAmount', '>=', 10000],
        ['SaleAmount', '<', 20000],
      ],
    }, {
      text: 'Greater than $20000',
      value: ['SaleAmount', '>=', 20000],
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

//


  }



  ngOnInit() {
    this.userId = this.authService.getUserId();
    const today = new Date();
    this.selectedYear = today.getFullYear();
   // this.selectedMonth = new Date().getMonth() +1;


    this.entriesService.getEntriesOfYear(
      this.userId,
      this.selectedYear
    );

    this.userId = this.authService.getUserId();

    this.entriesSub = this.entriesService
      .getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;

      });

    this.userisAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userisAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

























  }
  onCellPrepared (e) {
    if (e.rowType === "data") {

            e.cellElement.style.cssText = "color: white; background-color: red";
            // or
            e.cellElement.classList.add("my-class");

    }
  }

//
private static getOrderDay(rowData) {
  return (new Date(rowData.OrderDate)).getDay();
}

calculateFilterExpression(value, selectedFilterOperations, target) {
  const column = this as any;
  if (target === 'headerFilter' && value === 'weekends') {
    return [[YeardashboardComponent.getOrderDay, '=', 0], 'or', [YeardashboardComponent.getOrderDay, '=', 6]];
  }
  return column.defaultCalculateFilterExpression.apply(this, arguments);
}

orderHeaderFilter(data) {
  data.dataSource.postProcess = (results) => {
    results.push({
      text: 'Weekends',
      value: 'weekends',
    });
    return results;
  };
}

clearFilter() {
  this.dataGrid.instance.clearFilter();
}
//




onYearSelected(year: number) {
  this.selectedYear = year;
  this.entriesService.getEntriesOfYear(
    this.userId,
    this.selectedYear
  );
}



priceColumn_customizeText (cellInfo) {
  if(cellInfo.value=="0") {
  return "Ausgabe";
} else {
  return "Einnahme";
}
}



}
