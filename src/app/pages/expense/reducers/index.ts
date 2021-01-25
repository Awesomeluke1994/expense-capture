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
  }),
  on(ExpenseActions.expenseCreated, (state, action) => {
    return {...state, expenses: [...state.expenses, action.newExpense]}
  }),
  on(ExpenseActions.expenseDeleted, (state, action) => {
    return {...state, expenses: [...state.expenses].filter(value => value.id != action.expenseId)}
  })
)


