'use strict';

var PipelineView = require('../../../app/views/components/pipelineView');
var moment = require('moment');

describe('Pipeline View', function() {
  it('should have pipeline id', function() {
    var pipeline = { name: 'Pipeline Name' };
    expect(PipelineView.render(pipeline)).toContain('pipeline-name');
  });

  it('should have pipeline title', function() {
    var pipeline = { name: 'pipeline name' };
    expect(PipelineView.render(pipeline)).toContain('pipeline name');
  });

  it('should have all jobs', function() {
    var pipeline = {
      name: 'Pipeline Name',
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

  describe('revision', function() {
    it('should appear', function() {
      var pipeline = { name: 'Pipeline Name', revision: '444' };

      expect(PipelineView.render(pipeline)).toContain('#444');
    });

    it('should not appear', function() {
      var pipeline = {
        name: 'Pipeline Name',
        revision: null
      };

      expect(PipelineView.render(pipeline)).not.toContain('#null');
    });
  });

  describe('status', function() {
    it('should display how much time it took to run', function() {
      var TWO_MIN = 120000;
      var pipeline = {
        name: 'Pipeline Name',
        jobs: [{ duration: TWO_MIN }, { duration: TWO_MIN }]
      };

      expect(PipelineView.render(pipeline)).toContain('4min');
    });

    it('should display the time it ran for the last time', function() {
      var yesterdayInMs = moment(moment().subtract(1, 'd')).format('x');
      var now = moment().milliseconds();

      var pipeline = {
        name: 'Pipeline Name',
        jobs: [{ finishedAt: now }, { finishedAt: yesterdayInMs }]
      };

      expect(PipelineView.render(pipeline)).toContain('a day ago');
      expect(PipelineView.render(pipeline)).not.toContain('Invalid date');
    });
  });
});
