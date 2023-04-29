import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contract } from 'src/app/contracts/contract.model';
@Component({
  selector: 'app-contract-filter',
  templateUrl: './contract-filter.component.html',
  styleUrls: ['./contract-filter.component.css'],
})
export class ContractFilterComponent {
  @Input() contracts: Contract[];
  public selectedYear: number;
  public selectedContract: number;

  constructor() {
    const currentDate = new Date();

    this.selectedYear = currentDate.getFullYear();
  }
  years: number[] = [2020, 2021, 2022, 2023, 2024, 2025];
  @Output() yearSelected = new EventEmitter<number>();
  @Output() contractSelected = new EventEmitter<number>();

  onYearSelected() {
    this.yearSelected.emit(this.selectedYear);
  }

  onContractSelected() {
    this.contractSelected.emit(this.selectedContract);
    console.log(
      'onContractSelected von contract-filter sagt: Selected Month ist: ',
      this.selectedContract
    );
  }
}
