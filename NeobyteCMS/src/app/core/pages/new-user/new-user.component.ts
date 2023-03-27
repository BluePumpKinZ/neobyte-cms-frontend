import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
      selectedSites: new FormArray([]),
      makeAdministrator: [false],
    });
  }

  ngOnInit(): void {
    this._websiteService.getAllSites().subscribe(sites => {
      this.sites = sites.map(site => ({ ...site, selected: false, enabled: true }));
      this.sites.forEach(() => this.selectedSitesFormArray.push(new FormControl(false)));
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

  get selectedSitesFormArray() {
    return this.createUserForm.get('selectedSites') as FormArray;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onCreateUser() {
    if (this.createUserForm.invalid) {
      return;
    }

    const accountDetails: AccountDetails = {
      bio: this.createUserForm.get('bio')!.value,
      email: this.createUserForm.get('email')!.value,
      username: this.createUserForm.get('name')!.value,
      role: this.createUserForm.get('makeAdministrator')!.value ? role.OWNER : role.CLIENT,
      enabled: true,
      creationDate: new Date(),
      id: ''
    };

    const selectedSites = this.createUserForm.value.selectedSites
      .map((checked: boolean, i: number) => checked ? this.sites![i].id : null)
      .filter((v: any) => v !== null);

    this._accountService.addAccount(accountDetails).subscribe(
      (account: AccountDetails) => {
        if (selectedSites.length === 0 || this.createUserForm.get('makeAdministrator')!.value) {
          return;
        }
        selectedSites.forEach((siteId: string) => {
          this._accountService.addWebsiteToAccount(account.id, siteId).subscribe(
            (data) => {
            },
          );
        });
        this._router.navigate(['/users']);
      }, (error) => {
        console.log(error)
      }
    );



  }

}

