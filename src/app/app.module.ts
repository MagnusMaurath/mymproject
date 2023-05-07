import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from "@angular/cdk/overlay";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxButtonModule,
  DxTemplateModule,
  DxPieChartModule,
  DxChartModule,

} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { EntryCreateComponent } from './entries/entry-create/entry-create.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';
import { EntriesService } from './entries/entries.service';
import { LoginComponent } from './auth/login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MonthDashboardComponent } from './dashboards/monthdashboard/monthdashboard.component';
import { EntryTableComponent } from './entries/entry-table/entry-table/entry-table.component';
import { ActivityListComponent } from './dashboards/monthdashboard/activity-list/activity-list.component';
import { MonthPieChartComponent } from './dashboards/monthdashboard/month-pie-chart/month-pie-chart.component';
import { MonthFilterListComponent } from './dashboards/monthdashboard/month-filter-list/month-filter-list.component';
import { SidenavComponent } from './header/sidenav/sidenav.component';
import { ThreeStatsListComponent } from './shared/three-stats-list/three-stats-list.component';
import { HeadlineComponent } from './shared/headline/headline.component';
import { ContractdashboardComponent } from './dashboards/contractdashboard/contractdashboard.component';
import { ContractFilterComponent } from './dashboards/contractdashboard/contract-filter/contract-filter.component';
import { MonthBarChartComponent } from './dashboards/monthdashboard/month-bar-chart/month-bar-chart.component';
import { TogglebuttonComponent } from './shared/buttons/togglebutton/togglebutton.component';
import { NormalCardComponent } from './shared/cards/normal-card/normal-card.component';
import { TestbuttonComponent } from './shared/buttons/testbutton/testbutton.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { YeardashboardComponent } from './dashboards/yeardashboard/yeardashboard.component';
import { YearFilterListComponent } from './dashboards/yeardashboard/year-filter-list/year-filter-list.component';
import { CreateEntryModalComponent } from './header/create-entry-modal/create-entry-modal.component';
@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    EntryCreateComponent,
    EntryListComponent,
    LoginComponent,
    MonthDashboardComponent,
    EntryTableComponent,
    ActivityListComponent,
    MonthPieChartComponent,
    MonthFilterListComponent,
    SidenavComponent,
    ThreeStatsListComponent,
    HeadlineComponent,
    ContractdashboardComponent,
    ContractFilterComponent,
    MonthBarChartComponent,
    TogglebuttonComponent,
    NormalCardComponent,
    TestbuttonComponent,
    YeardashboardComponent,
    YearFilterListComponent,
    CreateEntryModalComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    DxPieChartModule,
    DxChartModule,
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    NgxChartsModule,
    MatIconModule,
    MatSlideToggleModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    MatMenuModule,
    OverlayModule,
    MatDatepickerModule,
    MatNativeDateModule, // hier einfügen
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
