# Status report Week 1
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/02/2023 | Project management: issues, paper setup, portfolio, status reports,... | / |
| 08/02/2023 | Distributed tracing setup with Opentelemetry | #23 |
| 10/02/2023 | Implemented distributed tracing + technical fit research Prometheus/Jaeger | [#23](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/23),  [#29](https://gitlab.com/kdg-ti/the-lab/teams-22-23/team7/neobyte-cms-backend/-/issues/29)|
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/02/2023 | Reformated file and parent/child structure to use the sidebar for extra options | / |
| 07/02/2023 | Added forms and pages to add new users, edit profile, add site, edit site, manage sites  | #1, #16, #23, #18, #19, #22, #20, #21 |
| 08/02/2023 | Added support for snippets / building blocks and a sidebar for editing meta data | #26, #15 |
| 10/02/2023 | Added filemanager and linked login and users with the backend | #10, #11, #18, #19, #28, #27 |
### Leijzen Jonas
| Worksession | Description work done               | Issue references |
|-------------|-------------------------------------|------------------|
| 06/02/2023  | Jwt Identity                        | #4               |
| 09/02/2023  | Website hosting connection          | #14              |
| 10/02/2023  | Ftp Connection                      | #14              |
| 11/02/2023  | Cicd / Deployment                   | #25              |
| 12/02/2023  | Domain/Entities in repos (feedback) |                  |
| 12/02/2023  | Website creation and editing        | #13, #31          |
## Project Status
### Collaboration
to fill in
### Findings
#### Angular
* Interceptors are weird.
* I do not understand the structure of the styling files very well.
* When the DOM is created each component gets a custom number, therefor if you use follow up on classnames, they will not match anymore. This happend when I made some layout in one file and tried splitting it up into components.
* When a component is included inside an other one, while rendering the dom, an overarching tag is added.
* Angular has 2 types forms (reactive and template driven). It was difficult to understand the difference.
* Reactive forms: direct connected to object model, scalable and verified in code
* template driven: Control in html tags, modifying existing model, simpel
* Sharing data between components, with react its parameter driven, Angular uses tags (@input & @output) parent <-> child
* Angular has an own httpclient which you can provide globally through dependency injection
* href is an static method, angular does provide an extra way with routerlink to create dynamic routing to keep track of to the routing rules and active pages
* Difficult state mgmt with RxJs or Akita but working with Subscriptions and shareReplay
#### Distributed Tracing
* Applying distributed tracing in an ASP.NET Core project is a lot harder then advertised by the speaker on the TI Conference Days.
* Jaeger has a better technical fit than Prometheus in our application because of its horzontal scaling and push-based data collection features
#### Ftp Hosting Connection
* Microsoft deprecated their own ftp client.
* Third party ftp clients are few and far between and many of them lack support for certain features or are no longer maintained.
### Technologies researched
Distributed tracing with Opentelemetry
.NET Ftp client
Ports and Adapters persistence entities
### Work done
![](https://geps.dev/progress/21)
