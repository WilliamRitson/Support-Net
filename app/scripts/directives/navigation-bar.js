'use strict';

/**
 * @ngdoc directive
 * @name hackucscApp.directive:navigationBar
 * @description
 * # navigationBar
 */
angular.module('hackucscApp')
  .directive('navigationBar', function (  Ref, $firebaseObject, $timeout, Auth, $q, $location) {
    return {
      templateUrl: 'views/navigation-bar.html',
      restrict: 'E',
      link: function postLink(scope) {

        var loadOrgs = function () {
          var auth = Ref.getAuth();
          if (auth) {
            scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
            scope.showNav = true;
          } else {
            scope.user = [];
            scope.showNav = false;
          }

          scope.oauthLogin = function(provider) {
            scope.err = null;
            Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
          };

          scope.anonymousLogin = function() {
            scope.err = null;
            Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
          };

          scope.passwordLogin = function(email, pass) {
            scope.err = null;
            Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
              redirect, showError
            );
          };
        };

      function redirect() {
        $location.path('/home');
      }

      function showError(err) {
        scope.err = err;
      }

        Ref.onAuth(loadOrgs);
        $timeout(loadOrgs, 100);
      }



    };
  });
