import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePageFormComponent } from './expense-page-form.component';

describe('ExpensePageFormComponent', () => {
  let component: ExpensePageFormComponent;
  let fixture: ComponentFixture<ExpensePageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
