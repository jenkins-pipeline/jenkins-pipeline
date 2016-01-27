'use strict';

var jobView = require('./jobView');

// renderPipeline :: Pipeline -> String
var renderPipeline = function(pipeline) {
  var jobs = pipeline.jobs || [];

  return '<section class="row">' +
           '<header class="pipeline-title row">' +
             '<h4 class="title col s12">' + pipeline.name + '</h4>' +
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
