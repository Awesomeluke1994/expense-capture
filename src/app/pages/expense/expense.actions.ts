import {createAction, props} from "@ngrx/store";
import {ExpenseItem} from "./models/expense-item";
import {ExpenseItemState} from "./models/expense-item-state";

export const getAllExpenses = createAction(
  "[Expense-page] Get All Expenses"
)

export const createExpense = createAction(
  "[Expense-page] Create New Expense",
  props<{expenseItem: ExpenseItemState}>()
);

export const allExpensesLoaded = createAction(
  "[Expense-effect] All Expenses Loaded",
  props<{expenses: ExpenseItemState[]}>()
)
