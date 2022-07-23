# WeatherFlow

## Serve project on localhost
Run `ng run start` for a dev server. Navigate to `http://localhost:4200/`.
When prompted, allow browser to access location.

## Testing
For a UI like this one, I would ideally have added e2e testing using Cypress to simulate as close as possible actual user experience but I ran out of time, therefore only unit testing is included so far.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running linter
Run `ng lint`

# Future improvements
Product improvements I would add next:
* add search functionality so user can search for locations other than their current one / in case geolocation fails
* add possibility to add/remove & save custom default locations
Other:
* state management - I have chosen to use the weatherService to store the app state and have not implemented NgRx at this point as for an app of this size I thought it would be overkill, however as funtionality and user settings are added, it could make sense to add state management following Flux/Redux design.
* add some more interesting styling, e.g. a nice swipe animation when moving to the details view

## Localization
All strings in the app will be tagged with `i18n` label. This will allow the use of Angular's built in Internationalization functionality. All strings can be extracted using `ng extract-langs` then uploded to a tool e.g. Crowdin/ Lokalize where translators can add translations. These can then be downloaded and incorporated into the app so that it can either be built in seperate languages OR utilise Ivy compiler ability to build the project once and do translations at runtime.
Both the string extraction & download/merge steps could be incorporated as optional steps in CICD pipleine.

## Monitoring & analytics
I would add
### NewRelic:
* APM - identify any anomalies in web transaction time or throughtput as well as error rates and Apdex score. 
* browser monitoring - allow devs to monitor and look for areas of improvement in metrics such as first contentful paint / first interaction / initial pageload
### Rollbar/Sentry:
See JS errors in real time with context & user actions leading up to error, especially helpful when releasing new features/framework upgrades to pinpoint image version that introduced errors.

### Product monitoring
To better understand user behaviour I would suggest to fire custom events (to be analysed in third part tool such as Segment/Amplitude to allow anyone to run analysis/build behaviour funnels to understand user flows). Example events could be: 'user denied geolocation permission', 'used search feature', 'user changed units' 

## CICD
Gitlab CICD could be used to set up pipelines that are automatically triggered by developer actions.
* Pipeline for dev workflow -> this is triggered by a push to a feature branch that has an open merge request with `main` branch
* Pipeleine for deployment to prod -> triggered by a merge to master, has same steps but if any fail, deployment to prod step is disabled.
Pipeline stages:
* extract strings (optional step manually triggered if dev added new strings that require translations) -> extract strings and upload to locaization tool e.g. Crowdin.
* run linting -> can fail for dev pipeline but branch cannot be merged without pass
* run unit tests -> can fail for dev pipeline but branch cannot be merged without pass
* build project -> in multiple langs if necessary
* build docker image
* deploy to staging / prod -> for prod I would suggest to use a canary deployment with the option to rollback all traffic to previous image version in case of any unforeseen issues (i.e. while monitoring errors or app health metrics)
