import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ExpenseItem} from "../../models/expense-item";
import {ExpenseType} from "../../enums/expense-types.enum";

@Component({
  selector: 'expense-page-form',
  templateUrl: './expense-page-form.component.html',
  styleUrls: ['./expense-page-form.component.scss']
})
export class ExpensePageFormComponent implements OnInit {

  @Output() public formSubmitted: EventEmitter<ExpenseItem> = new EventEmitter();
  public form: FormGroup
  public expenseTypes = ExpenseType
  public todayDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.todayDate = new Date()
    this.createForm();
  }

  public submitExpense(form: FormGroupDirective): void {
    let expenseItem = this.form.value as ExpenseItem;
    this.formSubmitted.emit(expenseItem);
    form.resetForm();
    this.form.patchValue({'expenseDate': this.todayDate})
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      expenseType: new FormControl('', [Validators.required]),
      expenseDate: new FormControl(this.todayDate, [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
  }
}
