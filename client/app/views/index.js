'use strict';

var _               = require('lodash');
var h               = require('../helper/helpers');
var $renderPipeline = require('./components/pipelineView').$render;

// renderView :: [Pipeline] -> undefined
var renderView = _.flow(h.map($renderPipeline), h.$setHTML('#content-container'));

// url :: undefined -> String
var url = function() { return '/api'; };

module.exports = {
  // init :: void
  init: _.flow(url, h.$getJSON(renderView))
};
