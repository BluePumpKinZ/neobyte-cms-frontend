import {AfterViewInit, Component, ComponentRef, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IframeHelperService} from "../../services/iframe-helper.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements AfterViewInit, OnInit {
  @ViewChild('content_edit') iframe!: ElementRef<HTMLIFrameElement>;
  siteId: string | undefined;
  pageId: string | undefined;
  constructor(
    private _route: ActivatedRoute,
    private _iframeHelper: IframeHelperService,
  ) { }



  ngAfterViewInit(): void {
  }


  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this.pageId = this._route.snapshot.paramMap.get('pageId')!;
    this._iframeHelper.get(`websites/${this.siteId}/pages/${this.pageId}/render`).subscribe(blob =>this.iframe.nativeElement.src = blob);
  }
}

