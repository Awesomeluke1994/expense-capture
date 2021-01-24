import {ExpenseType} from "../enums/expense-types.enum";

export class ExpenseItemRequest {
  name: string;
  description: string;
  expenseType: ExpenseType;
  expenseDate: string;
  value: number;
}
