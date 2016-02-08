'use strict';

var _ = require('lodash');
var moment = require('moment');
var formatDuration = require('../../helpers/helpers').formatDuration;

var wrapDurationMarkup = function(duration) {
  return '<div class="duration col s5" title="It took ' + duration + ' running last time">' +
           '<i class="icon fa fa-clock-o"></i>' + duration +
         '</div>';
};

var duration = _.flow(formatDuration, wrapDurationMarkup);

var wrapLastRunMarkup = function(relativeTime) {
  return '<div class="lastrun col s7 truncate" title="Last time it ran was ' + relativeTime + '">' +
           '<i class="icon fa fa-flag-checkered"></i>' + relativeTime +
         '</div>';
};

var fromNow = _.curry(function(moment, milliseconds) {
  return moment(milliseconds).fromNow();
});

var lastRun = _.flow(Number, fromNow(moment), wrapLastRunMarkup);

var itemInfo = function(item) {
  return lastRun(item.finishedAt).concat(duration(item.duration));
};

var runningItem = '<div class="loading progress col s12"><div class="indeterminate"></div></div>';

var renderStatus = function(item) {
  var status = item.status === 'running' ? runningItem : itemInfo(item);

  return '<div class="status-box card-action valign-wrapper row" data-status="' + item.status + '">' +
           status +
         '</div>';
};

module.exports = {
  render: renderStatus
};
