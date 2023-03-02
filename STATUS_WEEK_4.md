# Status report Week 4
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| dd/MM/YYYY | to fill in | to fill in |
| dd/MM/YYYY | to fill in | to fill in |
| dd/MM/YYYY | to fill in | to fill in |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 28/02/2023 | Test connection (using data from form while it is not submitted to test it) adn connect to backend | #21 |
| dd/MM/YYYY | Select home and upload folder (^^) | / |
| dd/MM/YYYY | Added fixes for CRUD users and snippets, filemanager regarding the backend | / |
| dd/MM/YYYY | Dynamic breadcrumbs on users | / |
| dd/MM/YYYY | Crud snippets connecten met backend | / |
| dd/MM/YYYY | Snippet preview | / |
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
#### .NET
- FluentFtp Client is not thread safe, so we need to either create a new connection for a new request, or use a lock to prevent multiple requests at the same time.
### Technologies researched
to fill in
### Work done
![](https://geps.dev/progress/58) -> Update at the end of Week 4