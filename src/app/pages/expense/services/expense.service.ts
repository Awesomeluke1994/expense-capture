import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ExpenseItem} from "../models/expense-item";
import {ExpenseItemRequest} from "../models/expense-item-request";
import {ExpenseItemState} from "../models/expense-item-state";


@Injectable()
export class ExpenseService {

  protected static readonly EXPENSE_KEY = 'expenses';

  protected static readonly HIGHEST_ID_KEY = 'highestId';

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

  public addItem(expenseItemToAdd: ExpenseItemState): Observable<ExpenseItemState> {
    let expenseItems: ExpenseItem[] = ExpenseService.getExpenseItems();
    if (!expenseItems) {
      expenseItems = [];
    }
    let nextId = ExpenseService.getNextIdAndIncrement();
    expenseItems.push({
      expenseDate: new Date(expenseItemToAdd.expenseDate),
      value: expenseItemToAdd.value,
      name: expenseItemToAdd.name,
      description: expenseItemToAdd.description,
      expenseType: expenseItemToAdd.expenseType,
      id: nextId
    });
    ExpenseService.storeExpenses(expenseItems);
    return of({...expenseItemToAdd, id: nextId})
  }

  public deleteItem(expenseId: number): Observable<number> {
    let expenses = ExpenseService.getExpenseItems();
    let newExpenses = expenses.filter(value => value.id != expenseId);
    ExpenseService.storeExpenses(newExpenses);
    return of(expenseId)
  }

  private static getNextIdAndIncrement(): number {
    let id = parseInt(window.localStorage.getItem(this.HIGHEST_ID_KEY));
    let newId = id ? id + 1 : 1;
    this.setId(newId);
    return newId
  }

  private static setId(nextId: number): void {
    window.localStorage.setItem(this.HIGHEST_ID_KEY, nextId.toString())
  }

  private static getExpenseItems(): ExpenseItem[] {
    return JSON.parse(window.localStorage.getItem(this.EXPENSE_KEY));
  }

  private static storeExpenses(expenseItems: ExpenseItem[]) {
    window.localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(expenseItems));
  }
}
