'use strict';

var $ = require('jquery');

module.exports = function dom(selector) {
  return {
    hide: function hide() { $(selector).hide(); },
    show: function show() { $(selector).show(); },
    clear: function clear() { $(selector).empty(); },
    append: function append(html) { $(selector).append(html); }
  };
};
