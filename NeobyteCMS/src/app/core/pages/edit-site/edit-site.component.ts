import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Site} from "../../models/Site";
import {WebsiteService} from "../../services/website.service";
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

  renamePage(page: Page, newName: string) {
    page.name = newName;
    this._pagesService.updatePage(this.siteId!, page.id, page.name, page.path).subscribe();
  }

  deletePage(page: Page) {
    this.pages = this.pages?.filter(p => p.id !== page.id);
    this._pagesService.deletePage(this.siteId!, page.id).subscribe(
      () => {
        if (this.selectedPage?.id === page.id) {
          this.selectedPage = undefined;
        }
        //clear iframe
        this.iframe.nativeElement.src = '';
      }
    );
  }

  createPage(name: string, path: string) {
    this._pagesService.createPage(this.siteId!, name, path).subscribe(page => {
      this.pages?.push(page);
    });
  }
}
