'use strict';

module.exports = {
  render: function(errorMsg) {
    return '<div class="alert-box">' +
             '<p class="alert">' + errorMsg + '</p>' +
           '</div>';
  }
};
