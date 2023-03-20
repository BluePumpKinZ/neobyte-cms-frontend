import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {LoginComponent} from './core/components/authentication/login/login.component';
import {BreadcrumbComponent} from './core/components/breadcrumb/breadcrumb.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {SidebarComponent} from './core/components/sidebar/sidebar.component';
import {MainComponent} from './core/components/main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./core/services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { LostpasswordComponent } from './core/components/authentication/lostpassword/lostpassword.component';
import { SitesComponent } from './core/pages/sites/sites.component';
import { UsersComponent } from './core/pages/users/users.component';
import { NewUserComponent } from './core/pages/new-user/new-user.component';
import { NewSiteComponent } from './core/pages/new-site/new-site.component';
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
import {environment} from "../environments/environment";
import {APIInterceptor} from "./core/interceptor/api.interceptor";
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";
import { ManageSiteComponent } from './core/pages/manage-site/manage-site.component';
import { EditSnippetComponent } from './core/components/snippets/edit-snippet/edit-snippet.component';
import { AddSnippetComponent } from './core/components/snippets/add-snippet/add-snippet.component';
import { ListSnippetComponent } from './core/components/snippets/list-snippet/list-snippet.component';
import { SafeurlPipe } from './core/services/pipes/safeurl.pipe';
import { EditUserComponent } from './core/pages/edit-user/edit-user.component';
import { UserComponent } from './core/pages/user/user.component';
import { RenameModalComponent } from './core/components/rename-modal/rename-modal.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import {ErrorInterceptor} from "./core/interceptor/error.interceptor";
import {
  OpenTelemetryInterceptorModule,
  CompositePropagatorModule,
  ZipkinExporterModule
} from '@jufab/opentelemetry-angular-interceptor';
import { TracingComponent } from './core/components/tracing/tracing.component';
import { EnableNewPagemodalComponent } from './core/components/enable-new-pagemodal/enable-new-pagemodal.component';
import {AddNewPagemodalComponent} from "./core/components/add-new-pagemodal/add-new-pagemodal.component";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    BreadcrumbComponent,
    FooterComponent,
    SidebarComponent,
    MainComponent,
    LostpasswordComponent,
    SitesComponent,
    UsersComponent,
    NewUserComponent,
    NewSiteComponent,
    UnsavedChangesModalComponent,
    ProfileComponent,
    EditSiteComponent,
    ManageFilesModalComponent,
    EditSourceComponent,
    EditPageComponent,
    RenderComponent,
    SnippetsComponent,
    EditMetadataSidemodalComponent,
    NotificationComponent,
    ManageSiteComponent,
    EditSnippetComponent,
    AddSnippetComponent,
    ListSnippetComponent,
    SafeurlPipe,
    EditUserComponent,
    UserComponent,
    RenameModalComponent,
    TracingComponent,
    EnableNewPagemodalComponent,
    AddNewPagemodalComponent,
  ],
  imports: [
    BrowserModule,
    EditorModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    CodemirrorModule,
    RouterOutlet,
    OpenTelemetryInterceptorModule.forRoot({
      commonConfig: {
        console: false,
        production: environment.production,
        serviceName: 'Neobyte.CMS.Frontend',
        probabilitySampler: environment.tracingSamplerProbability,
      },
      zipkinConfig: {
        url: environment.url + 'tracing',
      }
    }),
    ZipkinExporterModule,
    CompositePropagatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    {
      provide: "BASE_API_URL", useValue: environment.url
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
