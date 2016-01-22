'use strict';

var GreetingView = require('../../../app/views/components/greetingView');

describe('Greeting View', function() {
  it('should mention it is a raw HTML component', function() {
    expect(GreetingView.render()).toContainString('raw component');
  });
});
