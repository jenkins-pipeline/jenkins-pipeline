'use strict';

var renderJob = function(job) {
  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span class="title card-title">' + job.name + '</span>' +
           '</div>' +
           '<div class="status card-action" data-status="' + job.last_build + '">' +
             '<div class="loading progress" data-job-running="' + !job.ran + '">' +
               '<div class="indeterminate"></div>' +
             '</div>' +
           '</div>' +
         '</article>';
};

module.exports = {
  render: renderJob
};
