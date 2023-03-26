import { Component } from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WebsiteService} from "../../services/website.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    private _siteService: WebsiteService,
    private _router: Router
  ) {
    this.createSiteForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      domain: ["", [Validators.required, Validators.minLength(5),
        //patern should be a valid URL
        Validators.pattern("^(http|https)://[a-zA-Z0-9-_.]+.[a-zA-Z]{2,5}([a-zA-Z0-9-_.]+)?$")]],
      protocol: ["", [Validators.required]],

      region: ["", []],
      bucketName: ["", [Validators.minLength(5)]],
      accessKey: ["", [Validators.minLength(5)]],
      secretKey: ["", [Validators.minLength(5)]],

      host: ["", [Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9-_.]+$")]],
      port: [21, [Validators.pattern("^[0-9]+$")]],
      username: ["", [Validators.minLength(5)]],
      password: ["", [Validators.minLength(5)]],

      homeFolder: ["", [Validators.required]],
      uploadFolder: ["", [Validators.required]],
      googleAnalytics: ["", [Validators.minLength(5)]],
      lockdown: [false],
    });
    this.setValidators();
  }

  private setValidators(): void {
    this.createSiteForm.get('protocol')!.valueChanges.subscribe(
      (result) => {
        if (result == 'S3') {
          this.createSiteForm.get('region')!.setValidators([Validators.required]);
          this.createSiteForm.get('bucketName')!.setValidators([Validators.required]);
          this.createSiteForm.get('accessKey')!.setValidators([Validators.required]);
          this.createSiteForm.get('secretKey')!.setValidators([Validators.required]);

          this.createSiteForm.get('host')!.setValidators([]);
          this.createSiteForm.get('port')!.setValidators([]);
          this.createSiteForm.get('username')!.setValidators([]);
          this.createSiteForm.get('password')!.setValidators([]);
        } else {
          this.createSiteForm.get('region')!.setValidators([]);
          this.createSiteForm.get('bucketName')!.setValidators([]);
          this.createSiteForm.get('accessKey')!.setValidators([]);
          this.createSiteForm.get('secretKey')!.setValidators([]);

          this.createSiteForm.get('host')!.setValidators([Validators.required]);
          this.createSiteForm.get('port')!.setValidators([Validators.required]);
          this.createSiteForm.get('username')!.setValidators([Validators.required]);
          this.createSiteForm.get('password')!.setValidators([Validators.required]);
        }
        this.createSiteForm.get('region')!.updateValueAndValidity();
        this.createSiteForm.get('bucketName')!.updateValueAndValidity();
        this.createSiteForm.get('accessKey')!.updateValueAndValidity();
        this.createSiteForm.get('secretKey')!.updateValueAndValidity();
        this.createSiteForm.get('host')!.updateValueAndValidity();
        this.createSiteForm.get('port')!.updateValueAndValidity();
        this.createSiteForm.get('username')!.updateValueAndValidity();
        this.createSiteForm.get('password')!.updateValueAndValidity();
      }
    );
  }

  isS3() {
    if (!this.createSiteForm)
      return false;
    return this.createSiteForm.value.protocol == 'S3' ;
  }

  testConnection() {
    let connection = {};
    if (this.isS3()) {
      connection = {
        protocol: this.createSiteForm.value.protocol,
        region: this.createSiteForm.value.region,
        bucketName: this.createSiteForm.value.bucketName,
        accessKey: this.createSiteForm.value.accessKey,
        secretKey: this.createSiteForm.value.secretKey,
      };
      } else {
      connection = {
        protocol: this.createSiteForm.value.protocol,
        host: this.createSiteForm.value.host,
        port: this.createSiteForm.value.port,
        username: this.createSiteForm.value.username,
        password: this.createSiteForm.value.password,
      };
    }
    this._messageService.add({type: 'info', title: 'Test Connection', description: 'Testing connection...'});
    this._siteService.testConnection(connection).subscribe(
      (data: any) => {
        if (data.valid)
          this._messageService.add({type: 'success', title: 'Test Connection', description: 'Connection successful'});
        else
          this._messageService.add({type: 'danger', title: 'Test Connection', description: 'Connection failed'});
      }
    );
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
