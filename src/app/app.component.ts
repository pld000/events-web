import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { WarningModalComponent } from "./components/warning-modal/warning-modal.component";
import { IEvent } from "./interfaces/i-event.interface";
import { EventsApiService } from "./services/events-api.service";
import { EventDetailsModalComponent } from "./components/event-details-modal/event-details-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public event: IEvent;
  public isAlertVisible = false;

  constructor(private _modalService: NgbModal,
              private _eventsApi: EventsApiService,) {
  }

  ngOnInit(): void {
    this.event = this._getEmptyEvent();
  }

  public showEventDetails(typeaheadItem: NgbTypeaheadSelectItemEvent<IEvent>) {
    const { item } = typeaheadItem;
    const modalRef = this._modalService.open(EventDetailsModalComponent);
    modalRef.componentInstance.event = item;
  }

  public showWarning(errors: any) {
    const modalRef = this._modalService.open(WarningModalComponent);
    modalRef.componentInstance.errors = errors;
  }

  public createEvent(event: IEvent) {
    return this._eventsApi.createEvent(event)
      .toPromise()
      .then(() => this.event = this._getEmptyEvent())
      .then(() => this._showAlert());
  }

  private _getEmptyEvent() {
    return {
      fio: '', department: '', theme: '', content: '', file: '',
    } as IEvent;
  }

  private _showAlert() {
    this.isAlertVisible = true;
    setTimeout(() => this.isAlertVisible = false, 3000);
  }
}
