'use strict';

var PipelineView = require('../../../app/views/components/pipelineView');

describe('Job View', function() {
  it('should have pipeline title', function() {
    var pipeline = { name: 'pipeline name' };
    expect(PipelineView.render(pipeline)).toContain('pipeline name');
  });

  it('should have all jobs', function() {
    var pipeline = {
      jobs: [
        { name: 'job1' },
        { name: 'job2' },
        { name: 'job3' }
      ]
    };

    expect(PipelineView.render(pipeline)).toContain('job1');
    expect(PipelineView.render(pipeline)).toContain('job2');
    expect(PipelineView.render(pipeline)).toContain('job3');
  });

  it('should have a divider', function() {
    expect(PipelineView.render({})).toContain('class="divider"');
  });
});
