'use strict';

var _ = require('lodash');
var moment = require('moment');
var formatDuration = require('../../helpers/helpers').formatDuration;

// wrapDurationMarkup :: String -> String
var wrapDurationMarkup = function(duration) {
  return '<div class="duration col s5" title="Job took ' + duration + ' running last time">' +
           '<i class="icon fa fa-clock-o"></i>' + duration +
         '</div>';
};

// jobDuration :: String -> String
var jobDuration = _.flow(formatDuration, wrapDurationMarkup);

// wrapLastRunMarkup :: String -> String
var wrapLastRunMarkup = function(relativeTime) {
  return '<div class="lastrun col s7 truncate" title="Last time the job ran was ' + relativeTime + '">' +
           '<i class="icon fa fa-flag-checkered"></i>' + relativeTime +
         '</div>';
};

// fromNow :: MomentJS -> Number -> String
var fromNow = _.curry(function(moment, milliseconds) {
  return moment(milliseconds).fromNow();
});

// jobLastRun :: String -> String
var jobLastRun = _.flow(Number, fromNow(moment), wrapLastRunMarkup);

// completedJob :: Job -> String
var completedJob = function(job) {
  return jobLastRun(job.finishedAt).concat(jobDuration(job.duration));
};

var runningJob = '<div class="loading progress col s12"><div class="indeterminate"></div></div>';

// getJobStatus :: Job -> String
var getJobStatus = function(job) {
  return job.status === 'running' ? runningJob : completedJob(job);
};

// renderJob :: Job -> String
var renderJob = function(job) {
  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span title="'+ job.name +'" class="title card-title">'+ job.name +'</span>' +
           '</div>' +
           '<div class="job-status card-action valign-wrapper row" data-status="' + job.status + '">' +
             getJobStatus(job) +
           '</div>' +
         '</article>';
};

module.exports = {
  render: renderJob
};
