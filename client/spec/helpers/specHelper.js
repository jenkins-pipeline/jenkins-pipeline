'use strict';

beforeEach(function () {
  jasmine.addMatchers({
    toContainString: function () {
      return {
        compare: function (actual, stringToSearchFor) {
          return {
            pass: actual.toString().search(stringToSearchFor) !== -1 // eslint-disable-line
          };
        }
      };
    }
  });
});
