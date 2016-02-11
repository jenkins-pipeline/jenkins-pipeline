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

function $fetchPipelineIds() {
  var errorMsg = 'An error ocurred fetching pipeline ids. Please try again.';
  return h.$getJSON('/api/pipelines/ids').catch(appendError(errorMsg));
}

function renderPipelines(pipeline) {
  h.$append('#content-container', renderPipeline(pipeline));
}

function $fetchPipeline(id) {
  var errorMsg = 'Fetching Pipeline "'+id+'" failed. Please refresh the page.';

  return h.$getJSON('/api/pipelines/'+id).then(renderPipelines).catch(appendError(errorMsg));
}

function $fetchPipelines() {
  return $fetchPipelineIds().then(function(ids) {
    return Promise.all(h.map($fetchPipeline, ids));
  });
}

module.exports = {
  init: function() {
    $fetchPipelines().catch(appendError()).then(hideLoader);
  }
};
