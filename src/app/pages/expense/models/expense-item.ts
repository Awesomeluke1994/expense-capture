import { ExpenseType } from '../enums/expense-types.enum';

export class ExpenseItem {
    id: number;
    name: string;
    description: string;
    expenseType: ExpenseType;
    expenseDate: Date;
    value: number;
  }
  