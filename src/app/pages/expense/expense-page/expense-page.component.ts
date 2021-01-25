import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExpenseItem} from "../models/expense-item";
import {ExpenseType} from "../enums/expense-types.enum";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ExpenseActions} from "../expense-action-types";
import {getAllExpensesByLatestId, getAllExpensesCount} from "../expense.selector";
import {ExpenseItemState} from "../models/expense-item-state";
import {Observable} from "rxjs";
import {animate, keyframes, sequence, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.scss'],
  animations: [
    trigger('aatext', [
      transition(':enter', [
        style({opacity: 0}),
        sequence([
          animate(".41s ease-in", style({transform: 'scale(0)', opacity: 0})),
          animate(".19s ease-out", style({transform: 'scale(1)', opacity: 1})),
          animate(".19s ease-in", style({transform: 'scale(0.7)', })),
          animate(".10s ease-out", style({transform: 'scale(1)',})),
          animate(".09s ease-in", style({transform: 'scale(0.84)'})),
          animate(".07s ease-out", style({transform: 'scale(1)'})),
          animate(".06s ease-in", style({transform: 'scale(0.95)'})),
          animate(".01s ease-out", style({transform: 'scale(1)'})),
        ])
      ]),
      transition(':leave', [
        animate('0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)', keyframes([
            style({transform: 'translate(0)', opacity: 1}),
            style({transform: 'translate(1000px)', opacity: 0}),
          ])
        )
      ])
    ])
  ]
})
export class ExpensePageComponent implements OnInit {

  public allExpenses$: Observable<ExpenseItemState[]>;
  public allExpensesCount$: Observable<number>;

  @ViewChild('cardContainer') container: ElementRef;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(ExpenseActions.getAllExpenses());
    this.allExpenses$ = this.store.select(getAllExpensesByLatestId);
    this.allExpensesCount$ = this.store.select(getAllExpensesCount);
  }

  public submitExpense(expenseItem: ExpenseItem): void {
    this.store.dispatch(ExpenseActions.createExpense(
      {
        newExpense: {
          description: expenseItem.description,
          expenseType: expenseItem.expenseType,
          expenseDate: expenseItem.expenseDate.toISOString(),
          name: expenseItem.name,
          value: expenseItem.value,
          id: null
        }
      }
    ))
    this.container.nativeElement.scrollTo( 0, 0 );
  }

  public deleteExpense(expenseId: number): void {
    this.store.dispatch(ExpenseActions.deleteExpense({expenseId: expenseId}))
  }
}
