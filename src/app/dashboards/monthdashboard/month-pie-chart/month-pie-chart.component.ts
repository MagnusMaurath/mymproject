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
  categoriesSumTotal ;

  onToggle(value: boolean) {
    this.toggleCheck = value;
  }

  ngOnChanges() {
    const categoryData = this.calculateCategoryExpenses(this.entries);

    this.categoriesSum = categoryData.categoriesSum;
    this.categoriesSumTotal = categoryData.totalcategoriesSum;
    for (let i = 0; i < this.categoriesSum.length; i++) {
      this.palette.push(this.categoriesSum[i].color);
    }
    console.log("test");
    console.log(categoryData.totalcategoriesSum);
  }



  /*
  calculateCategoryExpenses(entries) {
    const categoryExpenses = {};
    const categoriesSum = [];
    let totalcategoriesSum = 0;

    // Berechne die Summe aller Ausgaben und gruppiere nach Kategorie
    for (const entry of entries) {
      const categoryId = entry['categoryId'];
      const categoryName = entry['categoryName'];
      const categoryColor = entry['categoryColor'];
      const categoryIcon = entry['categoryIcon'];
      const price = Number(entry['preis']);
      const revenue = entry['revenue'];

      if (categoryId in categoryExpenses) {
        categoryExpenses[categoryId].total += price;
        categoryExpenses[categoryId].entryCount++;
      } else {
        categoryExpenses[categoryId] = {
          categoryName,
          total: price,
          color: categoryColor,
          revenue: revenue,
          entryCount: 1,
          categoryIcon: categoryIcon,
        };
      }

      // Addiere den Preis jedes Ausgaben-Eintrags zur Gesamtsumme hinzu
      if (revenue === 0) {
        totalcategoriesSum += price;
      }
    }

    // Erstelle ein Array mit den Kategorien und ihren Gesamtkosten und berechne den prozentualen Anteil jeder Kategorie
    for (const categoryId in categoryExpenses) {
      const categoryTotal = categoryExpenses[categoryId].total;
      const categoryEntryCount = categoryExpenses[categoryId].entryCount;
      const categoryName = categoryExpenses[categoryId].categoryName;
      const categoryColor = categoryExpenses[categoryId].color;
      const categoryIcon = categoryExpenses[categoryId].categoryIcon;
      const revenue = categoryExpenses[categoryId].revenue;

      const percentage = totalcategoriesSum !== 0 ? categoryTotal / totalcategoriesSum * 100 : 0;

      categoriesSum.push({
        categoryId,
        categoryName,
        total: categoryTotal,
        color: categoryColor,
        revenue,
        entryCount: categoryEntryCount,
        categoryIcon,
        percentage,
      });
    }

    return { categoryExpenses, categoriesSum, totalcategoriesSum };
  }
*/

calculateCategoryExpenses(entries) {
  const categoryExpenses = {};
  const categoriesSum = [];
  let totalcategoriesSum = 0;

  // Berechne die Summe aller Ausgaben und gruppiere nach Kategorie
  for (const entry of entries) {
    const categoryId = entry['categoryId'];
    const categoryName = entry['categoryName'];
    const categoryColor = entry['categoryColor'];
    const categoryIcon = entry['categoryIcon'];
    const price = Number(entry['preis']);
    const revenue = entry['revenue'];

    if (categoryId in categoryExpenses) {
      categoryExpenses[categoryId].total += price;
      categoryExpenses[categoryId].entryCount++;
    } else {
      categoryExpenses[categoryId] = {
        categoryName,
        total: price,
        color: categoryColor,
        revenue: revenue,
        entryCount: 1,
        categoryIcon: categoryIcon,
      };
    }

    // Addiere den Preis jedes Ausgaben-Eintrags zur Gesamtsumme hinzu
    if (revenue === 0) {
      totalcategoriesSum += price;
    }
  }

  // Erstelle ein Array mit den Kategorien und ihren Gesamtkosten und berechne den prozentualen Anteil jeder Kategorie
  for (const categoryId in categoryExpenses) {
    const categoryTotal = categoryExpenses[categoryId].total;
    const categoryEntryCount = categoryExpenses[categoryId].entryCount;
    const categoryName = categoryExpenses[categoryId].categoryName;
    const categoryColor = categoryExpenses[categoryId].color;
    const categoryIcon = categoryExpenses[categoryId].categoryIcon;
    const revenue = categoryExpenses[categoryId].revenue;

    if (revenue === 1) {
      continue; // Ignoriere Einnahmen-Kategorien
    }

    const percentage = totalcategoriesSum !== 0 ? categoryTotal / totalcategoriesSum * 100 : 0;

    categoriesSum.push({
      categoryId,
      categoryName,
      total: categoryTotal,
      color: categoryColor,
      revenue,
      entryCount: categoryEntryCount,
      categoryIcon,
      percentage,
    });
  }

  return { categoryExpenses, categoriesSum, totalcategoriesSum };
}




  customizeTooltipFunction(arg: any) {
    return {
      text: `${arg.argumentText}: ${arg.value} €`,
    };
  }



}
