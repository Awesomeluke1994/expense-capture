import {ExpenseType} from "../enums/expense-types.enum";

export interface ExpenseItemState {
  id: number;
  name: string;
  description: string;
  expenseType: ExpenseType;
  expenseDate: string;
  value: number;
}
