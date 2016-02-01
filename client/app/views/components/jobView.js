'use strict';

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

var runningJob = '<div class="loading progress"><div class="indeterminate"></div></div>';

// completedJob :: Int -> String
var completedJob = function(duration) {
  return '<span class="duration valign" title="Job took ' + humanizeDuration(duration) + ' running last time">' +
           formatDuration(duration) +
         '</span>';
};

// renderJob :: Job -> String
var renderJob = function(job) {
  var isJobRunning = !job.ran;
  var jobStatus = isJobRunning ? runningJob : completedJob(job.duration);

  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span title="'+ job.name +'" class="title card-title">'+ job.name +'</span>' +
           '</div>' +
           '<div class="job-status card-action valign-wrapper" data-status="' + job.last_build + '">' +
             jobStatus +
           '</div>' +
         '</article>';
};

module.exports = {
  render: renderJob
};
