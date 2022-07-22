# WeatherFlow

## Serve project on localhost

Run `ng run start` for a dev server. Navigate to `http://localhost:4200/`.
When prompted, allow browser to access location.

## Running linter
Run `ng lint`.
Big projects should have linters, no further comments on linting.

# Testing
For a UI like this one, I would ideally have added e2e testing using Cypress to simulate as close as possible actual user experience but I ran out of time. I included some unit tests & a couple of integration tests but since there is limited business logic in the app they are limited to just a few.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<!-- ## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities. -->


# Future
Product improvements I would add next:
* add search functionality so user can search for locations other than their current one / in case geolocation fails
* add possibility to select & save custom default locations

* state management - I have chosen not to implement NgRx at this point as for an app of this size I thought it would be overkill, however as funtionality and user settings are added, it could make sense to add state management following Redux pattern.

## Localization

All strings in the app have been tagged with `i18n` label. This will allow the use of Angular's built in Internationalization functionality. All strings can be extracted using `ng extract-langs` then uploded to a tool e.g. Crowdin/ Lokalize where translators can add translations. These can then be downloaded and incorporated into the app so that it can either be built in seperate languages OR utilise Ivy compiler ability to build the project once and do translations at runtime.
Both the string extraction & download/merge steps could be incorporated as optional steps in CICD pipleine.

## Monitoring & analytics
I would add
NewRelic:
APM - identify any anomalies in web transaction time or throughtput as well as error rates and Apdex score. 
browser monitoring - allow devs to monitor and look for areas of improvement in metrics such as first contentful paint / first interaction / initial pageload
Rollbar/Sentry:
See JS errors in real time with context & user actions leading up to error, especially helpful when releasing new features/framework upgrades to pinpoint image version that introduced errors.

Product monitoring, to better understand user behaviour I would suggest to fire custom events (to be analysed in third part tool such as Segment/Amplitude to allow anyone to run analysis/build behaviour funnels to understand user flows). Example events could be: 'user denied geolocation permission', 'used search feature', 'user changed units' 


## CICD
Gitlab CICD could be used to set up pipelines that are automatically triggered by developer actions.
Pipleine to be built for dev workflow -> this is triggered by a push to a feature branch that has an open merge request with `main` branch
Pipeline stages:
* extract strings (optional step manually triggered if dev added new strings that require translations) -> `ng extract-langs`, extract strings and upload to locaization tool e.g. Crowdin.
* run linting -> can fail for dev pipeline but branch cannot be merged without pass
* run unit tests -> can fail for dev pipeline but branch cannot be merged without pass
* build 


Pipeline to be built for deployment to prod





