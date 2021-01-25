import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ExpenseState, SortExpensesOrders} from "./reducers";
import {EXPENSE_STORE_KEY} from "./expense-store";

export const selectExpenseState = createFeatureSelector<ExpenseState>(EXPENSE_STORE_KEY);

export const getAllExpenses = createSelector(
  selectExpenseState,
  (expenseState) => expenseState.expenses
)

export const getAllExpensesCount = createSelector(
  getAllExpenses,
  (allExpenses) => allExpenses.length
)

export const getAllExpensesByLatestId = createSelector(
  getAllExpenses,
  (allExpenses) => {
    return [...allExpenses].sort((a, b) => b.id - a.id)
  }
);

export const getAllExpensesByDate = createSelector(
  getAllExpenses,
  (allExpenses) => {
    return [...allExpenses].sort((a, b) => b.expenseDate.localeCompare(a.expenseDate));
  }
)

export const getSortedByEnum = createSelector(
  selectExpenseState,
  (state) => state.sortedBy
)

export const isSortedByRecentDate = createSelector(
  getSortedByEnum,
  (sortedBy) => sortedBy === SortExpensesOrders.byRecentDate
)

export const isSortedByNewlyCreated = createSelector(
  getSortedByEnum,
  (sortedBy) => sortedBy === SortExpensesOrders.byRecentlyAdded
)

export const getAllExpensesSorted = createSelector(
  getSortedByEnum,
  getAllExpensesByDate,
  getAllExpensesByLatestId,
  ((isSortedByRecentExpenses, allExpensesByDate, allExpensesByLatestId) => {
    return isSortedByRecentExpenses === SortExpensesOrders.byRecentDate ? allExpensesByDate : allExpensesByLatestId;
  })
)
