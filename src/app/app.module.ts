import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrintFormComponent } from './main/print-form/print-form.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsComponent } from './shared-ui-components/alerts/alerts.component';
import { TicketEntryComponent } from './main/ticket-entry/ticket-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintFormComponent,
    NavBarComponent,
    AlertsComponent,
    TicketEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
