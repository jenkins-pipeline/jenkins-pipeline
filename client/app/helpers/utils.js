'use strict';

var _ = require('lodash');

var prop = _.curry(function(property, object){
  return (object || {})[property];
});

var map = _.curry(function(fn, coll) {
  return _.map(coll, fn);
});

var reduce = _.curry(function(fn, initial, coll) {
  return _.reduce(coll, fn, initial);
});

module.exports = {
  prop: prop,
  map: map,
  reduce: reduce,
  pipe: _.flow,
  assign: _.assign,
  last: _.last
};
