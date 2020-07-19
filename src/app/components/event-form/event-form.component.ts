import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IEvent } from '../../interfaces/i-event.interface';
import { EVENT_FORM_CONTROLS_NAME } from '../../constants/common.constants';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnChanges {
  @Input() event: IEvent;
  @Input() detailsView = false;
  @Output() onSubmit = new EventEmitter<FormData>();
  @Output() onError = new EventEmitter<any>();

  public eventForm: FormGroup;
  public isSubmitted = false;
  public fileSource: any;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.eventForm = this._fb.group({
      fio: ['', Validators.required],
      department: ['', Validators.required],
      theme: ['', Validators.required],
      content: ['', Validators.required],
      file: ['', Validators.required],
    });

    const { id, date, time, ...rest } = this.event;
    this.eventForm.setValue(rest);

    if (this.detailsView) {
      this.eventForm.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSubmitted = false;
  }

  public onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSource = event.target.files[0];
    }
  }

  public submit() {
    this.isSubmitted = true;
    if (this.eventForm.valid) {
      const formData = new FormData();
      const now = new Date();
      const eventData = Object.assign({}, this.eventForm.value, {
        date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      })

      for (const formField in eventData) {
        if (formField === 'file') {
          formData.append('file', this.fileSource);
        } else {
          formData.append(formField, eventData[formField]);
        }
      }

      this.onSubmit.next(formData);
      // const now = new Date();
      // this.onSubmit.next(Object.assign({}, this.eventForm.value, {
      //   date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
      //   time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      // }));
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
