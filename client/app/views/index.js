'use strict';

var greetingView = require('./components/greetingView');

var app = {
  init: function() {
    document.getElementById('content').innerHTML = greetingView.render();
  }
};

module.exports = app;
