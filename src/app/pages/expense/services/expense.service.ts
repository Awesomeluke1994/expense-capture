import {Injectable} from "@angular/core";


@Injectable()
export class ExpenseService {
  constructor() {
  }

  getItems() {
    //you can use this to get the expense items from the local storage using window.localStorage.getItem() method.
  }

  addItem(addItem: string) {
    //you can use this to store the expense items from the local storage using window.localStorage.setItem() method.
  }

  deleteItem(deleteItem) {
    //you can use this to update the storage when you delete an expense item.
  }
}
