'use strict';

var $ = require('jquery');

module.exports = function dom(selector) {
  return {
    exists: function exists() { return $(selector).length !== 0; },
    hide: function hide() { $(selector).hide(); },
    show: function show() { $(selector).show(); },
    clear: function clear() { $(selector).empty(); },
    append: function append(html) { $(selector).append(html); },
    replace: function replace(html) { $(selector).html(html); }
  };
};
