'use strict';

var StatusView = require('./statusView');

var renderJob = function(job) {
  return '<article class="job-card col s12 m2 card">' +
           '<div class="title-wrapper card-content truncate">' +
             '<span title="'+ job.name +'" class="title card-title">'+ job.name +'</span>' +
           '</div>' +
             StatusView.render(job) +
         '</article>';
};

module.exports = {
  render: renderJob
};
