import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IEvent } from "../interfaces/i-event.interface";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class EventsApiService {
  readonly _apiBase: string;

  constructor(private _http: HttpClient) {
    this._apiBase = environment.apiBase;
  }

  public createEvent(event: IEvent) {
    const url = this._apiBase + 'events';
    return this._http.post(url, event)
      .toPromise()
      .then((response) => {
        console.log(response);
      });
  }
}
