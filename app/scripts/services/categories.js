'use strict';

/**
 * @ngdoc service
 * @name hackucscApp.categories
 * @description
 * # categories
 * Service in the hackucscApp.
 */
angular.module('hackucscApp')
  .service('categories', function () {
    return {
      names: ['Food', 'Clothing', 'Bedding', 'Misc']
    };
  });
