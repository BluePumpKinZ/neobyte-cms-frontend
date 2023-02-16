import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../services/message.service";
import {SnippetService} from "../../../services/snippet.service";

@Component({
  selector: 'app-edit-snippet',
  templateUrl: './edit-snippet.component.html',
  styleUrls: ['./edit-snippet.component.css']
})
export class EditSnippetComponent {
  siteId: string;
  content : string | undefined;
  config = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'htmlmixed'
  };
  @ViewChild('codeeditor') private codeEditor: any;

  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _snippetsService: SnippetService,
  ) {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
  }

  saveSnippet(snippet: any) {
    if (snippet.id) {
      this._snippetsService.updateSnippet(this.siteId, snippet).subscribe(
        () => {
          this._messageService.add({type: 'success', title: 'Snippet', description: 'Snippet updated'});
        }
      );
    } else {
      this._snippetsService.addSnippet(this.siteId, snippet).subscribe(
        () => {
          this._messageService.add({type: 'success', title: 'Snippet', description: 'Snippet created'});
        }
      );
    }
  }

}
