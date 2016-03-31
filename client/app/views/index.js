'use strict';

var _ = require('../helpers/utils');
var dom = require('../helpers/dom');
var request = require('../helpers/request');
var renderPipeline = require('./components/pipelineView').render;
var renderError = require('./components/errorView').render;
var pollingSubscribe = require('../helpers/polling').subscribe;

var ONE_MINUTE = 60000;

function appendError(message) {
  var errorMsg = message || 'An error occurred loading the page. Please try again.';

  return function _appendError(err) {
    dom('#content-container').append(renderError(errorMsg));
    console.log(err);
  };
}

function fetchPipelineIds() {
  var errorMsg = 'An error ocurred fetching pipeline ids. Please try again.';
  return request.getJSON('/api/pipelines/ids').catch(appendError(errorMsg));
}

function appendPipeline(pipeline) {
  var pipelineId = pipeline.name.toLowerCase().replace(' ', '-');
  var pipelineElement = dom('#' + pipelineId);
  if (pipelineElement.exists()) {
    pipelineElement.replace(renderPipeline(pipeline));
  } else {
    dom('#content-container').append(renderPipeline(pipeline));
  }
}

function fetchPipeline(id) {
  var errorMsg = 'Fetching Pipeline "' + id + '" failed. Please refresh the page.';

  return request.getJSON('/api/pipelines/' + id).
           then(appendPipeline).
           catch(appendError(errorMsg));
}

function fetchPipelines() {
  return fetchPipelineIds().then(function(ids) {
    return Promise.all(_.map(fetchPipeline, ids));
  });
}

function initAsync() {
  fetchPipelines().catch(appendError()).then(dom('.pipelines-loading').hide);
}

function subscribeInit() {
  var init = _.pipe(
    initAsync
  );

  pollingSubscribe(init, ONE_MINUTE);
}

module.exports = {
  init: _.pipe(initAsync, subscribeInit)
};
