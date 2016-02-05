'use strict';

var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;

var pipelineNames = function pipelineNames() {
  return Promise.resolve([
    'Digital Service',
    'Transversal Service',
    'Web Application'
  ]);
};

var $fetchPipeline = function fetchPipeline(pipelineName) {
  return h.$getJSON('/api/pipelines/' + pipelineName);
};

var appendPipelineView = function appendPipelineView(pipeline) {
  h.$append('#content-container', renderPipeline(pipeline));
};

var renderPipelinesReducer = function renderPipelinesReducer(promises, pipelinePromise) {
  return promises.then(function() {
    return pipelinePromise;
  }).then(appendPipelineView);
};

var appendError = function appendError(err) {
  h.$append('#content-container', 'Fetching pipelines has a problem. Please try again');
  h.trace(err);
};

var hideLoader = function hideLoader() {
  h.$hide('.pipelines-loading');
};

module.exports = {
  init: function init() {
    pipelineNames().then(function resolvedPipelineNames(pipelineNames) {
      return pipelineNames.map($fetchPipeline).
        reduce(renderPipelinesReducer, Promise.resolve());
    }).catch(appendError).then(hideLoader);
  }
};
