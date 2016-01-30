'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:RequestListCtrl
 * @description
 * # RequestListCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('RequestListCtrl', function ($scope, $routeParams, $firebaseObject, Ref) {
    var id = $routeParams.id;
    $scope.id = id;
    $scope.org = $firebaseObject(Ref.child('organisation').child(id));
  });
