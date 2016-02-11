'use strict';

var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;

function appendError(message) {
  var errorMsg = message ||  'An error occurred loading the page. Please try again.';
  return function _appendError(err) {
    h.$append('#content-container', errorMsg);
    console.log(err);
  };
}

function hideLoader() { h.$hide('.pipelines-loading'); }

function $fetchPipelineNames() {
  return h.$getJSON('/api/pipelines/ids').catch(appendError());
}

function renderPipelines(pipeline) {
  h.$append('#content-container', renderPipeline(pipeline));
}

function $fetchPipeline(name) {
  var errorMsg = 'Fetching Pipeline "' + name + '" failed. Please refresh the page.';

  return h.$getJSON('/api/pipelines/' + name).
    then(renderPipelines).
    catch(appendError(errorMsg));
}

function $fetchPipelines() {
  return $fetchPipelineNames().then(function(names) {
    return Promise.all(h.map($fetchPipeline, names));
  });
}

module.exports = {
  init: function() {
    $fetchPipelines().catch(appendError()).then(hideLoader);
  }
};
