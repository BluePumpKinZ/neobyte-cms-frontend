import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements AfterViewInit {

  constructor() {
  }

  ngAfterViewInit() {
    document.getElementById('test')!.innerText = 'Hello World';
  }

}
