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
});
