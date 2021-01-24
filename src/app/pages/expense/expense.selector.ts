import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ExpenseState} from "./reducers";

export const selectExpenseState = createFeatureSelector<ExpenseState>("expense");

export const getAllExpenses = createSelector(
  selectExpenseState,
  (expenseSate) => expenseSate.expenses
)
