'use strict';

var $ = require('jquery');

var $renderTitle = function(pipelineName) {
  return $('<h1>', { text: pipelineName, 'class': 'title' });
};

// $render :: Pipeline -> DOM
var $render = function(pipeline) {
  var $container = $('<section>', { 'class': 'pipeline-container' });
  $container.append($renderTitle(pipeline.name));

  return $container;
};

var pipelineView = {
  // $render :: Pipeline -> DOM
  $render: $render
};

module.exports = pipelineView;
