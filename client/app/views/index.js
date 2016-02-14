'use strict';

var _ = require('../helpers/utils');
var dom = require('../helpers/dom');
var request = require('../helpers/request');
var renderPipeline = require('./components/pipelineView').render;
var renderError = require('./components/errorView').render;
var pollingSubscribe = require('../helpers/polling').subscribe;

var TWO_MINUTES = 120000;

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
  dom('#content-container').append(renderPipeline(pipeline));
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
  fetchPipelines().catch(appendError()).then(dom('.pipelines-loading').hide);
}

function subscribeInit() {
  var init = _.pipe(
    dom('.pipelines-loading').show,
    dom('#content-container').clear,
    initAsync
  );

  pollingSubscribe(init, TWO_MINUTES);
}

module.exports = {
  init: _.pipe(initAsync, subscribeInit)
};
