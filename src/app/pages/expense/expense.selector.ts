import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ExpenseState} from "./reducers";

export const selectExpenseState = createFeatureSelector<ExpenseState>("expense");

export const getAllExpenses = createSelector(
  selectExpenseState,
  (expenseState) => expenseState.expenses
)

export const getAllExpensesByLatest = createSelector(
  getAllExpenses,
  (allExpenses) => {
    return [...allExpenses].reverse();
  }
);
