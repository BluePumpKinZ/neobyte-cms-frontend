import {Component, OnInit} from '@angular/core';
import {Site} from "../../models/Site";
import {Account, AccountDetails} from "../../models/Account";
import {SiteService} from "../../services/site.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  accounts: AccountDetails[] | undefined;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  toDateString(lastSeen: Date) {
    return new Date(lastSeen).toDateString();
  }
}
