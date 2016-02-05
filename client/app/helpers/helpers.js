'use strict';

var _ = require('lodash');
var $ = require('jquery');
var humanizeDuration = require('humanize-duration');

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

var $getJSON = function $getJSON(url) {
  return new Promise(function $getJSONPromise(resolve, reject) {
    return $.getJSON({
      url: url,
      timeout: 20000
    }, resolve).fail(reject);
  });
};

var $hide = function(selector) {
  $(selector).hide();
};

var $append = function(selector, html) {
  $(selector).append(html);
};

var split = _.curry(function(separator, subject) {
  return subject.split(separator);
});

var join = _.curry(function(separator, array) {
  return array.join(separator);
});

var env = _.flow(
  prop('search'),
  _.tail,
  join(''),
  split('&'),
  map(split('=')),
  _.fromPairs,
  prop('env')
);

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

var $setHTML = _.curry(function(selector, html) {
  $(selector).html(html);
});

var helpers = {
  prop: prop,
  map: map,
  trace: trace,
  $getJSON: $getJSON,
  $hide: $hide,
  $append: $append,
  $setHTML: $setHTML,
  env: env,
  formatDuration: formatDuration
};

module.exports = helpers;
