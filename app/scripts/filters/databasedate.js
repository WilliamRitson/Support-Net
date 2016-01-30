'use strict';

/**
 * @ngdoc filter
 * @name hackucscApp.filter:databaseDate
 * @function
 * @description
 * # databaseDate
 * Filter in the hackucscApp.
 */
angular.module('hackucscApp')
  .filter('databaseDate', function ($filter) {
    return function (input) {
      var date = new Date(input);
      return $filter('date')(date, 'shortDate');
    };
  });
