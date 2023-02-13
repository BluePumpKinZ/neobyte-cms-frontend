# Status report Week 1
## Worksheet 
### Cools Arne
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/02/2023 | Project management: issues, paper setup, portfolio, status reports,... | / |
| 08/02/2023 | Distributed tracing setup with Opentelemetry | #23 |
| dd/MM/YYYY | Implemented distributed tracing + technical fit research Prometheus/Jaeger | #23, #29 |
### Derboven Maxim
| Worksession | Description work done | Issue references |
|---|---|---|
| 07/02/2023 | Reformated file and parent/child structure to use the sidebar for extra options | / |
| 07/02/2023 | Added forms and pages to add new users, edit profile, add site, edit site, manage sites  | #1, #16, #23, #18, #19, #22, #20, #21 |
| 08/02/2023 | Added support for snippets / building blocks and a sidebar for editing meta data | #26, #15 |
| 10/02/2023 | Added filemanager and linked login and users with the backend | #10, #11, #18, #19, #28, #27 |
### Leijzen Jonas
| Worksession | Description work done | Issue references |
|---|---|---|
| 06/02/2023 | Jwt Identity | #4 |
| 09/02/2023 | Website hosting connection | #14 |
| dd/MM/YYYY | to fill in | to fill in |
## Project Status
### Collaboration
to fill in
### Findings
#### Angular
* Interceptors are weird.
* I do not understand the structure of the styling files very well.
* When the DOM is created each component gets a custom number, therefor if you use follow up on classnames, they will not match anymore. This happend when I made some layout in one file and tried splitting it up into components.
* When a component is included inside an other one, while rendering the dom, an overarching tag is added.
* WRITE ABOut FORMS
* WRITE ABOUT @INPUT TAG
* WRITE ABOUT NO HOOKS AND HTTPCLIENT INSTEAD OF AXIOS
#### .NET
* Applying distributed tracing in an ASP.NET Core project is a lot harder then advertised by the speaker on the TI Conference Days.
* Jaeger has a better technical fit than Prometheus in our application because of its horzontal scaling and push-based data collection features
### Technologies researched
Distributed tracing with Opentelemetry
### Work done
![](https://geps.dev/progress/21) -> Update at the end of Week 1
