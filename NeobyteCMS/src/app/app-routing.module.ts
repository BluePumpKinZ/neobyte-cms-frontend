import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {LogoutComponent} from "./core/components/authentication/logout/logout.component";
import {MainComponent} from "./core/components/main/main.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {LostpasswordComponent} from "./core/components/authentication/lostpassword/lostpassword.component";
import {SitesComponent} from "./core/pages/sites/sites.component";
import {UsersComponent} from "./core/pages/users/users.component";
import {NewUserComponent} from "./core/pages/new-user/new-user.component";
import {NewSiteComponent} from "./core/pages/new-site/new-site.component";
import {SettingsComponent} from "./core/pages/settings/settings.component";
import {ProfileComponent} from "./core/pages/profile/profile.component";

const routes: Routes = [
  //layout routes
  { path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'sites' },
      { path: 'sites', component: SitesComponent, data: {breadcrumb:'Sites'}, children: [
          { path: 'new', data: {breadcrumb:'New'}, component: NewSiteComponent }]},
      { path: 'users', data: {breadcrumb:'Users'}, component: UsersComponent, children: [
          { path: 'new', data: {breadcrumb:'New'}, component: NewUserComponent }]},
      { path: 'settings', data: {breadcrumb:'Settings'}, component: SettingsComponent },
      { path: 'profile', data: {breadcrumb:'Profile'}, component: ProfileComponent },
      { path: '**', redirectTo: 'sites'}
    ]},
  //not layout routes
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'lost-password', component: LostpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
