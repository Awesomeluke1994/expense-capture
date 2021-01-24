import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpensePageComponent} from "./pages/expense/expense-page/expense-page.component";
import {ExpenseModule} from "./pages/expense/expense.module";

const routes: Routes = [
  {path: 'expense-claim', component: ExpensePageComponent, loadChildren: () => ExpenseModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
