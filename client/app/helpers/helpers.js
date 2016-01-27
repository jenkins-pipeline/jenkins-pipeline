'use strict';

var _ = require('lodash');
var $ = require('jquery');

var prop = _.curry(function(property, object){
  return object[property];
});

var map = _.curry(function(fn, coll) {
  return _.map(coll, fn);
});

var trace = function(content) {
  console.log(JSON.stringify(content));
  return content;
};

var $getJSON = _.curry(function(callback, url) {
  $.getJSON(url, callback);
});

var $setHTML = _.curry(function(selector, html) {
  $(selector).html(html);
});

var $hide = function(selector) {
  return function () {
    $(selector).hide();
  };
};

var helpers = {
  prop: prop,
  map: map,
  trace: trace,
  $getJSON: $getJSON,
  $setHTML: $setHTML,
  $hide: $hide
};

module.exports = helpers;
