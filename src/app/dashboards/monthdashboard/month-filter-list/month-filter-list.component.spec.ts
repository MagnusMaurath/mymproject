import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFilterListComponent } from './month-filter-list.component';

describe('MonthFilterListComponent', () => {
  let component: MonthFilterListComponent;
  let fixture: ComponentFixture<MonthFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthFilterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
