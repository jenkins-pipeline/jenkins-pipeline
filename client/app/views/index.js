'use strict';

var _ = require('lodash');
var $ = require('jquery');
var h = require('../helper/helpers');
var $renderPipeline = require('./components/pipelineView').$render;

// url :: undefined -> String
var url = function() { return '/api'; };

// $hideLoader :: void
var $hideLoader = function() { $('.pipelines-loading').hide(); };

// renderView :: [Pipeline] -> undefined
var renderView = _.flow(h.map($renderPipeline), h.$setHTML('#content-container'), $hideLoader);

module.exports = {
  // init :: void
  init: _.flow(url, h.$getJSON(renderView))
};
