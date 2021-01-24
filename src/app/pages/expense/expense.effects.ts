import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ExpenseActions} from "./expense-action-types";
import {concatMap, map, mergeMap} from "rxjs/operators";
import {ExpenseService} from "./services/expense.service";
import {allExpensesLoaded} from "./expense.actions";
import {ExpenseItemState} from "./models/expense-item-state";
import {ExpenseItem} from "./models/expense-item";

@Injectable()
export class ExpenseEffects {

  constructor(private actions$: Actions,
              private expenseService: ExpenseService) {
  }

  getAllExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.getAllExpenses),
      concatMap(action => this.expenseService.getItems()),
      map(expenses => allExpensesLoaded({expenses: expenses.map(expenses => serializeForState(expenses))}))
    )
  );


  createExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.createExpense),
      mergeMap(action => this.expenseService.addItem(deserializeForService(action.expenseItem))),
    ), {dispatch: false}
  )
}

const deserializeForService = (expenseItem: ExpenseItemState): ExpenseItem => {
  return {
    id: expenseItem.id,
    expenseType: expenseItem.expenseType,
    expenseDate: new Date(expenseItem.expenseDate),
    description: expenseItem.description,
    name: expenseItem.name,
    value: expenseItem.value
  }
}

const serializeForState = (expenseItem: ExpenseItem): ExpenseItemState => {
  return {
    id: expenseItem.id,
    expenseType: expenseItem.expenseType,
    expenseDate: expenseItem.expenseDate.toISOString(),
    description: expenseItem.description,
    name: expenseItem.name,
    value: expenseItem.value
  }
}
