import {AfterViewInit, Component, ComponentRef, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IframeHelperService} from "../../services/iframe-helper.service";
import {PageService} from "../../services/page.service";

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
    private _pageService: PageService,
  ) { }



  ngAfterViewInit(): void {
  }


  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this.pageId = this._route.snapshot.paramMap.get('pageId')!;
    this._iframeHelper.get(`websites/${this.siteId}/pages/${this.pageId}/render`).subscribe(blob =>this.iframe.nativeElement.src = blob);
  }

  onPublishSite() {
    //get the content from the iframe and save it with the pageservice
    this._pageService.updatePage(this.siteId!, this.pageId!, this.iframe.nativeElement.contentDocument!.documentElement.innerHTML).subscribe(
      () => {
        //this._messageService.add({type: 'success', title: 'Page', description: 'Page updated'});
      });
  }
}

