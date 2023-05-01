import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YeardashboardComponent } from './yeardashboard.component';

describe('YeardashboardComponent', () => {
  let component: YeardashboardComponent;
  let fixture: ComponentFixture<YeardashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YeardashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YeardashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
