import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {LogoutComponent} from "./core/components/authentication/logout/logout.component";
import {MainComponent} from "./core/components/main/main.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'home', component: MainComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
