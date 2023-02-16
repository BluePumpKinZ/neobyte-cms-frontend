import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IframeHelperService {

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let objectUrl: string = "";
      this.http.get(url, {responseType: 'blob'})
        .subscribe(m => {
          objectUrl = URL.createObjectURL(m);
          observer.next(objectUrl);
        });
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = "";
        }
      };
    });
  }
}
