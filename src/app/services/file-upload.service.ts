import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class FileUploadService {
  readonly _apiBase: string;

  constructor(private _http: HttpClient) {
    this._apiBase = environment.apiBase;
  }

  public getSignedRequest(file) {
    const url = this._apiBase + 'sign-s3';
    return this._http.get(url, {
      params: {
        'file-name': encodeURIComponent(file.name),
        'file-type': encodeURIComponent(file.type)
      }
    });
  }

  public uploadFile(file, signedRequest: string, url: string) {
    return this._http.put(signedRequest, file)
      .pipe(map(() => url));
  }
}
