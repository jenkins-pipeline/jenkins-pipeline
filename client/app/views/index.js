'use strict';

var _ = require('../helpers/utils');
var dom = require('../helpers/dom');
var request = require('../helpers/request');
var renderPipeline = require('./components/pipelineView').render;
var renderError = require('./components/errorView').render;
var pollingSubscribe = require('../helpers/polling').subscribe;

var TWO_MINUTES = 120000;

function hideLoader() { dom.hide('.pipelines-loading'); }
function showLoader() { dom.show('.pipelines-loading'); }
function clearContent() { dom.clear('#content-container'); }

function appendError(message) {
  var errorMsg = message || 'An error occurred loading the page. Please try again.';

  return function _appendError(err) {
    dom.append('#content-container', renderError(errorMsg));
    console.log(err);
  };
}

function fetchPipelineIds() {
  var errorMsg = 'An error ocurred fetching pipeline ids. Please try again.';
  return request.getJSON('/api/pipelines/ids').catch(appendError(errorMsg));
}

function appendPipeline(pipeline) {
  dom.append('#content-container', renderPipeline(pipeline));
}

function fetchPipeline(id) {
  var errorMsg = 'Fetching Pipeline "'+id+'" failed. Please refresh the page.';

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
  fetchPipelines().catch(appendError()).then(hideLoader);
}

function subscribeInit() {
  pollingSubscribe(_.pipe(showLoader, clearContent, initAsync), TWO_MINUTES);
}

module.exports = {
  init: _.pipe(initAsync, subscribeInit)
};
