'use strict';

var $ = require('jquery');

// $renderTitle :: String -> DOM
var $renderTitle = function(pipelineName) {
  return $('<h1>', { text: pipelineName, 'class': 'title col s12' });
};

// $render :: Pipeline -> DOM
var $render = function(pipeline) {
  var $container = $('<section>', { 'class': 'pipeline-container section' });
  $container.append($renderTitle(pipeline.name));
  $container.append($('<div>', { 'class': 'divider' }));

  return $container;
};

var pipelineView = {
  // $render :: Pipeline -> DOM
  $render: $render
};

module.exports = pipelineView;
