import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountDetails, AccountDetailsRoles } from '../../models/Account';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';
import { UserResolver } from '../../services/resolvers/user.resolver';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  changePasswordForm: FormGroup;
  userInfoForm: FormGroup;
  user!: AccountDetailsRoles;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.changePasswordForm = this._formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });

    this.userInfoForm = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      bio: ['']
    });

    this._accountService.getOwnAccountDetails().subscribe((data: any) => {
      this.user = data;
      this.userInfoForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        bio: this.user.bio
      });
    });
  }

  onChangePassword() {
    const currentPassword = this.changePasswordForm.get('currentPassword')!.value;
    const newPassword = this.changePasswordForm.get('newPassword')!.value;
    this._accountService.changePassword(currentPassword, newPassword).subscribe(() => {
      // this._messageService.add('Password changed successfully.');
      this.changePasswordForm.reset();
      this._router.navigate(['/sites']);
    }, error => {
      // this._messageService.showErrorMessage(error);
    });
  }

  onEditUserInfo() {
    const username = this.userInfoForm.get('username')!.value;
    const email = this.userInfoForm.get('email')!.value;
    const bio = this.userInfoForm.get('bio')!.value;

    this.user.username = username;
    this.user.email = email;
    this.user.bio = bio;

    console.log(this.user)
    
    this._accountService.updateOwnAccountDetails(this.user).subscribe((data: AccountDetailsRoles) => {
      this.user = data;
      this._router.navigate(['/sites']);
      
      // this._messageService.showSuccessMessage('Account details updated successfully.');
    }, error => {
      // this._messageService.showErrorMessage(error);
    });
  }

}

