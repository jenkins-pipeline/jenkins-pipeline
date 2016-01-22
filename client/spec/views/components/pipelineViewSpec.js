'use strict';

var PipelineView = require('../../../app/views/components/pipelineView');

xdescribe('Pipeline View', function() {
  it('should render pipeline name', function() {
    var pipeline = { name: 'pipeline name' };
    expect(PipelineView.$render(pipeline)).toContain(pipeline.name);
  });
});
