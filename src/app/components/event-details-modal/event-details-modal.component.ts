import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IEvent } from "../../interfaces/i-event.interface";

@Component({
  selector: 'event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.scss']
})
export class EventDetailsModalComponent implements OnInit {
  @Input() event: IEvent;

  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
