import { Component, OnInit } from '@angular/core';
import {ExpenseItem} from "../models/expense-item";
import {ExpenseType} from "../enums/expense-types.enum";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ExpenseActions} from "../expense-action-types";
import {getAllExpenses} from "../expense.selector";
import {ExpenseItemState} from "../models/expense-item-state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.scss']
})
export class ExpensePageComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    expenseType: new FormControl(),
    expenseDate: new FormControl(),
    value: new FormControl()
  });
  public expenseTypes = ExpenseType
  public allExpenses$: Observable<ExpenseItemState[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.allExpenses$ = this.store.select(getAllExpenses)
  }

  public submitExpense() {
    let expenseItem = this.form.value as ExpenseItem;
    this.store.dispatch(ExpenseActions.createExpense({
      expenseItem: {
        description: expenseItem.description,
        expenseType: expenseItem.expenseType,
        expenseDate: expenseItem.expenseDate.toISOString(),
        name: expenseItem.name,
        value: expenseItem.value,
        id: 1
      }
    }))
    this.form.reset();
  }
}
