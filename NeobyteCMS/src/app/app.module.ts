import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {LoginComponent} from './core/components/authentication/login/login.component';
import {PageheaderComponent} from './core/components/pageheader/pageheader.component';
import {BreadcrumbComponent} from './core/components/breadcrumb/breadcrumb.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {LogoutComponent} from './core/components/authentication/logout/logout.component';
import {RegisterComponent} from './core/components/authentication/register/register.component';
import {SidebarComponent} from './core/components/sidebar/sidebar.component';
import {MainComponent} from './core/components/main/main.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./core/services/AuthService";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LostpasswordComponent } from './core/components/authentication/lostpassword/lostpassword.component';
import { SitesComponent } from './core/pages/sites/sites.component';
import { UsersComponent } from './core/pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoginComponent,
    PageheaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    LogoutComponent,
    RegisterComponent,
    SidebarComponent,
    MainComponent,
    LostpasswordComponent,
    SitesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
