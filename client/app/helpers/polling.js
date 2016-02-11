'use strict';

function subscribe(task, interval) {
  setInterval(task, interval);
}

module.exports = {
  subscribe: subscribe
};
