'use strict';

var _ = require('lodash');
var h = require('../../helpers/helpers');
var JobView = require('./jobView');
var StatusView = require('./statusView');

var calcDuration = function(pipeline) {
  var sumDuration = function(accDuration, item) { return accDuration + item.duration; };
  var sumJobsDuration = _.flow(h.prop('jobs'), h.reduce(sumDuration, 0));

  return _.assign({}, pipeline, { duration: sumJobsDuration(pipeline) });
};

var calcLastRun = function(pipeline) {
  var lastRun = _.flow(h.prop('jobs'), _.last, h.prop('finishedAt'));

  return _.assign({}, pipeline, { finishedAt: lastRun(pipeline) });
};

var renderPipeline = function(pipeline) {
  return '<section class="row">' +
           '<header class="pipeline-title">' +
             '<span class="title">' + pipeline.name + '</span>' +
             '<span class="revision">#' + pipeline.revision + '</span>' +
             StatusView.render(pipeline) +
           '</header>' +
           '<section class="row">' +
             h.map(JobView.render, pipeline.jobs).join('') +
           '</section>' +
           '<div class="divider"></div>' +
         '</section>';
};

module.exports = {
  render: _.flow(calcDuration, calcLastRun, renderPipeline)
};
