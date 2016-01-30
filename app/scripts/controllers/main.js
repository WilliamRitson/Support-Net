'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
