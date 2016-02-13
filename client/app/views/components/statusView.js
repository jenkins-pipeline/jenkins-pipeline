'use strict';

var _ = require('lodash');
var duration = require('../../helpers/duration');

var wrapDurationMarkup = function(duration) {
  return '<div class="duration" title="It took ' + duration + ' running last time">' +
           '<i class="icon fa fa-clock-o"></i>' + duration +
         '</div>';
};

var itemDuration = _.flow(duration.format, wrapDurationMarkup);

var wrapLastRunMarkup = function(relativeTime) {
  return '<div class="lastrun" title="Last time it ran was ' + relativeTime + '">' +
           '<i class="icon fa fa-flag-checkered"></i>' + relativeTime +
         '</div>';
};

var lastRun = _.flow(Number, duration.fromNow, wrapLastRunMarkup);

var itemInfo = function(item) {
  return lastRun(item.finishedAt).concat(itemDuration(item.duration));
};

var runningItem = '<div class="loading"><div class="indeterminate"></div></div>';

var renderStatus = function(item) {
  var status = item.status === 'running' ? runningItem : itemInfo(item);

  return '<div class="status-box" data-status="' + item.status + '">' +
           status +
         '</div>';
};

module.exports = {
  render: renderStatus
};
