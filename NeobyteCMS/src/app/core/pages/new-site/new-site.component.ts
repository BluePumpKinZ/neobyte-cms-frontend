import { Component } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {SiteService} from "../../services/site.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MUID} from "../../models/Account";
import {Site, SiteDetails} from "../../models/Site";

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.css']
})
export class NewSiteComponent {
  createSiteForm: FormGroup;
  loading = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _siteService: SiteService,
    private _router: Router
  ) {
    this.createSiteForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      domain: ["", [Validators.required, Validators.minLength(5),
        //patern should be a valid URL
        Validators.pattern("^(http|https)://[a-zA-Z0-9-_.]+.[a-zA-Z]{2,5}([a-zA-Z0-9-_.]+)?$")]],
      protocol: ["", [Validators.required]],
      host: ["", [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9-_.]+$")]],
      port: [21, [Validators.required, Validators.pattern("^[0-9]+$")]],
      username: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      homeFolder: ["", [Validators.required]],
      uploadFolder: ["", [Validators.required]],
      googleAnalytics: ["", [Validators.minLength(5)]],
      lockdown: [false],
    });
  }

  testConnection() {
    this._messageService.add({type: 'info', title: 'Test Connection', description: 'Testing connection...'});
  }

  onCreateSite() {
    if (this.createSiteForm.valid) {
      this.loading = true;
      this.error = '';
      this._siteService.createSite(this.createSiteForm.value)
        .subscribe(
          (data: SiteDetails) => {
            this.loading = false;
            this._router.navigate(['../sites'])
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
    } else {
      console.log("Form is invalid");
    }
  }
}
