import {Component, ViewChild} from '@angular/core';



@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.css']
})
export class EditSourceComponent {
  content: string = `# Hello World`;
  config = {
    lineNumbers: true,
    mode: 'htmlmixed'
  };
  @ViewChild('codeeditor') private codeEditor: any;

  constructor() {}

  getText() {
    alert(this.codeEditor.codeMirror.getValue());
  }
}
