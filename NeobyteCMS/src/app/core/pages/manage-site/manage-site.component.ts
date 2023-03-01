import {Component, OnInit} from '@angular/core';
import {SiteDetails} from "../../models/Site";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebsiteService} from "../../services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.css']
})
export class ManageSiteComponent implements OnInit {
  site: SiteDetails | undefined;

  constructor(
    private _messageService: MessageService,
    private _siteService: WebsiteService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  testConnection() {
    this._messageService.add({type: 'info', title: 'Test Connection', description: 'Testing connection...'});
  }

  onUpdateSite() {
    this._messageService.add({type: 'info', title: 'Update Site', description: 'Updating site...'});
    if (this.site) {
      this._siteService.updateSite(this.site).subscribe(res => {
        this._router.navigate(['/manage-site']);
      });
    }
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('siteId')!;
    this._siteService.getSite(id).subscribe(site => {
      this.site = site;
    });
  }

}
