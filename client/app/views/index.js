'use strict';

var _ = require('lodash');
var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;

var appendError = function(message) {
  var errorMsg = message ||  'An error occurred loading the page. Please try again.';
  return function appendError(err) {
    h.$append('#content-container', errorMsg);
    h.trace(err);
  };
};

var fetchPipelinesAsync = function fetchPipelinesAsync() {
  var pipelineNames = function pipelineNames() {
    return Promise.resolve([
      'Web Application',
      'Digital Service',
      'Transversal Service'
    ]);
  };

  var renderPipelineView = function renderPipelineView(pipeline) {
    h.$append('#content-container', renderPipeline(pipeline));
  };

  var hideLoader = function hideLoader() {
    h.$hide('.pipelines-loading');
  };

  var $fetchPipeline = function(pipelineName) {
    var errorMsg = 'Fetching Pipeline "' + pipelineName + '" failed. Please refresh the page.';

    return h.$getJSON('/api/pipelines/' + pipelineName).
             then(renderPipelineView).
             catch(appendError(errorMsg));
  };

  return function asyncInit() {
    pipelineNames().then(function resolvedPipelineNames(pipelineNames) {
      return pipelineNames.map($fetchPipeline);
    }).catch(appendError()).then(hideLoader);
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
