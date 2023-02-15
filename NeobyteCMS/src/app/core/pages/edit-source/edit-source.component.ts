import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {html_beautify} from "js-beautify";
import {PageService} from "../../services/page.service";
import {ActivatedRoute} from "@angular/router";
import {SiteService} from "../../services/site.service";

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.css']
})
export class EditSourceComponent implements OnInit {
  content : string | undefined;
  config = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'htmlmixed'
  };
  @ViewChild('codeeditor') private codeEditor: any;

  siteId: string | undefined;
  pageId: string | undefined;
  @Input() websiteURL: string | undefined;

  constructor(
    private _pagesService: PageService,
    private _route: ActivatedRoute,
    private _siteService: SiteService,
  ) {}

  loadSourceCode() {
    this._pagesService.getSource(this.pageId!,this.siteId!).subscribe(content => {
      this.content = content;
    });
  }

  publishCode() {
    this._pagesService.publishSource(this.siteId!,this.pageId!,this.codeEditor.codeMirror.getValue()).subscribe();
  }

  //toggle line wrapping
  toggleLineWrapping() {
    this.config.lineWrapping = !this.config.lineWrapping;
  }
  //beautify code in code editor with js-beautify
  beautifyCode() {
    this.content = html_beautify(this.codeEditor.codeMirror.getValue());
  }

  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this.pageId = this._route.snapshot.paramMap.get('pageId')!;
    this._siteService.getSite(this.siteId!).subscribe(site => {
        this.websiteURL = site.domain;
    });
    this.loadSourceCode();
  }
}
