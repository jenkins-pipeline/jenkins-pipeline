'use strict';

var moment = require('moment');
var humanizeDuration = require('humanize-duration');

function fromNow(milliseconds) {
  return moment(milliseconds).fromNow();
}

var format = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      h: function() { return 'h'; },
      m: function() { return 'min'; },
      s: function() { return 's'; },
      ms: function() { return 'ms'; }
    }
  },
  round: true,
  spacer: '',
  delimiter: ''
});

module.exports = {
  fromNow: fromNow,
  format: format
};
