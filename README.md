# WeatherFlow
A basic weather app that shows the current weaher for the user's current location plus 3 default locations. All weather data is fetched on app initialization from the open weather API.

## Serve project on localhost
Download the repo and run `npm install`, then run `ng run start` to serve the Angular client on localhost. Navigate to `http://localhost:4200/`.
When prompted, allow browser to access location.

## Testing
For a UI like this one, I strongly favour a small number of tests that simulate user actions and check that the UI responds in the expected way rather than testing functions, this not only replicates closer an actual user but also avoids have a test suite full of flaky/useless tests that need to be 'fixed' whenever implementation changes. I would also ideally add e2e testing e.g. using Cypress to simulate as close as possible actual user experience but I ran out of time, therefore only unit&integration testing is included so far.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running linter
Run `ng lint`

## Framework choices
I chose Angular as the framework for a few reasons:
* TBH the first one was practicality, I am using it day to day and due to the task being a 'try not to spend your whole weekend doing this' one I decided I could showcase my skills best if I used Angular.
* Angular is a full framework so has a lot already included, it requires very few additional libraries for things like routing, internationalisation or form validation. 
* Angular's Ivy compiler has adressed past issues with bundle size and Angular's change detection means that the benefits of Angular come at a lower cost these days.
* I recently implemented localization using Angular's out of the box i18n solution and found it easy to work with and painless to integrate it with our 3rd party translation tool and into our dev pipeline.<br>
However I am aware than in a lot of cases Angular may be too heavy/has a lot of unique syntax to learn for newcomers so I totally understand why you often reach for React.
### Other:
* state management - I chose to use the weatherService + RxJS observables to store the app state and share between components. I have not implemented NgRx at this point as for an app of this size I thought it would be overkill, however as funtionality and user settings are added, it could make sense to add state management following Flux/Redux design.
* design system/library - I chose not to use any library like Material for styling as again this would be a lot of added weight for a simple project. It could be appropriate to use one in the future but I would think carefully before adding such weight to the bundle size. Tailwind is a lighter option with high customisability and little need for devs to write much CSS however I would also be careful here as IMO it can create messy HTML which I don't love.

# Future improvements
Product improvements I would add next:
* add search functionality so user can search for locations other than their current one / in case geolocation fails
* add possibility to add/remove & save custom default locations
* show future weather, not only current
* create reusable components to be used in the Details view
* add some more interactive styling, e.g. a swipe animation when moving from dashboard to the details view, a better way of showing loading state

## Localization
All strings in the app will be tagged with `i18n` label. This will allow the use of Angular's built in Internationalization functionality. All strings can be extracted using `ng extract-langs` then uploded to a tool e.g. Crowdin/ Lokalize where translators can add translations. These can then be downloaded and incorporated into the app so that it can either be built in seperate languages OR utilise Ivy compiler ability to build the project once and do translations at runtime.
Both the string extraction & download/merge steps could be incorporated as optional steps in CICD pipleine.

## Monitoring & analytics
In order to monitor app health, provide adequate information in case of incidents & also give devs high confidence that they did not cause any unforeseen side effects when releasing.
### NewRelic:
* APM - identify any anomalies in web transaction time or throughtput as well as error rates and Apdex score. 
* browser monitoring - allow devs to monitor and look for areas of improvement in metrics such as first contentful paint / first interaction / initial pageload
### Rollbar/Sentry:
See JS errors in real time with context & user actions leading up to error, especially helpful when releasing new features/framework upgrades to pinpoint the mage version that introduced errors.
### Product monitoring
To better understand user behaviour I would suggest to also add product metrics to the observability instrumented for the frontend client. One way of doing this would be fire custom events (to be analysed in third part tool such as Segment/Amplitude to allow anyone to run analysis/build behaviour funnels to understand user flows). Example events could be: 'user denied geolocation permission', 'used search feature', 'user changed units.' This is something that should have high collaboration with Product/BI to decide what tracking could be helpful. 

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
