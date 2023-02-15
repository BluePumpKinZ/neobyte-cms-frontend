import {Component, Inject, OnInit} from '@angular/core';
import {Site} from "../../models/Site";
import {SiteService} from "../../services/site.service";
import {Page} from "../../models/Page";
import {PageService} from "../../services/page.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent  implements OnInit {
  pages: Page[] | undefined;
  siteId: string | undefined;
  selectedPage: Page | undefined;
  constructor(
    private _pagesService: PageService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    @Inject('BASE_API_URL') private baseUrl: string
              ) { }

  selectPage(page: Page) {
    this.selectedPage = page;
  }

  getRenderURL() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+"websites/"+this.siteId+"/pages/"+this.selectedPage!.id+"/render");
  }
  ngOnInit(): void {
    this.siteId = this._route.snapshot.paramMap.get('siteId')!;
    this._pagesService.getPages(this.siteId).subscribe(pages => {
      this.pages = pages;
    });
  }
}
