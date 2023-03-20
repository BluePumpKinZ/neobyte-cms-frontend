import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements AfterViewInit {

  url = environment.url;
  @ViewChild('tracingframe') iframe!: ElementRef<HTMLIFrameElement>;

  constructor() { }

  ngAfterViewInit(): void {

    //add source to iframe
    this.iframe.nativeElement.src = this.url + 'monitoring/dashboard';

  }

}
