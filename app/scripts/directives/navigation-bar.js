'use strict';

/**
 * @ngdoc directive
 * @name hackucscApp.directive:navigationBar
 * @description
 * # navigationBar
 */
angular.module('hackucscApp')
  .directive('navigationBar', function () {
    return {
      templateUrl: 'views/navigation-bar.html',
      restrict: 'E',
      link: function postLink(scope,  Ref, $firebaseObject ) {
        scope.organisations = $firebaseObject(Ref.child('organisations').limitToLast(10));

      }
    };
  });
