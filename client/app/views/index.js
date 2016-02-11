'use strict';

var _ = require('lodash');
var h = require('../helpers/helpers');
var renderPipeline = require('./components/pipelineView').render;
var pollingSubscribe = require('../helpers/polling').subscribe;

var TWO_MINUTES = 120000;

function $hideLoader() { h.$hide('.pipelines-loading'); }
function $showLoader() { h.$show('.pipelines-loading'); }
function $clearContent() { h.$clear('#content-container'); }

function $appendError(message) {
  var errorMsg = message || 'An error occurred loading the page. Please try again.';

  return function _appendError(err) {
    h.$append('#content-container', errorMsg);
    console.log(err);
  };
}

function $fetchPipelineIds() {
  var errorMsg = 'An error ocurred fetching pipeline ids. Please try again.';
  return h.$getJSON('/api/pipelines/ids').catch($appendError(errorMsg));
}

function $appendPipeline(pipeline) {
  h.$append('#content-container', renderPipeline(pipeline));
}

function $fetchPipeline(id) {
  var errorMsg = 'Fetching Pipeline "'+id+'" failed. Please refresh the page.';

  return h.$getJSON('/api/pipelines/'+id).
           then($appendPipeline).
           catch($appendError(errorMsg));
}

function $fetchPipelines() {
  return $fetchPipelineIds().then(function(ids) {
    return Promise.all(h.map($fetchPipeline, ids));
  });
}

function $initAsync() {
  $fetchPipelines().catch($appendError()).then($hideLoader);
}

function $subscribeInit() {
  pollingSubscribe(_.flow($showLoader, $clearContent, $initAsync), TWO_MINUTES);
}

module.exports = {
  init: _.flow($initAsync, $subscribeInit)
};
