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

// renderJob :: Job -> String
var renderJob = function(job) {
  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span title="'+ job.name +'" class="title card-title">'+ job.name +'</span>' +
           '</div>' +
           '<div class="status card-action" data-status="' + job.last_build + '">' +
           // TODO add an icon and align to the right of the box
             '<span class="duration">' + formatDuration(job.duration) + '</span>' +
             '<div class="loading progress" data-job-running="' + !job.ran + '">' +
               '<div class="indeterminate"></div>' +
             '</div>' +
           '</div>' +
         '</article>';
};

module.exports = {
  render: renderJob
};
