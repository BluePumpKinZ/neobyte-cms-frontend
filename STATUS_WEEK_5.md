# Status report Week 5
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/03/2023 | Implemented a basic MinimalAPI and ControllerAPI for load testing | [#1](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/research/-/issues/1) |
| 08/03/2023 | Api load testing with K6 | [#1](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/research/-/issues/1) |
| dd/MM/YYYY | to fill in | to fill in |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/03/2023-09/03/2023 | WYSIWYG editor in the render screen toevoegen | #15, #9, #6, #25 |
| 10/03/2023 | Added tracing dashboar behind login screen | / |
| 10/03/2023 | made sure everything works for the demo (no errors or not working buttons) | / |
### Leijzen Jonas
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/03/2023 | Metrics, Prometheus, Grafana | [#57](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/57) |
| 08/03/2023 | Grafana, Pages endpoints | / |
| 09/03/2023 - 12/03/2023 | Website Thumbnails, Puppeteer | / |
## Project Status
### Collaboration
to fill in
### Findings
#### Angular
- loading element callback
- tinymce can be loaded locally
- tinymce needs to be init inside the page, can not with .init so I need to add handlers to all classes inside frame
#### .NET
Custom metrics are surprisingly easy to implement
#### Grafana
Many datasources can be added including jaeger, altho this datasource only exposes limited data (no tags, which is one of the strongest features of distributed tracing)
The latest release of grafana has a bug which corrupts the loading if the dashboard when run through a reverse proxy. Rolling back to grafana 8.3.11 fixed this issue.
#### Prometheus
PromQL can be used to do complex queries on the metrics, including mathemtical operations
Setup of docker container very straigthforward
#### Puppeteer
while initial setup is relatively easy, getting puppeteer and especially the chromium installation running in a docker environment is not very straigthforward
### Technologies researched
Kerstrel Metrics server
Prometheus
Grafana
Grafana Loki
Promtail
Nginx Server
Docker plugins
PuppeteerSharp
### Work done
![](https://geps.dev/progress/80) -> Update at the end of Week 5
