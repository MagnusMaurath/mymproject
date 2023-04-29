import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-three-stats-list',
  templateUrl: './three-stats-list.component.html',
  styleUrls: ['./three-stats-list.component.css']
})
export class ThreeStatsListComponent {
  @Input() stat1: number;
}
