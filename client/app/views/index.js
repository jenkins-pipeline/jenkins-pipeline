'use strict';

var _ = require('lodash');
var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;

// url :: undefined -> String
var url = function() { return '/api/pipelines'; };

// renderView :: [Pipeline] -> undefined
var renderView = _.flow(
  h.map(renderPipeline),
  h.$setHTML('#content-container'),
  h.$hide('.pipelines-loading')
);

module.exports = {
  // init :: void
  init: _.flow(url, h.$getJSON(renderView))
};
