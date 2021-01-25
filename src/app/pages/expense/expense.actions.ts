import {createAction, props} from "@ngrx/store";
import {ExpenseItemState} from "./models/expense-item-state";
import {ExpenseItemRequest} from "./models/expense-item-request";

export const getAllExpenses = createAction(
  "[Expense-page] Get All Expenses"
)

export const createExpense = createAction(
  "[Expense-page] Create New Expense",
  props<{ newExpense: ExpenseItemState }>()
);

export const expenseCreated = createAction(
  '[Expense-effect] Expense has been created',
  props<{ newExpense: ExpenseItemState }>()
)

export const allExpensesLoaded = createAction(
  "[Expense-effect] All Expenses Loaded",
  props<{ expenses: ExpenseItemState[] }>()
)

export const deleteExpense = createAction(
  "[Expense Page] Delete Expense",
  props<{ expenseId: number }>()
)

export const expenseDeleted = createAction(
  "[Expense-effect] Delete Expense",
  props<{ expenseId: number }>()
)
