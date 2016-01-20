# Jenkins Pipeline

An attempt to display a set of builds running in Jenkins as a pipeline, a sequence of builds and its states.

## Setup

The project was developed with ruby version `ruby 2.0.0p481` and should work with versions above that.

## Files and Directories Dependencies

You gonna need to create a `config` directory and a `.env` file in order to run the project.

### config directory

Create in the root of the project a `config` directory with your pipeline config files (yml) based on the example provided by one of the maintainers.

### jenkins jobs configuration (folder)
In case of grouping your jobs in [folders](https://wiki.jenkins-ci.org/display/JENKINS/CloudBees+Folders+Plugin) you can speficy the root folder on the configuration

### .env file

Create an `.env` file in your repository with the following format

```
MONITOR_USERNAME=[YOUR JENKINS USERNAME]
MONITOR_TOKEN=[YOUR API TOKEN IN JENKINS]
```

# Running Application

* Install dependencies by running `bundle install`
* Run the app by typing `ruby app.rb`
