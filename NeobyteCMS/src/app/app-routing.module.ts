import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {LogoutComponent} from "./core/components/authentication/logout/logout.component";
import {MainComponent} from "./core/components/main/main.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {LostpasswordComponent} from "./core/components/authentication/lostpassword/lostpassword.component";
import {SitesComponent} from "./core/pages/sites/sites.component";
import {UsersComponent} from "./core/pages/users/users.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'lost-password', component: LostpasswordComponent},
  { path: 'sites', component: SitesComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'users/new', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'sites/new', component: MainComponent, canActivate: [AuthGuard]},
  { path: '', component: SitesComponent, canActivate: [AuthGuard]},
  { path: '', component: SitesComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
