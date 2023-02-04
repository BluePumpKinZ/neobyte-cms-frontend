import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {LogoutComponent} from "./core/components/authentication/logout/logout.component";
import {MainComponent} from "./core/components/main/main.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {LostpasswordComponent} from "./core/components/authentication/lostpassword/lostpassword.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'lost-password', component: LostpasswordComponent},
  { path: 'sites', component: LostpasswordComponent},
  { path: 'users', component: LostpasswordComponent},
  { path: 'settings', component: LostpasswordComponent},
  { path: 'users/new', component: LostpasswordComponent},
  { path: 'sites/new', component: LostpasswordComponent},
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: '', component: MainComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
