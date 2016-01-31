'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('OfferCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, categories, $location) {

      $scope.offer = $firebaseObject(Ref.child("offer").child($routeParams.id))
      $scope.offer.$loaded().then(function(offer){
         console.log(offer);
         $scope.matchingRequest = $firebaseObject(Ref.child("request").child(offer.request));
         console.log(offer.requester);
         $scope.org = $firebaseObject(Ref.child("organisation").child(offer.requester));
      });

      $scope.updateOffer = function(offer){
         offer.$save();
         $location.url("/home");
      };
  });
