'use strict';

var $ = require('jquery');

function getJSON(url) {
  return new Promise(function getJSONPromise(resolve, reject) {
    return $.getJSON({
      url: url,
      timeout: 40000
    }, resolve).fail(reject);
  });
}

module.exports = {
  getJSON: getJSON
};
