'use strict';

var StatusView = require('../../../app/views/components/statusView');
var moment = require('moment');

describe('Status View', function() {
  it('should display how much time took to run last time', function() {
    var TWELVE_SEC = 12000;
    var TWO_MIN = 120000;
    var TWENTY_MIN_TWENTY_SEC = 1220000;

    var ranForSeconds = { duration: TWELVE_SEC };
    var ranForMinutes = { duration: TWO_MIN };
    var ranForMinutesAndSeconds = { duration: TWENTY_MIN_TWENTY_SEC };

    expect(StatusView.render(ranForSeconds)).toContain('12s');
    expect(StatusView.render(ranForMinutes)).toContain('2min');
    expect(StatusView.render(ranForMinutesAndSeconds)).toContain('20min20s');
  });

  it('should display the time when it ran last time', function() {
    var yesterdayInMs = moment(moment().subtract(1, 'd')).format('x');
    var oneHourAgoInMs = moment(moment().subtract(1, 'h')).format('x');

    var ranYesterday = { finishedAt: yesterdayInMs };
    var ranAnHourAgo = { finishedAt: oneHourAgoInMs };

    expect(StatusView.render(ranYesterday)).toContain('a day ago');
    expect(StatusView.render(ranAnHourAgo)).toContain('an hour ago');
  });
});
