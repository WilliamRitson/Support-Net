'use strict';

describe('Filter: databaseDate', function () {

  // load the filter's module
  beforeEach(module('hackucscApp'));

  // initialize a new instance of the filter before each test
  var databaseDate;
  beforeEach(inject(function ($filter) {
    databaseDate = $filter('databaseDate');
  }));

  it('should return the input prefixed with "databaseDate filter:"', function () {
    var text = 'angularjs';
    expect(databaseDate(text)).toBe('databaseDate filter: ' + text);
  });

});
