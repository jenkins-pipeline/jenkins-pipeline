'use strict';

var _ = require('lodash');
var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;

var appendError = function appendError(err) {
  h.$append('#content-container', 'Fetching pipelines has a problem. Please try again');
  h.trace(err);
};

var fetchPipelinesAsync = function fetchPipelinesAsync() {
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

  var hideLoader = function hideLoader() {
    h.$hide('.pipelines-loading');
  };

  return function asyncInit() {
    pipelineNames().then(function resolvedPipelineNames(pipelineNames) {
      return pipelineNames.map($fetchPipeline).
        reduce(renderPipelinesReducer, Promise.resolve());
    }).catch(appendError).then(hideLoader);
  };
};

// use this until https://github.com/jenkins-pipeline/jenkins-pipeline/issues/31 is done
var fetchAllPipelinesAtOnce = function fetchAllPipelinesAtOnce() {
  var renderView = _.flow(
    h.map(renderPipeline),
    h.$setHTML('#content-container')
  );

  return function init() {
    h.$getJSON('/api/pipelines').
      then(renderView).
      catch(appendError).
      then(function() { h.$hide('.pipelines-loading'); });
  };
};

module.exports = {
  init: h.env(location) === 'dev' ? fetchPipelinesAsync() : fetchAllPipelinesAtOnce()
};
