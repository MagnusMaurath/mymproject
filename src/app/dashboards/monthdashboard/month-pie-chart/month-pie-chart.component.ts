import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DxPieChartModule } from 'devextreme-angular';
import { registerPalette } from 'devextreme/viz/palette';

import { NormalCardComponent } from 'src/app/shared/cards/normal-card/normal-card.component';

import { Entry } from 'src/app/entries/entry.model';
@Component({
  selector: 'app-month-pie-chart',
  templateUrl: './month-pie-chart.component.html',
  styleUrls: ['./month-pie-chart.component.css'],
})
export class MonthPieChartComponent {
  title = "test";
  palette = [];
  @Input() entries: Entry[];
  toggleCheck: boolean = true;
  categoriesSum: any[] = [];

  onToggle(value: boolean) {
    this.toggleCheck = value;
  }

  ngOnChanges() {
    const { categoriesSum } = this.calculateCategoryExpenses(this.entries);
    this.categoriesSum = categoriesSum;
    for (let i = 0; i < this.categoriesSum.length; i++) {
      this.palette.push(this.categoriesSum[i].color);
    }
  }

  calculateCategoryExpenses(entries: any[]): any {
    const categoryExpenses = {};
    const categoriesSum = [];

    // Iterieren Sie über die Einträge und fügen Sie die Preise pro Kategorie zusammen
    for (const entry of entries) {
      const categoryId = entry['categoryId'];
      const categoryName = entry['categoryName'];
      const categoryColor = entry['categoryColor'];

      const price = Number(entry['preis']);
      const revenue = entry['revenue'];
      if (categoryId in categoryExpenses) {
        categoryExpenses[categoryId].total += price;
      } else {
        categoryExpenses[categoryId] = {
          categoryName,
          total: price,
          color: categoryColor,
          revenue: revenue,
        };
      }
    }

    // Erstellen Sie ein Array aus den Kategorien und ihren Gesamtkosten
    for (const categoryId in categoryExpenses) {
      categoriesSum.push({
        categoryId,
        categoryName: categoryExpenses[categoryId].categoryName,
        total: categoryExpenses[categoryId].total,
        color: categoryExpenses[categoryId].color,
        revenue: categoryExpenses[categoryId].revenue,
      });
    }

    return { categoryExpenses, categoriesSum };
  }


  customizeTooltipFunction(arg: any) {
    return {
      text: `${arg.argumentText}: ${arg.value} €`,
    };
  }



}
