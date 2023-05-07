import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-three-stats-list',
  templateUrl: './three-stats-list.component.html',
  styleUrls: ['./three-stats-list.component.css']
})
export class ThreeStatsListComponent {
  @Input() stat1: number;
  @Input() stat2: number;
  @Input() stat3: number;
  @Input() titel1: string;
  @Input() titel2: string;
  @Input() titel3: string;
}
