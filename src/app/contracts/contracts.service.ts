import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contract } from './contract.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractsService {
  private contracts: Contract[] = [];
  private contractsUpdated = new Subject<Contract[]>();

  constructor(private http: HttpClient) {}

  getContracts(userId: any) {
    //spreadoperator reference etc. Siehe Kapitel 27 MERN STACK UDEMY
    this.http
      .get<{ message: String; contracts: any }>(
        'http://localhost:3000/api/contracts/'+
        userId
      )
      .pipe(
        map((contractData) => {
          return {
            contracts: contractData.contracts.map((contract) => {
              return {
                id: contract.id,
                name: contract.name,
                actual_value:contract.actual_value,
                startdate: contract.startdate,
                endate: contract.enddate,
                userId: contract.userId,
                revenue: contract.revenue,
              };
            }),
          };
        })
      )
      .subscribe((transformedContractsData) => {
        console.log("kartoffel");
        console.log(transformedContractsData);
        this.contracts = transformedContractsData.contracts;
        this.contractsUpdated.next([...this.contracts]);
      });
  }





  getContractUpdateListener() {
    return this.contractsUpdated.asObservable();
  }












}
