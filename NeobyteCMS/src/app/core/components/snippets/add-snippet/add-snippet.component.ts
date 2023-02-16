import {Component, OnInit} from '@angular/core';
import {Snippet} from "../../../models/Snippet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {SiteService} from "../../../services/site.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnippetService} from "../../../services/snippet.service";

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.css']
})
export class AddSnippetComponent implements OnInit {
  snippet: Snippet | undefined;
  config = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'htmlmixed'
  };
  createSnippetForm: FormGroup;
  loading = false;
  siteId: string = '';
  error = '';
  code: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _snippetService: SnippetService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.createSnippetForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      content: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  saveSnippet(snippet: any) {
    console.log(snippet);
  }

  onCreateSnippet() {
    if (this.createSnippetForm.valid) {
      this.loading = true;
      this.error = '';
      this._snippetService.addSnippet(this.siteId,this.createSnippetForm.value)
        .subscribe(
          (data: Snippet) => {
            this.loading = false;
            console.log("Snippet is created");
            this._router.navigate(['/sites', this.siteId, 'snippets'])
          },
          (error) => {
            console.log("Error creating snippet");
            this.error = error;
            this.loading = false;
          }
        );
    }
  }

  ngOnInit(): void {
    this.siteId = this._route.parent?.snapshot.paramMap.get('siteId')!;
    console.log(this.siteId);
  }


}
