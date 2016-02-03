'use strict';

var jobView = require('./jobView');

// renderPipeline :: Pipeline -> String
var renderPipeline = function(pipeline) {
  var jobs = pipeline.jobs || [];
  var revision = 'revision #' + pipeline.revision;

  return '<section class="row">' +
           '<header class="pipeline-title row">' +
             '<span class="title col">' + pipeline.name + '</span>' +
             '<span class="revision col">' + revision + '</span>' +
           '</header>' +
           '<section class="row">' +
             jobs.map(jobView.render).join('') +
           '</section>' +
           '<div class="divider"></div>' +
         '</section>';
};

module.exports = {
  render: renderPipeline
};
