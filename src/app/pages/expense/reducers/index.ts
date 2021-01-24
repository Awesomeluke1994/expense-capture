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
  on(ExpenseActions.createExpense, ((state, action) => {
    console.log("hello?")
    let expenses = [...state.expenses, action.expenseItem];
    return {...state, expenses: expenses}
   }))
)
