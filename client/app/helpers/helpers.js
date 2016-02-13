'use strict';

var _ = require('lodash');
var $ = require('jquery');
var humanizeDuration = require('humanize-duration');

var prop = _.curry(function(property, object){
  return (object || {})[property];
});

var map = _.curry(function(fn, coll) {
  return _.map(coll, fn);
});

var reduce = _.curry(function(fn, initial, coll) {
  return _.reduce(coll, fn, initial);
});

var $getJSON = function $getJSON(url) {
  return new Promise(function $getJSONPromise(resolve, reject) {
    return $.getJSON({
      url: url,
      timeout: 40000
    }, resolve).fail(reject);
  });
};

var formatDuration = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: function() { return 'h'; },
      m: function() { return 'min'; },
      s: function() { return 's'; },
      ms: function() { return 'ms'; }
    }
  },
  round: true,
  spacer: '',
  delimiter: ''
});

var helpers = {
  prop: prop,
  map: map,
  reduce: reduce,
  $getJSON: $getJSON,
  formatDuration: formatDuration
};

module.exports = helpers;
