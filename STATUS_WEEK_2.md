# Status report Week 2
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 13/02/2023 | Added Jaeger to export traces to | [#3](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/3) |
| 14/02/2023 | Research Jaeger/Grafana | #3 |
| 16/02/2023 | Presentation for sprint review 17/02, Project management | / |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 15/02/2023 | Added create site (connect to backend) | #1, #20 |
| 15/02/2023 | Added source publishing (connect to backend) | #3 |
| 15/02/2023 | Fixed website links to same as backend | / |
| 16/02/2023 | CRUD for snippets | #36, #26, #13, #4 |
| 16/02/2023 | Big changes: Added rendering site to edit inside iframe | #31, #5  |
| 16/02/2023 | Publishing changes made (live) inside iframe | #5 |
| 17/02/2023 | Dynamic breadcrumbs with interceptors | / |
### Leijzen Jonas
| Worksession | Description work done | Issue references |
|---|---|---|
| 14/02/2023 | Website editing | [#13](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/13) |
| 15/02/2023 | Website transformation and rendering | #2, [#3](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/3), [#49](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/49) |
| 15/02/2023 | Page source retreival and publishing | / |
| 15/02/2023 | Accounts detail retreival | / |
| 16/02/2023 | Snippet CRUD | [#19](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/19), [#41](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/41), [#42](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/42)
| 16/02/2023 | Enabled accounts and authorization | [#8](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/8), [#10](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/10) |
| 16/02/2023 | FluentFTP | [#21](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/21) |
| 16/02/2023 | Docker network | [#25](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/25) |
## Project Status
### Collaboration
to fill in
### Findings
#### Angular
* Dynamic routing with options like (pathMatch, data, childeren, working with ids, resolvers, guards)
* Dynamic breadcrumbs to make use of an resolver, do requests while routing. And pre-use that data
* Use of @ViewChild decorator to get html template / component inside the view and the scope of it.
* Using different implementations of the view lifecycle (AfterviewInit, onViewInit)
#### .NET
- Make use of `<base>` tag in html to make sure additional page requests (css/js/images) get redirected at original hosting
- Ftp.dll sometimes either does not send the requests or doesn't throw when something goes wrong. Causing the website publishing to only work intermittenly
### Technologies researched
- Ftp.dll
- FluentFTP
### Work done
![](https://geps.dev/progress/38)
