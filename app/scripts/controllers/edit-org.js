'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:EditOrgCtrl
 * @description
 * # EditOrgCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('EditOrgCtrl', function ($scope, $routeParams,  $location, $firebaseObject,  Ref) {
    var orgs = $firebaseObject(Ref.child('organisation')),
      user = $firebaseObject(Ref.child('users').child(Ref.getAuth().uid));

    var loadOrg = function () {
      var id = $routeParams.id;
      if (id === 'new') {
        $scope.org = {
          name: '',
          description: '',
          dropOff: 'Enter a time range, eg Mon-Fri from 8am to 6pm'
        };
      } else {
        $scope.org = $firebaseObject(Ref.child('organisation').child(id));
      }
    };
    loadOrg();

    var save = function () {
      if ($routeParams.id === 'new') {
        if ($scope.okName($scope.org.name)) {
          orgs[$scope.org.name] = $scope.org;
          orgs.$save();
          user.orgs = (user.orgs|| []).concat([$scope.org.name]) ;
          user.$save();
        }
      } else {
        $scope.org.$save();
      }
    };

    $scope.okName = function (name) {
      return name !== '' && !orgs[name] || user.orgs.indexOf(name) !== -1;
    };

    $scope.done = function () {
      save();
      $location.url('/organisation/'  + $scope.org.name);
    };


  });
