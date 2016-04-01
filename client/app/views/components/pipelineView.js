'use strict';

var _ = require('../../helpers/utils');
var JobView = require('./jobView');
var StatusView = require('./statusView');

var calcDuration = function(pipeline) {
  var sumDuration = function(accDuration, item) { return accDuration + item.duration; };
  var sumJobsDuration = _.pipe(_.prop('jobs'), _.reduce(sumDuration, 0));

  return _.assign({}, pipeline, { duration: sumJobsDuration(pipeline) });
};

var calcLastRun = function(pipeline) {
  var lastRun = _.pipe(_.prop('jobs'), _.last, _.prop('finishedAt'));

  return _.assign({}, pipeline, { finishedAt: lastRun(pipeline) });
};

var setPipelineId = function(pipeline) {
  var pipelineId = function(name) {
    return name.toLowerCase().replace(' ', '-');
  };

  return _.assign({}, pipeline, { id: pipelineId(pipeline.name) });
};

var renderPipeline = function(pipeline) {
  var revision = pipeline.revision ? '#' + pipeline.revision : '';

  return '<section class="row" id="' + pipeline.id + '">' +
           '<header class="pipeline-title">' +
             '<span class="title">' + pipeline.name + '</span>' +
             '<span class="revision">' + revision + '</span>' +
             StatusView.render(pipeline) +
           '</header>' +
           '<section class="row">' +
             _.map(JobView.render, pipeline.jobs).join('') +
           '</section>' +
           '<div class="divider"></div>' +
         '</section>';
};

module.exports = {
  render: _.pipe(calcDuration, calcLastRun, setPipelineId, renderPipeline)
};
