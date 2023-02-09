# Status report Week 0
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 01/02/2023 | Research: Hexagonal architechture,  Minimal API | / |
| 03/02/2023 | Research: Prometheus, Grafana, Distributed Tracing | / |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 27/01/2023 | Angular Project Setup, research after project structure & architecture | / |
| 30/01/2023 | Made use of Guards to make the authentication pages (login and lost password) | #28, #27 |
| 03/01/2023 - 05/01/2023 | Research after modern frontend lib, made layouts and basic page structure, and refined routing | / |
| 05/01/2023 | Made Breadcrumbs automatic, using the routing options | / |
| 05/01/2023 | Added CodeMirror and JS Beautify to edit source code for pages | #29 |
### Leijzen Jonas
| Worksession | Description work done | Issue references |
|---|---|---|
| 27/01/2023 | Project setup, Hexagonal architecture, Minimal API | #24 |
| 28/01/2023 | Database connection, swagger, Minimal API | #24 |
| 29/01/2023 | Serilog, Domain, Mailing, json.env file | / |
| 30/01/2023 - 05/02/2023 | Jwt Identity  | #4 |
## Project Status
### Collaboration
The team goes along well and is aware of the workload and project scope. For that reason we've already started our research and project development a weak early.
### Findings
#### Angular
* Each file has an CSS files
* A lot of libs are not supported for Angular cus it is outdated, but there are wrapper packages made for that.
* Routing is done with a routing file, the layout and inheritance is also done there.
* Classes have custom implementation for events. For example: execute code when the page is loaded
* TS & HTML templates are sepperated and all logic needs to be inside the TS file
* Angular provides custom tags. For example (click)="method"
* imports can be done from one single file, unlike with react you have to make it globally by overarching the content with a tag holding the item.
* Dependency injection
#### Hexagonal architecture
* Lot of forward methods
* Clean structure
* Easy to rewrite single part of code without influencing other parts
#### Minimal API
* Endpoint filters are a powerfull tool for custom behaviour (body validation, custom auth with principals)
### Technologies researched
* Angular (JS Beautify, CodeMirror, Bootstrap 5, TS)
* Hexagonal architecture
* Minimal API
* Prometheus
* Grafana
* Distributed Tracing
### Work done
![](https://geps.dev/progress/15)
