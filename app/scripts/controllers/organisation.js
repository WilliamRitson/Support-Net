'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:OrganisationCtrl
 * @description
 * # OrganisationCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('OrganisationCtrl', function ($scope, $routeParams, $firebaseObject, Ref) {
    $scope.id = $routeParams.id;
    $scope.org = $firebaseObject(Ref.child('organisation').child($routeParams.id));
    $scope.orgRequests = $firebaseObject(Ref.child('request').orderByChild('requester').equalTo($scope.id));
    $scope.orgOffers = $firebaseObject(Ref.child('offer').orderByChild('requester').equalTo($scope.id));

    $scope.orgOffers.$loaded().then(function(offers) {
      $scope.users = {};
      offers.forEach(function (offer) {
        $scope.users[offer.offerer] = $firebaseObject(Ref.child('users').child(offer.offerer));
      });
    });

    $scope.getUserName = function (uid) {
      var user = $scope.users[uid];
      if (user) {
        console.log('found user', user);
        return user.name;
      } else {
        return 'Loading Name';
      }
    };

    $scope.acceptOffer = function (offer) {
      offer.accepted = true;
      offer.$save();
    };
  });
