import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DxPieChartModule } from 'devextreme-angular';
import { registerPalette } from 'devextreme/viz/palette';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Entry } from 'src/app/entries/entry.model';
import { NormalCardComponent } from 'src/app/shared/cards/normal-card/normal-card.component';
import { DxChartModule } from 'devextreme-angular';
@Component({
  selector: 'app-month-bar-chart',
  templateUrl: './month-bar-chart.component.html',
  styleUrls: ['./month-bar-chart.component.css'],

})
export class MonthBarChartComponent {
  palette = [];
  title = "test2";
  @Input() entries: Entry[];
  @Input() categoriesSum: any[] = [];
  @Input() categoriesExpensesAndRevenues: any[] = [];
  @Input() monthStackBarChartData: any[] = [];
  @Input() categoriesExpensesAndRevenuesColors: any[] = [];
  categories: string[] = [];
  stackedBarChartdata: any[] = [];
  colors:  string[] = [];
  colorScheme: Color;
  buttonLabel: string = "Click me in Component 2";
  toggleCheck:boolean = true;
  onButtonClick() {
    console.log('Button clicked in Component 2');
  }
  onToggle(value: boolean) {
    // Der Wert der Toggle-Komponente wird als Argument an die "console.log"-Methode übergeben, um eine Nachricht in der Konsole auszugeben.
    this.toggleCheck = value;
    console.log('Toggle changed in Component 1: ' + value);
  }

  // <-- Deklarieren Sie die @Input-Eigenschaft

  ngOnInit() {}
  ngOnChanges() {
    // create header using child_id

    for (let i = 0; i < this.categoriesSum.length; i++) {
      this.palette.push(this.categoriesSum[i].color);
    }

    this.colorScheme = {
      name: 'myScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: this.categoriesExpensesAndRevenuesColors,
    };

    this.stackedBarChartdata = this.groupEntriesByCategory(this.entries);
    this.categories = this.getCategoryNames(this.entries);
    this.colors  = this.getCategoryColors(this.entries);
    console.log("A1");
    console.log(this.categories);
    console.log("B1");
    console.log(this.stackedBarChartdata);
  }


  groupEntriesByCategory(entries: any[]): any {
    const categories = [...new Set(entries.map(entry => entry.categoryName))];
    const groupA = { Art: 'Ausgaben' };
    const groupB = { Art: 'Einnahmen' };

    // Schleife über alle Kategorien
    for (const category of categories) {
      const categoryEntries = entries.filter(entry => entry.categoryName === category);
      const categoryTotal = categoryEntries.reduce((total, entry) => {
        return total + (entry.revenue === 0 ? entry.preis : 0);
      }, 0);

      // Wert für das Kategorie-Objekt setzen
      groupA[category] = categoryTotal;

      const categoryTotal2 = categoryEntries.reduce((total, entry) => {
        return total + (entry.revenue === 1 ? entry.preis : 0);
      }, 0);

      // Wert für das Kategorie-Objekt setzen
      groupB[category] = categoryTotal2;
    }

    // Ausgaben- und Einnahmen-Objekte in einem Array zurückgeben
    return [groupA, groupB];
  }
  getCategoryNames(entries: any[]): string[] {
    const categories = [...new Set(entries.map(entry => entry.categoryName))];
    const positiveCategories = categories.filter(category =>
      entries.some(entry => entry.categoryName === category && entry.revenue === 1)
    );
    const negativeCategories = categories.filter(category =>
      entries.some(entry => entry.categoryName === category && entry.revenue === 0)
    ).sort();
    return [...negativeCategories, ...positiveCategories];
  }

  getCategoryColors(entries: any[]): string[] {
    const categories = this.getCategoryNames(entries);
    const colors = [];

    for (const category of categories) {
      const entry = entries.find(e => e.categoryName === category);
      if (entry) {
        colors.push(entry.categoryColor);
      }
    }

    return colors;
  }

  customizeTooltipFunction(arg: any) {
    console.log(arg);
    return {
      text: `${arg.seriesName}: ${arg.value} €`,
    };
}


}
