import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entry } from './entry.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EntriesService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();

  constructor(private http: HttpClient) {}

  getEntries() {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; entries: any }>(
        'http://localhost:3000/api/entries'
      )
      .pipe(
        map((entryData) => {
          return {
            entries: entryData.entries.map((entry) => {
              return {
                id: entry.id,
                name: entry.name,
                preis: entry.preis,
                datum: entry.datum,
                userId: entry.userId,
                revenue: entry.revenue,
              };
            }),
          };
        })
      )
      .subscribe((transformedEntriesData) => {
        console.log(transformedEntriesData);
        this.entries = transformedEntriesData.entries;
        this.entriesUpdated.next([...this.entries]);
      });
  }

  //______________________________________________________________________________________
  getSelectedEntries(userId: any, selectedYear: number, selectedMonth: number) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; entries: any }>(
        'http://localhost:3000/api/entries/' +
          userId +
          '/' +
          selectedYear +
          '/' +
          selectedMonth
      )
      .pipe(
        map((entryData) => {
          return {
            entries: entryData.entries.map((entry) => {
              const [r, g, b] = entry.category.color
                .match(/\w\w/g)
                .map((c) => parseInt(c, 16));
              return {
                id: entry.id,
                name: entry.name,
                preis: entry.preis,
                datum: entry.datum,
                userId: entry.userId,
                revenue: entry.revenue,
                categoryId: entry.categoryId,
                categoryName: entry.category.name,
                categoryIcon: entry.category.icon,
                categoryColor: `rgba(${r}, ${g}, ${b}, 1)`,
                categoryColorTransparent:
                  'rgba(' +
                  entry.category.color
                    .substring(1)
                    .match(/.{1,2}/g)
                    .map((v) => parseInt(v, 16))
                    .join(',') +
                  ', 0.1)',
              };
            }),
          };
        })
      )
      .subscribe((transformedEntriesData) => {
        this.entries = transformedEntriesData.entries;
        this.entriesUpdated.next([...this.entries]);
      });
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
  calculateCategoryExpensesAndRevenues(categoriesSum: any[]): any {
    let categoriesExpensesAndRevenues = [
      { name: 'Ausgaben', series: [] },
      { name: 'Einnahmen', series: [] },
    ];
    let colors = [];
    let colorsEinnahmen = [];

    for (const entry of categoriesSum) {
      const { categoryName, total, revenue, color } = entry;

      const newEntry = {
        name: categoryName,
        value: total,
      };

      if (revenue === 0) {
        categoriesExpensesAndRevenues[0].series.push(newEntry);
        colors.push(color);
      } else if (revenue === 1) {
        categoriesExpensesAndRevenues[1].series.push(newEntry);
        colorsEinnahmen.push(color);
      }
    }

    // Füge die Farben der Einnahmen am Ende des 'colors' Arrays hinzu
    colors.push(...colorsEinnahmen);

    return { categoriesExpensesAndRevenues, colors };
  }

  //______________________________________________________________________________________
  getSelectedEntriesOfC(userId: any, contractId: number, selectedYear: number) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; entries: any }>(
        'http://localhost:3000/api/entries/contract/' +
          userId +
          '/' +
          contractId +
          '/' +
          selectedYear
      )
      .pipe(
        map((entryData) => {
          return {
            entries: entryData.entries.map((entry) => {
              return {
                id: entry.id,
                name: entry.name,
                preis: entry.preis,
                datum: entry.datum,
                userId: entry.userId,
              };
            }),
          };
        })
      )
      .subscribe((transformedEntriesData) => {
        this.entries = transformedEntriesData.entries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
  /*
  getSelectedEntries(selectedYear: number, selectedMonth: number) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; entries: any }>(
        'http://localhost:3000/api/entries/' +
          selectedYear +
          '/' +
          selectedMonth
      )

      .subscribe((entryData) => {
        console.log('Hi');
        console.log(entryData);
        this.entries = entryData.entries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
*/
  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(name: string, preis: number, datum: Date, revenue: number) {
    const entry: Entry = {
      id: null,
      name: name,
      preis: preis,
      datum: datum,
      userId: null,
      categoryId: null,
      revenue: revenue,
    };
    this.http
      .post<{ message: string; entryId: number }>(
        'http://localhost:3000/api/entries',
        entry
      )
      .subscribe((responseData) => {
        const entryId = responseData.entryId;
        entry.id = entryId;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }

  deleteEntry(entryId: number) {
    this.http
      .delete('http://localhost:3000/api/entries/' + entryId, {
        responseType: 'text',
      })
      .subscribe(() => {
        const updatedEntries = this.entries.filter(
          (entry) => entry.id !== entryId
        );
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
        console.log('Delete Entry with the ID: ' + entryId);
      });
  }
}
