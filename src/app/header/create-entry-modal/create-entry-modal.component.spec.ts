import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntryModalComponent } from './create-entry-modal.component';

describe('CreateEntryModalComponent', () => {
  let component: CreateEntryModalComponent;
  let fixture: ComponentFixture<CreateEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
