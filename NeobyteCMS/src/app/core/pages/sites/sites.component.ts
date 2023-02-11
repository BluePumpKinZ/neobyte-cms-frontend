import {Component, OnInit} from '@angular/core';
import {SiteService} from "../../services/site.service";
import {Site} from "../../models/Site";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  sites: Site[] | undefined;
  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
    this.siteService.getAllSites().subscribe(sites => {
      this.sites = sites;
    });
  }

}
