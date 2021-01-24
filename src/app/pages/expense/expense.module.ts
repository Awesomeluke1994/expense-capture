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



@NgModule({
  declarations: [ExpensePageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('expense', expenseReducer),
    EffectsModule.forFeature([ExpenseEffects])
  ],
  providers: [
    ExpenseService,
  ]
})
export class ExpenseModule { }
