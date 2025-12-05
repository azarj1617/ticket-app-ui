import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintFormComponent } from './main/print-form/print-form.component';
import { TicketEntryComponent } from './main/ticket-entry/ticket-entry.component';

const routes: Routes = [
  {path:'',component:PrintFormComponent},
  {path:'ticket-upload',component:PrintFormComponent},
  {path:'ticket-entry',component:TicketEntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
