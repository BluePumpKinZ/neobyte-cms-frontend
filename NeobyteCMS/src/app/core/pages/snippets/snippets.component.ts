import {Component, OnInit} from '@angular/core';
import {Snippet} from "../../models/Snippet";
import {SnippetService} from "../../services/snippet.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent {
  siteId: string;

  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
  }
}
