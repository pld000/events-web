import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { EventsApiService } from "../../services/events-api.service";
import { IEvent } from "../../interfaces/i-event.interface";
import { NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.scss']
})
export class SearchEventsComponent implements OnInit {
  @Output() onEventFound = new EventEmitter<NgbTypeaheadSelectItemEvent<IEvent>>();
  public model: any;

  constructor(private eventsApi: EventsApiService) {
  }

  ngOnInit(): void {
  }

  public formatter(event: IEvent) {
    return event.theme;
  }

  public search(text$: Observable<string>) {
    return text$.pipe(
      filter((term) => term && term.length >= 3),
      debounceTime(300),
      switchMap((term) => {
        return this.eventsApi.searchEvents(term);
      })
    );
  }
}
