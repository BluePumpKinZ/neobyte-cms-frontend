import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {LoginComponent} from './core/components/authentication/login/login.component';
import {BreadcrumbComponent} from './core/components/breadcrumb/breadcrumb.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {LogoutComponent} from './core/components/authentication/logout/logout.component';
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
import { RenderComponent } from './core/components/render/render.component';
import { SnippetsComponent } from './core/pages/snippets/snippets.component';
import { EditMetadataSidemodalComponent } from './core/components/edit-metadata-sidemodal/edit-metadata-sidemodal.component';
import { NotificationComponent } from './core/components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    BreadcrumbComponent,
    FooterComponent,
    LogoutComponent,
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
    EditPageComponent,
    RenderComponent,
    SnippetsComponent,
    EditMetadataSidemodalComponent,
    NotificationComponent
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
