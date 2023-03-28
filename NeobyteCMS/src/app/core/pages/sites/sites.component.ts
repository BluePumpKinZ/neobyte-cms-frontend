import {Component, OnInit} from '@angular/core';
import {WebsiteService} from "../../services/website.service";
import {Site} from "../../models/Site";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  sites: Site[] | undefined;
  userRole: string = '';

  constructor(private siteService: WebsiteService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.userRole.subscribe(role => {
      console.log(role);
      this.userRole = role;
    })
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
