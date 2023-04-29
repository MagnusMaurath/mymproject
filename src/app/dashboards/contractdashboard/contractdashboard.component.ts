import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Contract } from 'src/app/contracts/contract.model';
import { Entry } from 'src/app/entries/entry.model';
import { ContractsService } from 'src/app/contracts/contracts.service';
import { EntriesService } from 'src/app/entries/entries.service';

@Component({
  selector: 'app-contractdashboard',
  templateUrl: './contractdashboard.component.html',
  styleUrls: ['./contractdashboard.component.css'],
})
export class ContractdashboardComponent {
  public selectedYear: number;
  public selectedContractId: number;
  public contractId: number;
  userId: number;
  private contractsSub: Subscription;
  contracts: Contract[] = [];
  entries: Entry[] = [];
  userisAuthenticated = false;
  private authStatusSub: Subscription;
  private entriesSub: Subscription;
  constructor(
    public contractsService: ContractsService,
    public entriesService: EntriesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const today = new Date();
    this.selectedYear = today.getFullYear();

    this.contractsService.getContracts(this.userId);
    this.userId = this.authService.getUserId();

    this.entriesSub = this.entriesService
      .getEntryUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
        console.log('entriessubscribe in contractdashboard');
        console.log(this.entries);
      });

    this.contractsSub = this.contractsService
      .getContractUpdateListener()
      .subscribe((contracts: Contract[]) => {
        this.contracts = contracts;
        this.selectedContractId = this.contracts[0].id;

        this.entriesService.getSelectedEntriesOfC(
          this.userId,
          this.selectedContractId,
          this.selectedYear
        );

        this.userId = this.authService.getUserId();

        this.userisAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
          .getAuthStatusListener()
          .subscribe((isAuthenticated) => {
            this.userisAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });

        // this.contractId = this.contracts[0].id;

        /*this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService
      .getCategoryUpdateListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });*/
      });
  }

  onContractSelected(contractId: number) {
    this.selectedContractId = contractId;
    this.entriesService.getSelectedEntriesOfC(
      this.userId,
      this.selectedContractId,
      this.selectedYear
    );
    console.log(this.userId, this.selectedYear, this.selectedContractId);
  }

  onYearSelected(selectedYear: number) {
    this.selectedYear = selectedYear;
    this.entriesService.getSelectedEntriesOfC(
      this.userId,
      this.selectedContractId,
      this.selectedYear
    );
    console.log(this.userId, this.selectedYear, this.selectedContractId);
  }
}
