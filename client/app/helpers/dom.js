'use strict';

var $ = require('jquery');

function hide(selector) { $(selector).hide(); }
function show(selector) { $(selector).show(); }
function clear(selector) { $(selector).empty(); }
function append(selector, html) { $(selector).append(html); }

module.exports = {
  hide: hide,
  show: show,
  clear: clear,
  append: append
};
