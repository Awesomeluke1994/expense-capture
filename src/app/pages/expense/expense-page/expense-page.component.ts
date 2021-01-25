import {Component, OnInit} from '@angular/core';
import {ExpenseItem} from "../models/expense-item";
import {ExpenseType} from "../enums/expense-types.enum";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ExpenseActions} from "../expense-action-types";
import {getAllExpensesByLatest} from "../expense.selector";
import {ExpenseItemState} from "../models/expense-item-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.scss']
})
export class ExpensePageComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expenseType: new FormControl('', [Validators.required]),
    expenseDate: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });
  public expenseTypes = ExpenseType
  public allExpenses$: Observable<ExpenseItemState[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.getAllExpenses());
    this.allExpenses$ = this.store.select(getAllExpensesByLatest)
  }

  public submitExpense(form: FormGroupDirective): void {
    let expenseItem = this.form.value as ExpenseItem;
    this.store.dispatch(ExpenseActions.createExpense(
      {
        description: expenseItem.description,
        expenseType: expenseItem.expenseType,
        expenseDate: expenseItem.expenseDate.toISOString(),
        name: expenseItem.name,
        value: expenseItem.value
      }
    ))
    form.resetForm();
  }

  public deleteExpense(expenseId: number): void {
    this.store.dispatch(ExpenseActions.deleteExpense({expenseId: expenseId}))
  }

  public identify(index, item) {
    return item.id;
  }
}
