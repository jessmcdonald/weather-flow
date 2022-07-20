# WeatherFlow

## Serve project on localhost

Run `ng run start` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running linter

Run `ng lint`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


# Future
## Localization

All strings in the app have been tagged with `i18n` label. This will allow the use of Angular's built in Internationalization functionality. All strings can be extracted using `ng extract-langs` then uploded to a tool e.g. Crowdin/ Lokalize where translators can add translations. These can then be downloaded and incorporated into the app so that it can either be built in seperate languages OR utilise Ivy compiler ability to build the project once and do translations at runtime.

## Error logging


## Product metrics monitoring

Throughout the app I have included call to 
I would plan to log these out to a tool such as NewRelic so that developers could monitor the 

## CICD
Gitlab CICD can be used to set up pipelines that are automatically triggered by developer actions.
Pipleine to be built for dev workflow -> this is triggered by a push to a feature branch that has an open merge request with `main` branch
Pipeline stages:
* extract strings (optional step manually triggered if dev added new strings that require translations) -> `ng extract-langs`, extract strings and upload to locaization tool e.g. Crowdin.
* run linting -> `ng lint` can fail for dev pipeline but branch cannot be merged without pass
* run unit tests -> `ng test` can fail for dev pipeline but branch cannot be merged without pass


Pipeline to be built for deployment to prod





