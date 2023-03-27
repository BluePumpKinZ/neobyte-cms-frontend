import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/core/services/account.service';
import {MessageService} from 'src/app/core/services/message.service';
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['../authentication.css']
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  email: string = '';
  token: string = '';
  passwordSet = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) {
    this.setPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the email and token from the query params
    this._route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['code'];
    });
  }

  onSetPassword() {
    if (this.setPasswordForm.valid) {
      const password = this.setPasswordForm.get('password')!.value;
      const confirmPassword = this.setPasswordForm.get('confirmPassword')!.value;
      if (password !== confirmPassword) {
        this.setPasswordForm.get('confirmPassword')!.setErrors({'passwordsDontMatch': true});
        return;
      }

      this._accountService.setPassword(this.token, this.email, password, confirmPassword).subscribe(
        (data: any) => {
          if (data.valid) {
            this.passwordSet = true;
            this._messageService.add({type: 'success', title: 'Password', description: 'Password set'});
          }
        }
      )

        // .pipe(
        //   tap(_ => {
        //     this._messageService.add({type: 'success', title: 'Password', description: 'Password set'});
        //     this.passwordSet = true
        //   }),
        //   catchError(err => {
        //     for (const error of err.errors) {
        //       this._messageService.add({type: 'danger', title: 'Error', description: error});
        //   }
        //   return err;
        //   }))
        // .subscribe((data: any) => {
        //     if (data.valid) {
        //       this.passwordSet = true;
        //       this._messageService.add({type: 'success', title: 'Password', description: 'Password set'});
        //     }
        //     },
        //     error => {
        //       this._messageService.add({
        //         type: 'danger',
        //         title: 'Error',
        //         description: error.errors[0]
        //       });
        //   }
        // )
    }
  }
}
