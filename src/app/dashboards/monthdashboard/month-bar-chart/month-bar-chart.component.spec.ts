import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthBarChartComponent } from './month-bar-chart.component';

describe('MonthBarChartComponent', () => {
  let component: MonthBarChartComponent;
  let fixture: ComponentFixture<MonthBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
