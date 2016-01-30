'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
