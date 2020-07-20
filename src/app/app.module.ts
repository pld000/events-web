import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBusyModule } from 'ng-busy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { EventsApiService } from "./services/events-api.service";
import { SearchEventsComponent } from './components/search-events/search-events.component';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { FileUploadService } from "./services/file-upload.service";

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgBusyModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    EventFormComponent,
    WarningModalComponent,
    SearchEventsComponent,
    EventDetailsModalComponent,
  ],
  providers: [
    EventsApiService,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
