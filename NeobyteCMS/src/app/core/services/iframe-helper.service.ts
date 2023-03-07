import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IframeHelperService {

  constructor(private http: HttpClient) {
  }

  disableInteractions(iframe: HTMLIFrameElement) {
    const doc = iframe.contentWindow!.document;

    // Prevent clicks on links and image maps
    [...doc.querySelectorAll('a, area')].map(element => {
      if (!element.closest('.cms-editable')) {
        element.addEventListener('click', event => event.preventDefault());
      }
    });


    // Prevent labels from assigning focus to inputs
    [...doc.querySelectorAll('label[for]')].map(element => {
      element.addEventListener('click', event => event.preventDefault());
    });

    // Prevent submit forms
    [...doc.querySelectorAll('[type="submit"]')].map(element => {
      element.addEventListener('click', event => event.preventDefault());
    });

    // Make inputs readonly
    [...doc.querySelectorAll('input, textarea')].map(element => {
      if (!element.closest('.cms-editable')) {
        element.addEventListener('focus', event => event.preventDefault());
      }
    });

    // Prevent form submissions
    [...doc.querySelectorAll('form')].map(element => {
      if (!element.closest('.cms-editable')) {
        element.addEventListener('submit', event => event.preventDefault());
      }
    });
  }

  simulateClicks(iframe: HTMLIFrameElement, parentDoc: Document) {
    const doc = iframe.contentWindow!.document;

    doc.addEventListener('click', () => {
      ['mousedown', 'mouseup', 'click'].map(eventType => {
        const event = parentDoc.createEvent('MouseEvents');
        event.initEvent(eventType, true, true);
        parentDoc.body.dispatchEvent(event);
      });
    });
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
