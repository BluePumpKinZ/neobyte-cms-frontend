import {Component, OnInit} from '@angular/core';
import {SnippetService} from "../../../services/snippet.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../services/message.service";
import {Snippet} from "../../../models/Snippet";

@Component({
  selector: 'app-list-snippet',
  templateUrl: './list-snippet.component.html',
  styleUrls: ['./list-snippet.component.css']
})
export class ListSnippetComponent implements OnInit {

  snippets: Snippet[] | undefined;
  selectedSnippet: Snippet | undefined;
  siteId: string;

  constructor(
    private _snippetsService: SnippetService,
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
  }

  ngOnInit(): void {
    this._snippetsService.getSnippets(this.siteId).subscribe((snippets) => {
      this.snippets = snippets;
    });
  }

  selectSnippet(snippet: Snippet) {
    console.log(snippet);
    this.selectedSnippet = snippet;
  }

  deleteSnippet() {
    if (this.selectedSnippet) {
      this._snippetsService.deleteSnippet(this.siteId, this.selectedSnippet).subscribe(() => {
        this.snippets = this.snippets!.filter((s) => s.id !== this.selectedSnippet!.id);
      });
    } else {
      this._messageService.add({type: 'danger', title: 'Snippet', description: 'No snippet selected'});
    }
  }
}
