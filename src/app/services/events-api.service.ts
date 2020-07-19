import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEvent } from "../interfaces/i-event.interface";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

@Injectable()
export class EventsApiService {
  readonly _apiBase: string;

  constructor(private _http: HttpClient) {
    this._apiBase = environment.apiBase;
  }

  public searchEvents(q: string) {
    const url = this._apiBase + 'events';
    return this._http.get(url, { params: { q } });
  }

  public createEvent(formData: FormData) {
    const url = this._apiBase + 'events';
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this._http.post(url, formData, { headers });
  }
}
