import {createReducer, on} from "@ngrx/store";
import {ExpenseActions} from "../expense-action-types";
import {ExpenseItemState} from "../models/expense-item-state";

export interface ExpenseState {
  expenses: ExpenseItemState[];
}

export const initialAuthSate: ExpenseState = {
  expenses: []
}

export const expenseReducer = createReducer(
  initialAuthSate,
  on(ExpenseActions.allExpensesLoaded, (state, action) => {
    return {...state, expenses: action.expenses}
  })
)


