# Status report Week 4
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 28/02/2023 | Account password set & reset | [#16](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/16), [#20](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/20) |
| 01/03/2023 | Account password reset, Testing, Research Google Analytics, Bugfixing, MinimalAPIvsControllerAPI | [#20](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/20), [#55](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/55), [#7](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/7), [#1](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/research/-/issues/1) |
| 03/03/2023 | Api research (ControllerApi vs MinimalApi) | [#1](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/research/-/issues/1) |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 28/02/2023 | Test connection (using data from form while it is not submitted to test it) and connect to backend | #21 |
| 01/03/2023 | Added fixes for CRUD users and snippets, filemanager regarding the backend | #36, #26, #42, #37 |
| 01/03/2023 | Dynamic breadcrumbs on users | / |
| 02/03/2023 | Added renaming and adding pages | / |
| 02/03/2023 | Fixed login with 401 error interceptor | / |
| 03/03/2023 | Crud snippets connecten met backend | #36, #26 |
| 03/03/2023 | Snippet preview | / |
### Leijzen Jonas
| Worksession | Description work done | Issue references                                                                           |
|-------------|-----------------------|--------------------------------------------------------------------------------------------|
| 28/02/2023  | Tracing dashboard     | [#53](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/53) |
| 01/03/2023  | Bugfixing             | /                                                                                          |
| 02/03/2023  | Frontend Tracing      | #45                                                                                        |
## Project Status
### Collaboration
to fill in
### Findings
#### Angular
- OpenTelemetry: The otel collector is not working with the angular app, so a zipkin collector is used instead.
- getting data from form without it being submitted is very easy
#### .NET
- FluentFtp Client is not thread safe, so we need to either create a new connection for a new request, or use a lock to prevent multiple requests at the same time.
### Technologies researched
Zipkin collector and exporters
### Work done
![](https://geps.dev/progress/69) -> Update at the end of Week 4
