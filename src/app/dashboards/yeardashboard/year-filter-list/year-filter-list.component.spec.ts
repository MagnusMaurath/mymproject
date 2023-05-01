import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearFilterListComponent } from './year-filter-list.component';

describe('YearFilterListComponent', () => {
  let component: YearFilterListComponent;
  let fixture: ComponentFixture<YearFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearFilterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
