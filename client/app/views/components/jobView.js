'use strict';

var moment = require('moment');
var humanizeDuration = require('humanize-duration');

var formatDuration = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: function() { return 'h'; },
      m: function() { return 'min'; },
      s: function() { return 's'; },
      ms: function() { return 'ms'; }
    }
  },
  round: true,
  spacer: '',
  delimiter: ''
});

var runningJob = '<div class="loading progress col s12"><div class="indeterminate"></div></div>';

// jobDuration :: Int -> String
var jobDuration = function(duration) {
  var durationDescription = 'Job took ' + humanizeDuration(duration) + ' running last time';

  return '<div class="duration col s5" title="' + durationDescription + '">' +
           '<i class="icon fa fa-clock-o"></i>' + formatDuration(duration) +
         '</div>';
};

// jobLastRun :: Int -> String
var jobLastRun = function(lastRunInMs) {
  var lastRunDescription = 'Last time the job ran was ' + moment(Number(lastRunInMs)).fromNow();

  return '<div class="lastrun col s7 truncate" title="' + lastRunDescription + '">' +
           '<i class="icon fa fa-flag-checkered"></i>' + moment(Number(lastRunInMs)).fromNow() +
         '</div>';
};

// completedJob :: Job -> String
var completedJob = function(job) {
  return jobLastRun(job.finishedAt).concat(jobDuration(job.duration));
};

// renderJob :: Job -> String
var renderJob = function(job) {
  var isJobRunning = job.status === 'running';
  var jobStatus = isJobRunning ? runningJob : completedJob(job);

  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span title="'+ job.name +'" class="title card-title">'+ job.name +'</span>' +
           '</div>' +
           '<div class="job-status card-action valign-wrapper row" data-status="' + job.status + '">' +
             jobStatus +
           '</div>' +
         '</article>';
};

module.exports = {
  render: renderJob
};
