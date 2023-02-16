import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Site} from "../../models/Site";
import {SiteService} from "../../services/site.service";
import {Page} from "../../models/Page";
import {PageService} from "../../services/page.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {IframeHelperService} from "../../services/iframe-helper.service";

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent  implements OnInit {
  pages: Page[] | undefined;
  siteId: string | undefined;
  selectedPage: Page | undefined;
  @ViewChild('previewIframe') iframe!: ElementRef<HTMLIFrameElement>;
  constructor(
    private _pagesService: PageService,
    private _route: ActivatedRoute,
    private _iframeHelper: IframeHelperService,
              ) { }

  selectPage(page: Page) {
    this.selectedPage = page;
    this._iframeHelper.get(`websites/${this.siteId}/pages/${this.selectedPage!.id}/render`).subscribe(blob =>this.iframe.nativeElement.src = blob);
  }

  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this._pagesService.getPages(this.siteId).subscribe(pages => {
      this.pages = pages;
    });
  }
}
