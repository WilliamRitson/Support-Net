'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('HomeCtrl', function ($scope, $firebaseArray, $firebaseObject, Ref, $location) {
    
   $scope.requests = $firebaseArray(Ref.child("request"));

   $scope.offers = $firebaseArray(Ref.child("offer"));

   var auth = Ref.getAuth();
   if (auth) {
      $scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
      $scope.user.$loaded().then(function(user){
         console.log(user.$id);
         $scope.myOffers = $firebaseArray(Ref.child("offer").orderByChild("offerer").equalTo(user.$id));
      });
   } else {
      $scope.user = {};
   }

   $scope.newOffer = function(request) {
      console.log($scope.user);

      $location.url("/offer/new/" + request.$id);

   };

   $scope.editOffer = function(offer){
      $location.url("/offer/" + offer.$id + '/' + offer.request);
   };

   $scope.deleteOffer = function(offer){
      console.log(offer);
      $scope.myOffers.$remove(offer);
   };

});
