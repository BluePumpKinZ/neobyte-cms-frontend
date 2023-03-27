import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Account, AccountDetails, AccountDetailsRoles } from '../../models/Account';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: AccountDetailsRoles | undefined;

  constructor(
    private _messageService: MessageService,
    private _accountService: AccountService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    var id = ''
    this._route.params.subscribe((params) => {
      params['userId'] ? id = params['userId'] : id = '';
    });
    	
    this._accountService.getAccountDetails(id).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user!.roles);
      }
    );

  }

}


