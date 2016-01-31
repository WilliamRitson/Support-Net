'use strict';

/**
 * @ngdoc directive
 * @name hackucscApp.directive:navigationBar
 * @description
 * # navigationBar
 */
angular.module('hackucscApp')
  .directive('navigationBar', function (  Ref, $firebaseObject, $timeout, notifications) {
    return {
      templateUrl: 'views/navigation-bar.html',
      restrict: 'E',
      link: function postLink(scope) {

        var loadOrgs = function () {
          var auth = Ref.getAuth();
          if (auth) {
            scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
            scope.notifications = notifications.getUserNotifcations(scope.user);
            scope.showNav = true;
          } else {
            scope.user = {};
            scope.showNav = false;
          }
        };
        Ref.onAuth(loadOrgs);
        $timeout(loadOrgs, 100);

        scope.unread = function(notifications) {
          return notifications.filter(function (notification) {
            return !notification.read;
          }).length;
        };

        scope.notificationClicked = function (notification) {
          window.swal(notification.title, notification.text);
          notifications.markRead(notification, scope.notifications);
        };
      }
    };
  });
