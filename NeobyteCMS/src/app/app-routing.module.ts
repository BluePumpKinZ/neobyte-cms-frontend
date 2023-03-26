import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./core/components/authentication/login/login.component";
import {MainComponent} from "./core/components/main/main.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {LostpasswordComponent} from "./core/components/authentication/lostpassword/lostpassword.component";
import {SitesComponent} from "./core/pages/sites/sites.component";
import {UsersComponent} from "./core/pages/users/users.component";
import {NewUserComponent} from "./core/pages/new-user/new-user.component";
import {NewSiteComponent} from "./core/pages/new-site/new-site.component";
import {ProfileComponent} from "./core/pages/profile/profile.component";
import {EditSiteComponent} from "./core/pages/edit-site/edit-site.component";
import {EditSourceComponent} from "./core/pages/edit-source/edit-source.component";
import {EditPageComponent} from "./core/pages/edit-page/edit-page.component";
import {RenderComponent} from "./core/components/render/render.component";
import {SnippetsComponent} from "./core/pages/snippets/snippets.component";
import {LogoutGuard} from "./core/guards/logout.guard";
import {ManageSiteComponent} from "./core/pages/manage-site/manage-site.component";
import {EditSnippetComponent} from "./core/components/snippets/edit-snippet/edit-snippet.component";
import {AddSnippetComponent} from "./core/components/snippets/add-snippet/add-snippet.component";
import {ListSnippetComponent} from "./core/components/snippets/list-snippet/list-snippet.component";
import {SiteResolver} from "./core/services/resolvers/site.resolver";
import {EditUserComponent} from "./core/pages/edit-user/edit-user.component";
import {UserComponent} from "./core/pages/user/user.component";
import {UserResolver} from "./core/services/resolvers/user.resolver";
import {TracingComponent} from "./core/components/tracing/tracing.component";
import {SetPasswordComponent} from './core/components/authentication/set-password/set-password.component';


const routes: Routes = [
  //layout routes
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], data: {
      authorities: ['OWNER','CLIENT'],
    }, children: [
      {path: '', pathMatch: 'full', redirectTo: 'sites'},
      {
        path: 'sites', data: {breadcrumb: 'Sites'}, children: [
          {path: '', data: {breadcrumb: ''}, pathMatch: 'full', component: SitesComponent},
          {path: 'new', data: {breadcrumb: 'New', authorities: ['OWNER']}, canActivate: [AuthGuard], component: NewSiteComponent},
          {
            path: ':siteId', data: {breadcrumb: (data: any) => `${data.site.name}`},
            resolve: {site: SiteResolver}, children: [
              {path: '', pathMatch: 'full', data: {breadcrumb: ''}, component: EditSiteComponent},
              {path: 'edit', data: {breadcrumb: 'Manage', authorities: ['OWNER']}, canActivate: [AuthGuard], component: ManageSiteComponent},
              {
                path: 'pages/:pageId', data: {breadcrumb: 'Page'}, children: [
                  {path: '', pathMatch: 'full', component: EditPageComponent},
                  {path: 'source', data: {breadcrumb: 'Edit Source', authorities: ['OWNER']}, canActivate: [AuthGuard], component: EditSourceComponent},
                ]
              },
              {
                path: 'snippets', data: {breadcrumb: 'Snippets', authorities: ['OWNER']}, canActivate: [AuthGuard], component: SnippetsComponent,
                children: [
                  {path: '', data: {breadcrumb: ''}, pathMatch: 'full', component: ListSnippetComponent},
                  {path: 'new', data: {breadcrumb: 'New Snippet'}, component: AddSnippetComponent},
                  {
                    path: ':snippetId', data: {breadcrumb: 'Edit Snippet'}, children: [
                      {path: '', data: {breadcrumb: ''}, pathMatch: 'full', component: EditSnippetComponent},
                      {path: 'edit', data: {breadcrumb: 'Edit Snippet'}, component: EditSnippetComponent},
                    ]
                  },
                ]
              },
            ]
          }]
      },
      {
        path: 'users', data: {breadcrumb: 'Users', authorities: ['OWNER']}, canActivate: [AuthGuard], children: [
          {path: '', data: {breadcrumb: ''}, pathMatch: 'full', component: UsersComponent},
          {path: 'new', data: {breadcrumb: 'New'}, component: NewUserComponent},
          {
            path: ':userId', data: {breadcrumb: (data: any) => `${data.user.username}`}, resolve: {user: UserResolver}, children: [
              {path: '', pathMatch: 'full', data: {breadcrumb: ''}, component: UserComponent},
              {path: 'edit', data: {breadcrumb: 'Edit'}, component: EditUserComponent},
            ]
          },
        ]
      },
      // {path: 'settings', data: {breadcrumb: 'Settings'}, component: SettingsComponent},
      {path: 'profile', data: {breadcrumb: 'Profile'}, component: ProfileComponent},
    ]
  },
  //not layout routes
  {path: 'sites/:siteId/pages/:pageId/render', canActivate: [AuthGuard], component: RenderComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'logout', canActivate: [LogoutGuard], component: LoginComponent},
  {path: 'lost-password', component: LostpasswordComponent},
  {path: 'set-password', component: SetPasswordComponent},
  {path: 'tracing',canActivate: [AuthGuard], component: TracingComponent},
  {path: '**', redirectTo: 'sites'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
