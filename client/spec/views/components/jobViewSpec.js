'use strict';

var JobView = require('../../../app/views/components/jobView');

describe('Job View', function() {
  it('should have job name information', function() {
    var job = { name: 'job name' };
    expect(JobView.render(job)).toContain('job name');
  });

  it('should have status property', function() {
    var job = { last_build: 'theJobStatus' }; // eslint-disable-line
    expect(JobView.render(job)).toContain('data-status="theJobStatus"');
  });

  it('should show progress bar when job is running', function() {
    var job = { ran: false };
    expect(JobView.render(job)).toContain('loading progress');
    expect(JobView.render(job)).toContain('indeterminate');
  });

  it('should not show progress bar when job is not running', function() {
    var job = { ran: true };
    expect(JobView.render(job)).not.toContain('loading progress');
    expect(JobView.render(job)).not.toContain('indeterminate');
  });

  it('should add a title HTML property so it reveal collapsed values', function() {
    var job = { name: 'a really big job name that do not fit in the box' };
    expect(JobView.render(job)).toContain('title="a really big job name that do not fit in the box"');
  });

  it('should display how much time took the job to run last time', function() {
    var TWELVE_SEC = 12000;
    var TWO_MIN = 120000;
    var TWENTY_MIN_TWENTY_SEC = 1220000;

    var jobRanForSeconds = { duration: TWELVE_SEC, ran: true };
    var jobRanForMinutes = { duration: TWO_MIN, ran: true };
    var jobRanForMinutesAndSeconds = { duration: TWENTY_MIN_TWENTY_SEC, ran: true };

    expect(JobView.render(jobRanForSeconds)).toContain('12s');
    expect(JobView.render(jobRanForMinutes)).toContain('2min');
    expect(JobView.render(jobRanForMinutesAndSeconds)).toContain('20min20s');
  });
});
