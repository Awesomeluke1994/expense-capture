import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ExpenseItem} from "../models/expense-item";


@Injectable()
export class ExpenseService {
  constructor() {
  }

  public getItems(): Observable<ExpenseItem[]> {
    let expenseItem: ExpenseItem[] = JSON.parse(window.localStorage.getItem('expenses'));
    if(!expenseItem) {
      expenseItem = [];
    }
    expenseItem.map(expenseItem => expenseItem.expenseDate = new Date(expenseItem.expenseDate));
    return of(expenseItem)
  }

  public addItem(addItem: ExpenseItem): Observable<void> {
    let expenseItems: ExpenseItem[] = JSON.parse(window.localStorage.getItem('expenses'));
    if (!expenseItems) {
      expenseItems = [];
    }
    expenseItems.push(addItem);
    window.localStorage.setItem('expenses', JSON.stringify(expenseItems));
    return of()
  }

  deleteItem(deleteItem) {
    //you can use this to update the storage when you delete an expense item.
  }
}
