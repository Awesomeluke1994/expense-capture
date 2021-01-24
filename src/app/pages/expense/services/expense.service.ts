import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ExpenseItem} from "../models/expense-item";
import {ExpenseItemRequest} from "../models/expense-item-request";


@Injectable()
export class ExpenseService {
  constructor() {
  }

  public getItems(): Observable<ExpenseItem[]> {
    let expenseItem: ExpenseItem[] = ExpenseService.getExpenseItems();
    if(!expenseItem) {
      expenseItem = [];
    }
    expenseItem.map(expenseItem => expenseItem.expenseDate = new Date(expenseItem.expenseDate));
    return of(expenseItem)
  }



  public addItem(addItem: ExpenseItemRequest): Observable<number> {
    let expenseItems: ExpenseItem[] = ExpenseService.getExpenseItems();
    if (!expenseItems) {
      expenseItems = [];
    }
    let nextId = ExpenseService.getNextId();
    expenseItems.push({
      expenseDate: new Date(addItem.expenseDate),
      value: addItem.value,
      name: addItem.name,
      description: addItem.description,
      expenseType: addItem.expenseType,
      id: nextId
    });
    ExpenseService.storeExpenses(expenseItems);
    return of(nextId)
  }

  public deleteItem(expenseId: number): Observable<void> {
    let expenses = ExpenseService.getExpenseItems();
    let newExpenses = expenses.filter(value => value.id != expenseId);
    ExpenseService.storeExpenses(newExpenses);
    return of(null)
  }

  private static getNextId(): number {
    let expenseItems = ExpenseService.getExpenseItems();
    if(expenseItems.length === 0) {return 1}
    return Math.max(...expenseItems.map(item => item.id)) + 1;
  }

  private static getExpenseItems(): ExpenseItem[] {
    return JSON.parse(window.localStorage.getItem('expenses'));
  }

  private static storeExpenses(expenseItems: ExpenseItem[]) {
    window.localStorage.setItem('expenses', JSON.stringify(expenseItems));
  }
}
