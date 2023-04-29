import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStatsListComponent } from './three-stats-list.component';

describe('ThreeStatsListComponent', () => {
  let component: ThreeStatsListComponent;
  let fixture: ComponentFixture<ThreeStatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeStatsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeStatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
