import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Site {
  id: number;
  title: string;
  url: string;
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  form: FormGroup;
  activeTab = 'General';
  sites: Site[] = [
    { id: 1, title: 'Site 1', url: 'https://site1.com' },
    { id: 2, title: 'Site 2', url: 'https://site2.com' },
    { id: 3, title: 'Site 3', url: 'https://site3.com' }
  ];
  selectedSites: Site[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      selectedSite: [''],
      makeAdministrator: [false],
      manageSettings: [false],
      manageSites: [false],
      manageUsers: [false]
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
