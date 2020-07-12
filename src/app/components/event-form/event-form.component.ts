import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEvent } from '../../interfaces/i-event.interface';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IEvent>();
  @Output() onError = new EventEmitter<any>();

  public eventForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.eventForm = this._fb.group({
      fio: ['', Validators.required],
      department: ['', Validators.required],
      // eventsList: [, Validators.required],
      theme: ['', Validators.required],
      content: ['', Validators.required],
      // attachment: ['', Validators.required],
    });
  }

  public submit() {
    if (this.eventForm.valid) {
      this.onSubmit.next(this.eventForm.value);
    } else {
      this.onError.next(this._getFormErrors(this.eventForm));
    }
  }

  private _getFormErrors(form: FormGroup) {

  }
}
