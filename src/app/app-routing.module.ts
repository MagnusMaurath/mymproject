import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from 'express';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login/login.component';
import { MonthDashboardComponent } from './dashboards/monthdashboard/monthdashboard.component';
import { YeardashboardComponent } from './dashboards/yeardashboard/yeardashboard.component';
import { EntryCreateComponent } from './entries/entry-create/entry-create.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';
import { ContractdashboardComponent } from './dashboards/contractdashboard/contractdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: EntryCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'monthdashboard',
    component: MonthDashboardComponent,
  },
  {
    path: 'yeardashboard',
    component: YeardashboardComponent,
  },

  {
    path: 'contractdashboard',
    component: ContractdashboardComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
