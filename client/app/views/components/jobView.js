'use strict';

var renderJob = function(job) {
  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span class="title card-title">' + job.name + '</span>' +
           '</div>' +
           '<div class="status ' + job.last_build + ' card-action">' +
           '</div>' +
         '</article>';
};

module.exports = {
  $render: renderJob
};
