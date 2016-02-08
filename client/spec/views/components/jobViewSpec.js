'use strict';

var JobView = require('../../../app/views/components/jobView');

describe('Job View', function() {
  it('should have job name information', function() {
    var job = { name: 'job name' };
    expect(JobView.render(job)).toContain('job name');
  });

  it('should have status property', function() {
    var job = { status: 'theJobStatus' };
    expect(JobView.render(job)).toContain('data-status="theJobStatus"');
  });

  it('should show progress bar when job is running', function() {
    var job = { status: 'running' };
    expect(JobView.render(job)).toContain('loading');
    expect(JobView.render(job)).toContain('indeterminate');
  });

  it('should not show progress bar when job is not running', function() {
    var job = { status: 'success' };
    expect(JobView.render(job)).not.toContain('loading');
    expect(JobView.render(job)).not.toContain('indeterminate');
  });

  it('should add a title HTML property so it reveal collapsed values', function() {
    var job = { name: 'a really big job name that do not fit in the box' };
    expect(JobView.render(job)).toContain('title="a really big job name that do not fit in the box"');
  });
});
