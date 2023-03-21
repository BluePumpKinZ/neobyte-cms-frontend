import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from '../../services/account.service';
import { WebsiteService } from '../../services/website.service';
import { AccountDetails, role } from '../../models/Account';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

interface Site {
  id: string;
  name: string;
  domain: string;
  createdDate: Date;
  selected: boolean;
  enabled: boolean;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  createUserForm: FormGroup;
  activeTab = 'General';
  sites: Site[] | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _websiteService: WebsiteService,
    private _router: Router) {
    this.createUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      selectedSites: [[]],
      makeAdministrator: [false],
    });


  }

  ngOnInit(): void {
    this._websiteService.getAllSites().subscribe(sites => {
      this.sites = sites.map(site => ({ ...site, selected: false, enabled: true }));
      this.loadSitesIntoForm();
    });

    this.createUserForm.get('makeAdministrator')!.valueChanges.subscribe(value => {
      if (value) {
        //enable all selectedSites checkboxes and disable them
        this.sites?.forEach(site => site.selected = true);
        this.sites?.forEach(site => site.enabled = false);
      } else {
        //disable all selectedSites checkboxes and enable them
        this.sites?.forEach(site => site.selected = false);
        this.sites?.forEach(site => site.enabled = true);
      }
    })

  }

  loadSitesIntoForm() {
    if (this.sites) {
      this.createUserForm.get('selectedSites')!.setValue(this.sites.map(site => this._formBuilder.control(site.selected)));
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onCreateUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    const selectedSites = this.createUserForm.get('selectedSites')!.value;
    const selectedSiteIds = selectedSites.map((selected: boolean, index: number) => selected ? this.sites![index].id : null).filter((id: string | null) => id !== null);

    const accountDetails: AccountDetails = {
      bio: this.createUserForm.get('bio')!.value,
      email: this.createUserForm.get('email')!.value,
      username: this.createUserForm.get('name')!.value,
      role: this.createUserForm.get('makeAdministrator')!.value ? role.OWNER : role.CLIENT,
      enabled: true,
      creationDate: new Date(),
      id: ''
    };
    console.log(accountDetails)
    this._accountService.addAccount(accountDetails).subscribe(
      (account: AccountDetails) => {
        if (selectedSiteIds.length === 0 || this.createUserForm.get('makeAdministrator')!.value) {
          return;
        }
        selectedSiteIds.forEach((siteId: string) => {
          this._accountService.addWebsiteToAccount(account.id, siteId).subscribe();
        });
        this._router.navigate(['../users']);
      }, (error) => {
        console.log(error)
      }
    );



  }
}
