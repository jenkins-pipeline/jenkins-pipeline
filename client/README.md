# Jenkins Pipeline Client

An attempt to display a set of builds running in Jenkins as a pipeline, a sequence of builds and its states.

## Setup

Node `v5.5.0` was used for development but the skeleton was tested with prior version `v4.0.0` with success.

Once in the root directory run `npm install` to install all dependencies of the client app.

## Running

Most important lifecycle scripts included in kickstart-brunch:

```
  npm test
    jasmine
  npm start
    brunch watch --server
```

Available via `npm run-script`:

```
  npm run lint
    esw app/ spec/ --ext .js
  npm run build
    brunch build
  npm run build:prod
    npm run build -- -p
```
