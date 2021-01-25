import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpenseService} from "./services/expense.service";
import { ExpensePageComponent } from './expense-page/expense-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {expenseReducer} from "./reducers";
import {EffectsModule} from "@ngrx/effects";
import {ExpenseEffects} from "./expense.effects";
import {MatIconModule} from "@angular/material/icon";
import { ExpenseCardComponent } from './components/expense-card/expense-card.component';
import { ExpensePageFormComponent } from './components/expense-page-form/expense-page-form.component';
import {EXPENSE_STORE_KEY} from "./expense-store";



@NgModule({
  declarations: [ExpensePageComponent, ExpenseCardComponent, ExpensePageFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(EXPENSE_STORE_KEY, expenseReducer),
    EffectsModule.forFeature([ExpenseEffects]),
    MatIconModule
  ],
  exports: [
    ExpensePageComponent
  ],
  providers: [
    ExpenseService,
  ]
})
export class ExpenseModule { }
