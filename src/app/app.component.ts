import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningModalComponent } from "./components/warning-modal/warning-modal.component";
import { IEvent } from "./interfaces/i-event.interface";
import { EventsApiService } from "./services/events-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _modalService: NgbModal,
              private _eventsApi: EventsApiService) {
  }

  public showWarning(errors: any) {
    const modalRef = this._modalService.open(WarningModalComponent);
    modalRef.componentInstance.errors = errors;
  }

  public createEvent(event: IEvent) {
    return this._eventsApi.createEvent(event);
  }
}
