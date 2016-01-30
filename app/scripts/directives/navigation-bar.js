'use strict';

/**
 * @ngdoc directive
 * @name hackucscApp.directive:navigationBar
 * @description
 * # navigationBar
 */
angular.module('hackucscApp')
  .directive('navigationBar', function (  Ref, $firebaseObject, $timeout) {
    return {
      templateUrl: 'views/navigation-bar.html',
      restrict: 'E',
      link: function postLink(scope) {

        var loadOrgs = function () {
          var auth = Ref.getAuth();
          if (auth) {
            scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
          }
        };
        Ref.onAuth(loadOrgs);
        $timeout(loadOrgs, 100);
      }
    };
  });
