import {Component, OnInit} from '@angular/core';
import {WebsiteService} from "../../services/website.service";
import {Site} from "../../models/Site";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  sites: Site[] | undefined;
  constructor(private siteService: WebsiteService) { }

  ngOnInit(): void {
    this.siteService.getAllSites().subscribe(sites => {
      this.sites = sites;
    });
  }

}
