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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./core/services/AuthService";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LostpasswordComponent } from './core/components/authentication/lostpassword/lostpassword.component';
import { SitesComponent } from './core/pages/sites/sites.component';
import { UsersComponent } from './core/pages/users/users.component';
import { NewUserComponent } from './core/pages/new-user/new-user.component';
import { NewSiteComponent } from './core/pages/new-site/new-site.component';
import { SettingsComponent } from './core/pages/settings/settings.component';
import { UnsavedChangesModalComponent } from './core/components/unsaved-changes-modal/unsaved-changes-modal.component';
import { ProfileComponent } from './core/pages/profile/profile.component';
import { EditSiteComponent } from './core/pages/edit-site/edit-site.component';
import { ManageFilesModalComponent } from './core/components/manage-files-modal/manage-files-modal.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import { EditSourceComponent } from './core/pages/edit-source/edit-source.component';
import { EditPageComponent } from './core/pages/edit-page/edit-page.component';

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
    UsersComponent,
    NewUserComponent,
    NewSiteComponent,
    SettingsComponent,
    UnsavedChangesModalComponent,
    ProfileComponent,
    EditSiteComponent,
    ManageFilesModalComponent,
    EditSourceComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
