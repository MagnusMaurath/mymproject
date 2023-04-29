import { Component, Input, OnInit } from '@angular/core';
import { EntriesService } from 'src/app/entries/entries.service';
import { Entry } from 'src/app/entries/entry.model';
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent {
  @Input() entries: Entry[]; // <-- Deklarieren Sie die @Input-Eigenschaft
  public selectedMonth: number;
  public selectedYear: number;
  selectedOption: Entry[];

  ngOnInit() {
    console.log('Die Einträgeas:');
    console.log(this.entries);
  }

  onSort(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    switch (value) {
      case 'lowprice':
        this.entries.sort((a, b) => {
          // Konvertieren Sie die Preise in Zahlen und subtrahieren Sie sie, um die Sortierreihenfolge zu bestimmen
          return Number(a.preis) - Number(b.preis);
        });
        break;
      case 'highprice':
        this.entries.sort((a, b) => {
          // Konvertieren Sie die Preise in Zahlen und subtrahieren Sie sie, um die Sortierreihenfolge zu bestimmen
          return Number(b.preis) - Number(a.preis);
        });

        break;
      case 'newdate':
        console.log('Hey');
        console.log(this.entries);
        this.entries.sort((a, b) => {
          // Konvertieren Sie die Daten in das richtige Format und subtrahieren Sie sie, um die Sortierreihenfolge zu bestimmen
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });

        break;
      case 'olddate':
        this.entries.sort((a, b) => {
          // Konvertieren Sie die Daten in das richtige Format und subtrahieren Sie sie, um die Sortierreihenfolge zu bestimmen
          return new Date(a.datum).getTime() - new Date(b.datum).getTime();
        });

        break;

      default:
        this.entries.sort((a, b) => {
          // Konvertieren Sie die Daten in das richtige Format und subtrahieren Sie sie, um die Sortierreihenfolge zu bestimmen
          return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });
    }
  }
}
