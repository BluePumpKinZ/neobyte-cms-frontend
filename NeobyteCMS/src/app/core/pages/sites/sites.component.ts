import {Component, OnInit} from '@angular/core';
import {WebsiteService} from "../../services/website.service";
import {Site} from "../../models/Site";
import {environment} from "../../../../environments/environment";

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
      sites = sites.map(site => {
        site.screenshot = environment.url + site.screenshot;
        return site;
      })
      this.sites = sites;
    });

    // tinymce.init({
    //   selector: 'textarea',  // change this value according to your HTML
    //   toolbar: 'undo redo styles bold italic alignleft aligncenter alignright alignjustify | bullist numlist outdent indent'
    // });
  }



}
