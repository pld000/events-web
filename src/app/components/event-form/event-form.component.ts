import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEvent } from '../../interfaces/i-event.interface';
import { EVENT_FORM_CONTROLS_NAME } from '../../constants/common.constants';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IEvent>();
  @Output() onError = new EventEmitter<any>();

  public eventForm: FormGroup;
  public isSubmitted = false;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.eventForm = this._fb.group({
      fio: ['', Validators.required],
      department: ['', Validators.required],
      // eventsList: [, Validators.required],
      theme: ['', Validators.required],
      content: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      const now = new Date();
      this.onSubmit.next(Object.assign({}, this.eventForm.value, {
        date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      }));
    } else {
      this.onError.next(this._getFormErrors(this.eventForm));
    }
  }

  public clear() {
    this.eventForm.reset();
    this.isSubmitted = false;
  }

  private _getFormErrors(form: FormGroup) {
    const formErrors = [];

    Object.keys(this.eventForm.controls).forEach((controlKey) => {
      const control = this.eventForm.controls[controlKey];

      if (control.errors && control.errors.required) {
        formErrors.push(EVENT_FORM_CONTROLS_NAME[controlKey]);
      }
    });
    return formErrors;
  }
}
