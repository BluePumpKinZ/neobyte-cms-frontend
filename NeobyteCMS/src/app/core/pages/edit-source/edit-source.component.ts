import {Component, ViewChild} from '@angular/core';
import {html_beautify} from "js-beautify";

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.css']
})
export class EditSourceComponent {
  content: string = `<div><div><p>test</p></div></div>`;
  config = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'htmlmixed'
  };
  @ViewChild('codeeditor') private codeEditor: any;

  constructor() {}

  getText() {
    alert(this.codeEditor.codeMirror.getValue());
  }
  //toggle line wrapping
  toggleLineWrapping() {
    this.config.lineWrapping = !this.config.lineWrapping;
  }
  //beautify code in code editor with js-beautify
  beautifyCode() {
    this.content = html_beautify(this.codeEditor.codeMirror.getValue());
  }
}
