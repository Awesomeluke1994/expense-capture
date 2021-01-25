import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ExpenseItem} from "../../models/expense-item";
import {ExpenseType} from "../../enums/expense-types.enum";

@Component({
  selector: 'expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.scss']

})
export class ExpenseCardComponent implements OnInit {

  @Output() public deleteClicked: EventEmitter<void> = new EventEmitter();
  @Input() public expenseItem: ExpenseItem
  public icon: string

  constructor() {
  }

  ngOnInit(): void {
    this.icon = this.getIcon()
  }

  public deleteHasBeenClicked() {
    this.deleteClicked.emit();
  }

  private getIcon() {
    switch (this.expenseItem.expenseType) {
      case ExpenseType.Accommodation:
        return 'house_rounded';
      case ExpenseType.Food:
        return 'local_dining';
      case ExpenseType.Mileage:
        return 'directions_car';
      case ExpenseType.PublicTransport:
        return 'directions_railway';
      case ExpenseType.Other:
        return 'work'
    }
  }
}
