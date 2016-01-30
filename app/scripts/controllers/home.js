'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('HomeCtrl', function ($scope, $firebaseArray, Ref) {
    
    $scope.requests = $firebaseArray(Ref.child("request"));

  });
