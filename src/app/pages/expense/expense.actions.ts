import {createAction, props} from "@ngrx/store";
import {ExpenseItem} from "./models/expense-item";
import {ExpenseItemState} from "./models/expense-item-state";

export const createExpense = createAction(
  "[Expense-page] Create New Expense",
  props<{expenseItem: ExpenseItemState}>()
);

