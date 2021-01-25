import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {ExpenseActions} from "./expense-action-types";
import {concatMap, map, mergeMap} from "rxjs/operators";
import {ExpenseService} from "./services/expense.service";
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
      concatMap(() => this.expenseService.getItems()),
      map(expenses => ExpenseActions.allExpensesLoaded({expenses: expenses.map(expenses => serializeForState(expenses))}))
    )
  );

  createExpense$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ExpenseActions.createExpense),
        mergeMap(expenseToAdd => this.expenseService.addItem(expenseToAdd.newExpense)),
        map(newExpense => ExpenseActions.expenseCreated({newExpense: newExpense}))
    ));

  deleteExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      concatMap(action => this.expenseService.deleteItem(action.expenseId)),
      map(expenseId => ExpenseActions.expenseDeleted({expenseId: expenseId}))
    )
  );
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
